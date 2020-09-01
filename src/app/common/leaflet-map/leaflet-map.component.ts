import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CRS, icon, imageOverlay, LatLng, map, marker } from 'leaflet';

@Component({
  selector: 'ms-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit {
  @Output() onMarkerDragEnd = new EventEmitter<Marker>();
  @Output() onMarkerClick = new EventEmitter<Marker>();
  @Output() onMapClick = new EventEmitter<[number, number]>();
  lfMap?: any;
  _url = '';
  _markers: Marker[];
  leafletMarkers: any[] = [];
  _onMapClick = (event: any) => this.onMapClick.emit([event.latlng.lng, event.latlng.lat]);

  constructor() {
    this.initMap();
  }

  @Input()
  set url(url: string) {
    this._url = url;
    this.initMap();
  }

  @Input()
  set markers(markers: Marker[]) {
    this._markers = markers;
    this.initMap();
  }

  ngOnInit() { }

  async initMap() {
    try {
      if (this.lfMap != null) {
        this.lfMap.off('click', this._onMapClick);
        this.lfMap.off();
        this.lfMap.remove();
      }
      this.lfMap = map('map', { crs: CRS.Simple, minZoom: -3 });
      await this.loadMap(this._url);
      this.removeMarkers();
      this._markers.forEach(marker => this.addMarker(marker));
    } catch (e) {
      console.log(e);
    }
  }

  removeMarkers() {
    if (this.lfMap != null) {
      this.leafletMarkers.forEach(layer => this.lfMap.removeLayer(layer));
    }
    this.leafletMarkers = [];
  }

  addMarker(inputMarker: Marker) {
    const latlng = new LatLng(inputMarker.y, inputMarker.x);
    const newMarker = marker(
      latlng,
      {
        draggable: true,
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/images/marker-shadow.png'
        })
      }
    );
    if (inputMarker.name != null) {
      newMarker.bindTooltip(inputMarker.name, { direction: 'top', offset: [0, -41] });
    }
    newMarker.on('dragend', () => {
      const newPosition = newMarker.getLatLng();
      inputMarker.x = newPosition.lng;
      inputMarker.y = newPosition.lat;
      this.onMarkerDragEnd.emit(inputMarker);
    });
    newMarker.on('click', () => this.onMarkerClick.emit(inputMarker));
    newMarker.addTo(this.lfMap);
    this.leafletMarkers.push(newMarker);
  }

  async loadMap(mapUrl: string) {
    const [width, height] = await this.imgWidthAndHeight(mapUrl);
    const bounds = this.boundsFromImageSize(width, height);
    imageOverlay(mapUrl, bounds).addTo(this.lfMap);
    this.lfMap.fitBounds(bounds);
    this.lfMap.setMaxBounds(bounds);
    this.lfMap.on('click', this._onMapClick);
  }

  imgWidthAndHeight(url: string): Promise<[number, number]> {
    return new Promise<[number, number]>(resolve => {
      const img = new Image();
      img.addEventListener('load', function () {
        resolve([this.naturalWidth, this.naturalHeight]);
      });
      img.src = url;
    })
  }

  boundsFromImageSize(imageWidth: number, imageHeight: number): [number, number][] {
    const containerRatio = 673 / 337;
    const backgoundRatio = imageWidth / imageHeight;
    let width = 0;
    let height = 0;
    if (backgoundRatio > containerRatio) {
      // landscape
      width = 1000;
      height = width / backgoundRatio;
    } else {
      // portrait
      height = 1000;
      width = height * backgoundRatio;
    }
    return [[0, -width / 2], [height, width / 2]];
  }
}

export interface Marker {
  x: number
  y: number
  id: number
  name: string
  payload: any
}

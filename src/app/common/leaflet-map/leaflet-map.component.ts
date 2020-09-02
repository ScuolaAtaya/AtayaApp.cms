import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CRS, imageOverlay, LatLng, map, marker } from 'leaflet';
import { divIcon } from 'leaflet';
import { Marker } from 'app/work/marker';
declare var $: any;

@Component({
  selector: 'ms-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit {
  @Output() onMarkerDragEnd = new EventEmitter<Marker>();
  lfMap?: any;
  _url: string;
  _markers: Marker[];
  leafletMarkers: Marker[];

  constructor() {
    $(document).ready(() => {
      this.initMap()
    })
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

  ngOnInit() {
    this.leafletMarkers = [];
  }

  async initMap() {
    try {
      if (this.lfMap != null) {
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
    const latlng = new LatLng(inputMarker.x, inputMarker.y);
    const newMarker = marker(
      latlng,
      {
        draggable: true,
        icon: divIcon({
          className: 'custom-div-icon',
          html: `<div class="marker-pin"><div class="marker-number">${inputMarker.id}</div></div>`,
          iconSize: [30, 42],
          iconAnchor: [15, 42]
        })
      }
    );
    newMarker.on('dragend', () => {
      const newPosition = newMarker.getLatLng();
      inputMarker.x = newPosition.lng;
      inputMarker.y = newPosition.lat;
      this.onMarkerDragEnd.emit(inputMarker);
    });
    newMarker.addTo(this.lfMap);
    this.leafletMarkers.push(newMarker);
  }

  async loadMap(mapUrl: string) {
    const [width, height] = await this.imgWidthAndHeight(mapUrl);
    const bounds = this.boundsFromImageSize(width, height);
    imageOverlay(mapUrl, bounds).addTo(this.lfMap);
    this.lfMap.fitBounds(bounds);
    this.lfMap.setMaxBounds(bounds);
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
      width = 1000;
      height = width / backgoundRatio;
    } else {
      height = 1000;
      width = height * backgoundRatio;
    }
    return [[0, -width / 2], [height, width / 2]];
  }
}

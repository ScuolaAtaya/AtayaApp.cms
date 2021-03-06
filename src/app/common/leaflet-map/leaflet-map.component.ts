import { Component, Input, OnInit } from '@angular/core';
import { CRS, imageOverlay, LatLng, map, marker } from 'leaflet';
import { divIcon } from 'leaflet';
import { Marker } from 'app/work/marker';
import { Util } from 'leaflet';
import { Transformation } from 'leaflet';
declare var $: any;

@Component({
  selector: 'ms-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit {
  lfMap?: any;
  _url: string;
  _markers: Marker[];
  leafletMarkers: Marker[];
  width: number;
  height: number;

  constructor() {
    $(document).ready(() => this.initMap());
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

  private async initMap() {
    try {
      if (this.lfMap != null) {
        this.lfMap.off();
        this.lfMap.remove();
      }
      // set coordinates [0, 0] to image's top-left corner
      const CRSPixel = Util.extend(CRS.Simple, {
        transformation: new Transformation(1, 0, 1, 0)
      });
      this.lfMap = map('map', { crs: CRSPixel, minZoom: -3 });
      await this.loadMap(this._url);
      this.removeMarkers();
      this._markers.forEach(marker => this.addMarker(marker));
    } catch (e) {
      console.log(e);
    }
  }

  private async loadMap(mapUrl: string) {
    const [width, height] = await this.imgWidthAndHeight(mapUrl);
    const bounds = this.boundsFromImageSize(width, height);
    imageOverlay(mapUrl, bounds).addTo(this.lfMap);
    this.lfMap.fitBounds(bounds);
    this.lfMap.setMaxBounds(bounds);
  }

  private removeMarkers() {
    if (this.lfMap != null) {
      this.leafletMarkers.forEach(layer => this.lfMap.removeLayer(layer));
    }
    this.leafletMarkers = [];
  }

  private addMarker(inputMarker: Marker) {
    // Coordinates in CRS.Simple take the form of [y, x] instead of [x, y], in the same way Leaflet uses [lat, lng] instead of [lng, lat]
    // set coordinates [0, 0] to image's top-left corner and [1, 1] to image's bottom-right corner
    const latlng = new LatLng(inputMarker.y * this.height, inputMarker.x * this.width);
    const newMarker = marker(latlng, {
      draggable: true,
      icon: divIcon({
        className: 'custom-div-icon',
        html: `<div class="marker-pin"><div class="marker-number">${inputMarker.id}</div></div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      })
    });
    newMarker.on('dragend', () => {
      const newPosition = newMarker.getLatLng();
      if (newPosition.lat > this.height) {
        newPosition.lat = this.height;
      } else if (newPosition.lat < 0) {
        newPosition.lat = 0;
      }
      if (newPosition.lng > this.width) {
        newPosition.lng = this.width;
      } else if (newPosition.lng < 0) {
        newPosition.lng = 0;
      }
      newMarker.setLatLng(newPosition);
      inputMarker.y = newPosition.lat / this.height;
      inputMarker.x = newPosition.lng / this.width;
    });
    newMarker.addTo(this.lfMap);
    this.leafletMarkers.push(newMarker);
  }

  private imgWidthAndHeight(url: string): Promise<[number, number]> {
    return new Promise<[number, number]>(resolve => {
      const img = new Image();
      img.addEventListener('load', function () {
        resolve([this.naturalWidth, this.naturalHeight]);
      });
      img.src = url;
    })
  }

  private boundsFromImageSize(imageWidth: number, imageHeight: number): [number, number][] {
    const containerRatio = 1600 / 900;
    const backgoundRatio = imageWidth / imageHeight;
    if (backgoundRatio > containerRatio) {
      this.width = 1000;
      this.height = this.width / backgoundRatio;
    } else {
      this.height = 1000;
      this.width = this.height * backgoundRatio;
    }
    return [[0, 0], [this.height, this.width]];
  }
}

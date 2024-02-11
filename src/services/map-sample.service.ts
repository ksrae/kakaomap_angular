import { Injectable, signal } from '@angular/core';

declare var kakao: any;

@Injectable({
  providedIn: 'root',
})
export class KakaomapService {
  map: any;
  clusterInfo: any;
  markers = signal<any[]>([]);
  level = signal<number>(4);
  changeLevel = signal<number>(4);
  lat = signal<number>(37.5635);
  lng = signal<number>(126.978);
  markerImage = signal<any>(new kakao.maps.MarkerImage('assets/icons/map-marker.svg', new kakao.maps.Size(35, 35)));
  overlays = signal<any[]>([]);

  locations = [
    { name: '서울시청', lat: 37.5635, lng: 126.978 },
    { name: '덕수궁', lat: 37.5639, lng: 126.982 },
    { name: '서울역', lat: 37.5608, lng: 126.975 },
    { name: '숭례문', lat: 37.5643, lng: 126.973 },
    { name: '세종대로', lat: 37.5663, lng: 126.979 },
    { name: '서울광장', lat: 37.565, lng: 126.976 },
    { name: '청계광장', lat: 37.5667, lng: 126.978 },
    { name: '명동거리', lat: 37.5675, lng: 126.98 },
    { name: '남대문시장', lat: 37.5611, lng: 126.977 },
    { name: '남산공원', lat: 37.5598, lng: 126.974 },
    { name: '서울시청 근처', lat: 37.563, lng: 126.98 },
    { name: '덕수궁 근처', lat: 37.5622, lng: 126.976 },
    { name: '서울역 근처', lat: 37.5615, lng: 126.979 },
    { name: '남대문 근처', lat: 37.5655, lng: 126.971 },
    { name: '경복궁 근처', lat: 37.5668, lng: 126.975 },
    { name: '광화문 광장 근처', lat: 37.5673, lng: 126.977 },
    { name: '청계천 근처', lat: 37.568, lng: 126.981 },
    { name: '인사동 근처', lat: 37.5671, lng: 126.982 },
    { name: '동대문 시장 근처', lat: 37.559, lng: 126.978 },
    { name: '남산 서울타워 근처', lat: 37.5618, lng: 126.971 },
  ];

  constructor() {}

  initMap() {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(this.lat(), this.lng()),
      level: this.level(),
    };
    this.map = new kakao.maps.Map(container, options);
    this.setCluster();

    kakao.maps.event.addListener(this.map, 'zoom_changed', () => {
      this.level.set(this.map.getLevel());
    });

    kakao.maps.event.addListener(this.map, 'center_changed', () => {
      this.lat.set(this.map.getCenter().getLat());
      this.lng.set(this.map.getCenter().getLng());
    });
  }

  setCluster() {
    this.markers()?.map((marker) => {
      this.clusterInfo.removeMarker(marker);
      marker.setMap(null);
    });
    this.overlays()?.map((overlay) => {
      this.clusterInfo.removeOverlay(overlay);
      overlay.setMap(null);
    });

    const colors = ['rgba(51, 204, 255, .7)', 'rgba(255, 153, 0, .7)', 'rgba(255, 51, 204, .7)', 'rgba(255, 80, 80, .7)'];
    this.clusterInfo = new kakao.maps.MarkerClusterer({
      map: this.map,
      averageCenter: true,
      calculator: [5, 10, 20],
      gridSize: 50,
      minLevel: this.changeLevel() + 1,
      styles: colors.map((color, index) => ({
        width: `${30 + index * 10}px`,
        height: `${30 + index * 10}px`,
        background: color,
        borderRadius: `${15 + index * 5}px`,
        color: '#181818',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: `${31 + index * 10}px`,
      })),
    });

    const markers: any[] = [];
    const overlays: any[] = [];
    this.locations.map((content: any) => {
      const overlay = `<div class="p-2 text-white bg-primary font-esamanru font-bold rounded-lg w-full flex justify-center">${content.name}</div>`;

      const customOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(content.lat, content.lng),
        content: overlay,
        xAnchor: 0.5,
        yAnchor: 0.5,
        zIndex: 10,
      });

      overlays.push(customOverlay);
      customOverlay.setMap(this.map);

      // const marker = new kakao.maps.Marker({
      //   position: new kakao.maps.LatLng(content.lat, content.lng),
      //   image: this.markerImage(),
      //   removable: true,
      //   zIndex: 0,
      // });

      // const iwContent = `<div class="p-2 text-white bg-primary font-esamanru font-bold rounded-lg w-full flex justify-center">${content.name}</div>`;
      // const infowindow = new kakao.maps.InfoWindow({
      //   content: iwContent,
      //   zIndex: 10,
      // });

      // kakao.maps.event.addListener(marker, 'click', async () => {
      //   infowindow.open(this.map, marker);
      //   setTimeout(() => {
      //     infowindow.close();
      //   }, 2000);
      // });

      // markers.push(marker);
    });

    this.overlays.set(overlays);
    // this.markers.set(markers);
    // this.clusterInfo.addMarkers(this.markers());
    this.clusterInfo.addMarkers(this.overlays());
  }
}

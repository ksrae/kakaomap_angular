import { Injectable, signal } from '@angular/core';
@Injectable({providedIn: 'root'})
export class KakaomapService {

  lat = signal<number>(33.450701);
  lng = signal<number>(126.570667);
  level = signal<number>(3);

  // initMap(container: any) {
  //   this.container = container;
  //   this.kakaomap = new (window as any)['kakao'].maps.Map(container, this.setOption());
  //   // this.setCluster();

  //   (window as any)['kakao'].maps.event.addListener(this.kakaomap, 'zoom_changed', () => {
  //     console.log('zoom-changed', this.kakaomap.getLevel())
  //     this.level.set(this.kakaomap.getLevel());
  //   });

  //   (window as any)['kakao'].maps.event.addListener(this.kakaomap, 'center_changed', () => {
  //     this.lat.set(this.kakaomap.getCenter().getLat());
  //     this.lng.set(this.kakaomap.getCenter().getLng());
  //   });
  // }

  // getPlaces(keyword: string) {
  //   const ps = new (window as any)['kakao'].maps.services.Places();
  //   ps.keywordSearch(keyword, this.placesSearchCB);
  // }

  // placesSearchCB (data: any, status: any, pagination: any) {
  //   console.log({data}, {status}, {pagination});

  //   if (status === (window as any)['kakao'].maps.services.Status.OK) {

  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //       // LatLngBounds 객체에 좌표를 추가합니다
  //       const bounds = new (window as any)['kakao'].maps.LatLngBounds();

  //       // for (var i=0; i<data.length; i++) {
  //       //     displayMarker(data[i]);
  //       //     bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
  //       // }

  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //       this.kakaomap = new (window as any)['kakao'].maps.Map(this.container, this.setOption());
  //       this.kakaomap.setBounds(bounds);
  //   }

  //}

}

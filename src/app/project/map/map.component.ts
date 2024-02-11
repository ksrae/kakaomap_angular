import { JsonPipe, NgFor, NgIf } from '@angular/common';

import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, signal } from "@angular/core";

declare var kakao: any;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [JsonPipe, NgIf, NgFor],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class MapComponent implements AfterViewInit {
  cdr = inject(ChangeDetectorRef);

  title = 'kakaomap';
  map: any;
  infowindow: any;
  ps: any;
  place: any;
  placeList: any[] = [];
  defaultLat =  {
    y: 37.40202672608591,
    x: 127.10874075413574,
    level: 3
  }
  markerList: any[] = [];
  newMarker: any;

  ngAfterViewInit(): void {
    // 지도를 그린다.
    const options = {
      center: new kakao.maps.LatLng(this.defaultLat.y, this.defaultLat.x),
      level: this.defaultLat.level,
      draggable: true
    };

    this.map = new kakao.maps.Map(document.getElementById('map'), options);
  }

  search(searchText: string = 'H스퀘어 맛집', searchMeter: number = 150) {
    // 위치 정보 가져옴.
    this.ps = new kakao.maps.services.Places();

    // 여기는 콜백 결과
    const callback = (result: any[], status: any) => {
      // place 결과를 placeList에 담아둔다.
      this.placeList = [...result];
      this.cdr.markForCheck();

      // 검색 결과가 지도 범위를 벗어나면 줌아웃.
      const exist = result.some((item: any) => {
        if(item.x > this.defaultLat.x || item.y > this.defaultLat.y) {
          return true;
        }
        return false;
      });
      if(exist) {
        this.map.setLevel(this.defaultLat.level+1);
      }

      // 검색 결과를 마커로 지도에 찍는다.
      if (status === kakao.maps.services.Status.OK) {
          for(let i=0; i<result.length; i++) {
            const item = result[i];

            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(item.y, item.x),
              title : item.place_name,
              map: this.map,
              clickable: true
            });

            marker.setMap(this.map);
            // 마커를 markerList에 담아둔다.
            this.markerList.push(marker);

            // 각 마커에 클릭 이벤트를 추가한다.
            kakao.maps.event.addListener(marker, 'click', () => {
              this.markerEvent(item, i);
            });
          }
        // }, 1000);


      }
    };

    // 검색을 kakao에 요청하고, 결과를 callback으로 전달한다.
    // 위치에 따른 범위를 지정해서 최대한 맵을 벗어나서 검색하지 않도록 한다.
    // 단 수정 가능하도록 열어둠.
    this.ps.keywordSearch(searchText, callback, {
      radius : searchMeter,
      location: new kakao.maps.LatLng(this.defaultLat.y, this.defaultLat.x)
    });
  }

  // 마커 클릭하면 기존 마커 이미지를 제거하고 새 마커를 표시한다.
  // 해당 마커를 중앙에 위치시킨다.
  markerEvent(place: any, markerIndex: number) {
    const marker = this.markerList[markerIndex];

    const exist = this.markerList.find((item: any) => {
      return item.n.La === marker.n.La && item.n.Ma === marker.n.Ma;
    });
    if(exist) {
      exist.setMap(null);
    }
    this.markerList.forEach((item: any) => {
      if(item.n.La === marker.n.La && item.n.Ma === marker.n.Ma) {
        item.setMap(null);
      } else {
        item.setMap(this.map);
      }
    });

    if(this.newMarker) {
      this.newMarker.setMap(null);
    }


    const imageSrc = 'assets/markerStar.png'; // 마커이미지의 주소입니다
    const imageSize = new kakao.maps.Size(24, 35); // 마커이미지의 크기입니다
    const imageOption = {offset: new kakao.maps.Point(24, 35)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    const markerPosition = new kakao.maps.LatLng(place.y, place.x); // 마커가 표시될 위치입니다

    // 마커를 생성합니다
    this.newMarker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage // 마커이미지 설정
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    this.newMarker.setMap(this.map);

    // 마커가 지도 중심에 오도록 설정.
    this.map.setCenter(new kakao.maps.LatLng(place.y, place.x));


    this.place = place;
    this.cdr.markForCheck();
  }

  // 목록을 선택했을 때 마커를 선택한 이벤트를 타도록 코드를 정리했다.
  selectPlace(place: any, index: number) {
    this.markerEvent(place, index);
  }
}

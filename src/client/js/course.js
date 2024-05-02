const locationMap = document.getElementById("location-map");

let map; // 카카오 지도
let userLatitude;
let userLongitude;
let isMapDrawn = false; // boolean
let courseData = [];
let markers = [];

const panTo = (latitude, longitude) => {
  const moveLatLon = new kakao.maps.LatLng(latitude, longitude);
  map.panTo(position);
};

// 마커 그리는 함수
const addMarker = (position) => {
  let marker = new kakao.maps.Marker({
    position: position,

  });
  marker.setMap(map);
  markers.push(marker);
};
// 마커 지우는 함수
const delMarker = () => {
  for(let i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }
  markers = [];
}

const addCourseMarker = (course) => {
  // 1. 방문 안했으면
  let markerImageUrl = "/file/map_not_done.png";
  let markerImageSize = new kakao.maps.Size(24, 35);
  const kakaoMarkerImage = new kakao.maps.MarkerImage(
    markerImageUrl,
    markerImageSize
  );
  const latlng = new kakao.maps.LatLng(
    course.course_latitude,
    course.course_longitude
  );

  new kakao.maps.Marker({
    map: map,
    position: latlng,
    title: course.course_name,
    image: kakaoMarkerImage,
  });
};

const setCourseMarker = () => {
  for (let i = 0; i < courseData.length; i++) {
    addCourseMarker(courseData[i]);
  }
};

const drawMap = (latitude, longitude) => {
  const option = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 2,
  };
  map = new kakao.maps.Map(locationMap, option);
  // map.setZoomable(false); //지도 줌 막기
};

const configLocation = () => {
  if (navigator.geolocation) {
    // web api
    navigator.geolocation.watchPosition((pos) => {
      delMarker();
      userLatitude = pos.coords.latitude;
      userLongitude = pos.coords.longitude;
      if (!isMapDrawn) {
        drawMap(userLatitude, userLongitude);
        setCourseMarker();
        isMapDrawn = true;
      }
      addMarker(new kakao.maps.LatLng(userLatitude, userLongitude))
    });
  }
};

const makeCourseNaviHTML = (data) => {
  const courseWrap = document.getElementById("courseWrap");
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<li class="course">`;
    html += `<p>${data[i].course_name}</p>`;
    html += `</li>`;
  }
  html += `<li id="myPosition" class="course on">나의 위치</li>`;

  courseWrap.innerHTML = html;
};

// 코스 데이터를 불러오는 fetch 함수 async - await
const getCourseList = async () => {
  const response = await fetch("/api/course");
  const result = await response.json();
  const data = result.data;
  courseData = data;
  makeCourseNaviHTML(data);
  configLocation();
};

getCourseList();

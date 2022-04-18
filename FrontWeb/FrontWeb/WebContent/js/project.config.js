const webAddress = 	"http://192.168.0.4:3000/";
const webPhoto = "http://192.168.0.4:3000/photo/";

function kakaoInit() {
    window.Kakao.init('이곳에 JavaScript 키 값을 입력해주세요');
    window.Kakao.Auth.setAccessToken(JSON.parse(sessionStorage.getItem('AccessKEY')));
}
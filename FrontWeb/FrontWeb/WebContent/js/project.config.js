const webAddress = 	"http://192.168.0.4:3000/";
const webPhoto = "http://192.168.0.4:3000/photo/";

function kakaoInit() {
    // 0b51ddc9f24f741b7aa493bdde5908b2
    // 28125d6e902519d48fa96e75483578bf
    window.Kakao.init('28125d6e902519d48fa96e75483578bf');
    window.Kakao.Auth.setAccessToken(JSON.parse(sessionStorage.getItem('AccessKEY')));
}
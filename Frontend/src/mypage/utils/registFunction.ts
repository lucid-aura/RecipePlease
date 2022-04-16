import { Alert } from "react-native";

// 비밀번호: 8자리 이상, 영문(소문자/대문자), 숫자, 특수문자 모두 포함
export const checkPasswordRule = (pwd:string) => {
    const reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    
    if (!reg.test(pwd)) {
      return false;
    } else {
      return true;
    }
}

// 아이디: 6자리 이상, 영문(대/소문자), 숫자 포함
export const checkIdRule = (id:string) => {
    const reg =  /^[a-zA-Z*0-9].{6,15}$/;
    if(!reg.test(id)) {
        return false;
    } else {
        return true;
    }
}
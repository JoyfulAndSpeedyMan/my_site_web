import cookies from 'js-cookie'
import jwt from 'jwt-decode'

const tokenKey = 'X-User-Token';
const userInfoKey ='user-info'
const defaultTokenExpire = 365;
export default {
    saveUserInfo(user){
        cookies.set(userInfoKey, user);
    },
    getUserInfo() {
        let user = cookies.getJSON(userInfoKey);
        if(user==undefined)
            return null;
        return user;
    },
    getUserInfoByToken(token) {
        let user;
        try{
            user=jwt(token)
        }
        catch(e){
            return null;
        }
        return user;
    },
    getUserInfoAndSaveToken(token) {
        this.saveToken(token);
        return this.getUserInfoByToken(token);
    },
    saveToken(token) {
        cookies.set(tokenKey, token, { expires: defaultTokenExpire })
    },
    getToken() {
        return cookies.get(tokenKey);
    },
    logout(){
        cookies.remove(tokenKey);
    }

}
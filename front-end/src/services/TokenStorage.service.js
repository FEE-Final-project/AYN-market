import Cookies from "universal-cookie";

export default class TokenStorage {

static cookies = new Cookies();

static isAuthenticated() {
    return this.getToken() !== null && this.getToken() !== undefined;
}

static getAuthenticationHeader() {
    return `JWT ${this.getToken()}`;
}
static storeToken(token){
    this.cookies.set('token',token,{path:'/'})
}
static getToken(){
    return this.cookies.get('token')
}
static storeRefreshToken(refreshToken){
    this.cookies.set('refreshToken',refreshToken,{path:'/'})
}
static getRefreshToken(){
    return this.cookies.get('refreshToken')
}
static clearCookies(){
    this.cookies.remove('token')
    this.cookies.remove('refreshToken')
    this.cookies.remove('user')
}
static storeUser(user){
    this.cookies.set('user',user,{path:'/'})
}
static getUser(){
    return this.cookies.get('user') || null
}

}


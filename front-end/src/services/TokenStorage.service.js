import Cookies from "universal-cookie";

export default class TokenStorage {

static cookies = new Cookies();

static setCartId(cartId){
    this.cookies.set('cartId',cartId,{path:'/'})
}
static setOrderId(orderId){
    this.cookies.set('orderId',orderId,{path:'/'})
}
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
    this.cookies.remove('cartId')
    this.cookies.remove('orderId')
}
static storeUser(user){
    this.cookies.set('user',user,{path:'/'})
}
static getUser(){
    return this.cookies.get('user') || null
}
static getCartId(){
    return this.cookies.get('cartId')
}
static getOrderId(){
    return this.cookies.get('orderId')
}

}


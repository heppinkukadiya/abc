
const BASE_URL = process.env.REACT_APP_BASE_URL ;
const ADMIN_URL = process.env.REACT_APP_ADMIN_URL ;

export const Api = {
    SIGNUP: BASE_URL + "/signup",
    LOGIN: BASE_URL + "/login",
    VERIFY_OTP: BASE_URL + "/verify-otp",
    FETCH_PRODUCTS: BASE_URL + "/products",
    ADMIN_LOGIN: ADMIN_URL + "/diamond/login",
    ADD_PRODUCT: ADMIN_URL + "/diamond/add-product",
    DELETE_PRODUCT: ADMIN_URL + "/diamond/delete-product",
}

console.log("Api.FETCH_PRODUCTS:", Api.FETCH_PRODUCTS);
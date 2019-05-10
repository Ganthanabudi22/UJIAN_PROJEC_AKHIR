import Axios from "axios";
import { urlApi } from "../support/urlApi";

export const cartCount = (int) => {
    return (dispatch) => {
        // Axios.get(urlApi + '/users?user_name=' + int).then((res)=>{
            Axios.get(urlApi + '/getCount?user_name_cart=' + int)
            .then((res) => {
                dispatch({
                    type : 'CART_COUNT',
                    payload : res.data[0].count
                })
            })
        // })
    }
}

export const resetCount = () => {
    return{
        type : 'RESET_COUNT'
    }
}
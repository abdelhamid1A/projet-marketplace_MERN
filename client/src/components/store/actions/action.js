import {ADD_TO_CART,DELETE_FROM_CART} from './types'

export function addToCart(product){
    return {
        type:ADD_TO_CART,
        product
    }
}
export function removeFromCart(index){
    return {
        type:DELETE_FROM_CART,
        index
    }
}
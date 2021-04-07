import React from 'react'
import CartItem from './cartItems'
import { connect } from 'react-redux'

function Cart(props) {

    return (
        <div className="product cart ">
            <table className="table table-dark text-center">
                <thead>
                    <tr>
                        <th scope="col">image</th>
                        <th scope="col">product name</th>
                        <th scope="col">price</th>
                        <th scope="col">action</th>
                    </tr>
                </thead>
                {props.cart.map((item, index) => (
                    <CartItem productData={item} productIndex={index} key={index} />
                ))}
            </table>

            <p className="text-white text-center border">Total : {props.total}</p>
            <button className="btn btn-primary btn-block col-12 m-2">Pay</button>
        </div>
    )
}
function mapStateToProps(state) {
    const { cart } = state
    return {
        cart: cart,
        total: cart.reduce((total, item) => total + item.product.price, 0)
    }
}

export default connect(mapStateToProps)(Cart)
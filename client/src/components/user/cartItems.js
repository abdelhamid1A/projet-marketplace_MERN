import React from 'react'
import {connect} from 'react-redux'
import {removeFromCart} from '../store/actions/action'

function CartItem(props) {
    const {productData,productIndex} = props
    const {product} = productData
    return (
        
            <tbody>
                <tr>
                    <td style={{width:"10%"}}>
                        <img src={'../imagesUploded/'+product.picture[0]} className="img-fluid " alt="logo" />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td><button className="btn btn-danger" onClick={()=>props.removeFromCart(productIndex)}>remove product</button></td>
                </tr>
            </tbody>
    )
}
function mapDispatchToProps(dispatch){
    return {
        removeFromCart : (index)=>dispatch(removeFromCart(index))
    }
}

export default connect(null,mapDispatchToProps)(CartItem)
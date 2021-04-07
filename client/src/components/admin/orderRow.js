import React from 'react'

export default function orderRow(props) {
    const {orderList} = props
    return (
        <tbody>
            
            {/* {
               !adsList.isSuspend && */}

                <tr>
                <td scope="row">{orderList.product[0].name}</td>
                <td>{orderList.seller[0].full_name}</td>
                <td>{orderList.buyer[0].name}</td>
                <td>{orderList.totalPrice}</td>
                <td>{orderList.address}</td>
                
                </tr>
            {/* } */}
                
                
            </tbody> 
    )
}

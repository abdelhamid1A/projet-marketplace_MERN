import React from 'react'
import axios from 'axios'

export default function ProductItems(props) {
    const {productList,getPrd} =props
    function deleteProduct(id) {
        console.log(id);
        axios.delete(process.env.REACT_APP_URL + 'product/', {data:{
            id:id
        }}
        )
            .then(response => {
                console.log(response);
                getPrd()
            })
            .catch(err => console.log(err))
    }
    return (
        
        <tbody>
            
                <tr>
                <th scope="row">{productList.name}</th>
                <td>{productList.description}</td>
                <td>{productList.price}</td>
                <td>{productList.category[0].name}</td>
                <td>
                    <button className="btn btn-danger" onClick={()=>deleteProduct(productList._id)}>delete </button>
                </td>
                </tr>
                
                
            </tbody> 
        
    )
}

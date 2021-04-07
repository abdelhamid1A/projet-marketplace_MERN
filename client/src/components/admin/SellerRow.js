import React from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function SellerRow(props) {
    toast.configure()
    const {sellerList,getseller} = props;
    function validSeller(id) {
        axios.patch(process.env.REACT_APP_URL+'seller/valid',{id:id})
        .then(response=>{
            toast.success(response.data.message)
            getseller()
        })
        .catch(err=>{
            console.log(err.response.data);
        })
    }
    return (
        <tbody>
            
                <tr>
                <th scope="row">{sellerList.full_name}</th>
                <td>{sellerList.email}</td>
                <td>{sellerList.phone}</td>
                <td>{sellerList.identity}</td>
                <td>
                    <button className="btn btn-success" onClick={()=>validSeller(sellerList._id)}>valid </button>
                </td>
                </tr>
                
                
            </tbody> 
    )
}

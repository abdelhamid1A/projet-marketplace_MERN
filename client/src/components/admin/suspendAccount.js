import React from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function SuspendAccount(props) {
    toast.configure()
    const {sellerList,getseller} = props;
    function SuspendSeller(id) {
        axios.patch(process.env.REACT_APP_URL+'seller/suspend',{id:id})
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
            
            {
               !sellerList.isSuspend &&

                <tr>
                <th scope="row">{sellerList.full_name}</th>
                <td>{sellerList.email}</td>
                <td>{sellerList.phone}</td>
                <td>{sellerList.identity}</td>
                <td>{sellerList.productsCount}</td>
                <td>{sellerList.type}</td>
                <td>
                    <button className="btn btn-danger" onClick={()=>SuspendSeller(sellerList._id)}>Suspend Account </button>
                </td>
                </tr>
            }
                
                
            </tbody> 
    )
}

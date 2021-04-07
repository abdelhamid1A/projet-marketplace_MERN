import React from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function SuspendAccount(props) {
    toast.configure()
    const {adsList,getAds} = props;
    function deletAds(id) {
        axios.delete(process.env.REACT_APP_URL+'ads',{data:{id:id}})
        .then(response=>{
            toast.success(response.data.message)
            getAds()
        })
        .catch(err=>{
            console.log(err.response.data);
        })
    }
    return (
        <tbody>
            
            {
               !adsList.isSuspend &&

                <tr>
                <td scope="row">
                    <img src={'../imagesUploded/'+adsList.picture} alt=""/>
                    </td>
                <td>{adsList.pricing}</td>
                <td>{adsList.startDate}</td>
                <td>{adsList.endDate}</td>
                <td>
                    <button className="btn btn-danger" onClick={()=>deletAds(adsList._id)}>delete </button>
                </td>
                </tr>
            }
                
                
            </tbody> 
    )
}

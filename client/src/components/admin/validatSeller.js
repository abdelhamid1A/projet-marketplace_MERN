import React from 'react'
import SellerRow from './SellerRow'
import axios from 'axios'

export default function ValidatSeller() {
    const [seller,setSeller] = React.useState([])
    function getInvalidSeller(){
        axios.get(process.env.REACT_APP_URL+'seller/sellers/false')
        .then(response=>{
            console.log(response.data);
            setSeller(response.data)

        })
        .catch(err=>{
            console.log(err.response.data);
        })
    }
    React.useEffect(() => {
        getInvalidSeller()
    }, [])
    return (
        <div className="col-md-11 rounded shadow-lg p-4 row  bg-white m-5">
            <table className="table" >
                <thead>
                    <tr>
                    <th scope="col">full_name</th>
                    <th scope="col">email</th>
                    <th scope="col">phone</th>
                    <th scope="col">identity</th>
                    <th scope="col">action</th>
                    </tr>
                </thead>
                {seller.map(item=>(
                    <SellerRow sellerList={item} key={item._id} getseller={getInvalidSeller}/>
                ))}
            </table>
        </div>
    )
}

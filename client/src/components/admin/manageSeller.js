import React from 'react'
import axios from 'axios'
import SuspendAccount from './suspendAccount'
import {useRouteMatch} from 'react-router-dom'
import AdsRow from './adsRow'


export default function ManageSeller() {
    const {url} = useRouteMatch()

    const [seller,setSeller] = React.useState([])
    const [ads,setAds] = React.useState([])
    function getInvalidSeller(){
        axios.get(process.env.REACT_APP_URL+'seller/sellers/true')
        .then(response=>{
            console.log(response.data);
            setSeller(response.data)

        })
        .catch(err=>{
            console.log(err.response.data);
        })
    }
    function getAds(){
        axios.get(process.env.REACT_APP_URL+'ads')
        .then(response=>{
            console.log(response.data);
            setAds(response.data)

        })
        .catch(err=>{
            console.log(err.response.data);
        })
    }
    React.useEffect(() => {
        getInvalidSeller()
        getAds()
    }, [])
    axios.get(process.env.REACT_APP_URL+'seller/sellers/true')
    return (
        <div className="col-md-11 rounded shadow-lg p-4 row  bg-white m-5">
            <table className="table text-center" >
                <thead>
                {url==='/admin-dashboard/manage-seller'?

                    <tr>
                    <th scope="col">full_name</th>
                    <th scope="col">email</th>
                    <th scope="col">phone</th>
                    <th scope="col">identity</th>
                    <th scope="col">products</th>
                    <th scope="col">type</th>
                    <th scope="col">action</th>
                    </tr>
                    :url==='/admin-dashboard/manage-ads'?
                    <tr>
                    <th scope="col">picture</th>
                    <th scope="col">pricing</th>
                    <th scope="col">Start date</th>
                    <th scope="col">End date</th>
                    </tr>
                    :''
                }
                </thead>
                {
                url==='/admin-dashboard/manage-seller'?
                    seller.map(item=>(
                        <SuspendAccount sellerList={item} key={item._id} getseller={getInvalidSeller}/>
                    ))
                    :url==='/admin-dashboard/manage-ads'?
                    ads.map(item=>(
                        <AdsRow adsList={item} key={item._id} getAds={getAds}/>
                    ))
                    :""
                }
            </table>
        </div>
    )
}

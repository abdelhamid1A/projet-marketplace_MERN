import React from 'react'
import Carousel from 'react-material-ui-carousel'
import axios from 'axios'
import '../style/oneProduct.css'

export default function Ads() {
    const [ads,setAds] = React.useState([])
    function getAds(){
        axios.get(process.env.REACT_APP_URL+'ads')
        .then(resp=>{
            setAds(resp.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    React.useEffect(() => {
        getAds()
    }, [])
    return (         
        <Carousel>
            {
                ads.map(ad => {
                    return <div className="carousel-ads-container" key={ad._id}>
                        <img alt="" src={`/imagesUploded/${ad.picture}`}/>
                    </div>
                })
            }
                
        </Carousel>
    )
}

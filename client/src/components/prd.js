import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import PayWithPaypal from './PayWithPaypal'
export default function Prd(props) {
    const [prd,setPrd] = React.useState({})
const token=localStorage.getItem('token')
const decodedToken=jwt(token)

const addOrder = async () => {
    await axios.post('http://localhost:4000/order/add',{
        id_product: props.match.params.id,
        id_seller: prd.id_seller,
        id_buyer: decodedToken._id,
        totalPrice: prd.price,
        address:decodedToken.address
    },{
        headers : {
            'auth-token' : token
        }
    }).then(resp => {
        console.log(resp);
        axios
        .patch("http://localhost:4000/seller/updateTurnOver/" + prd.id_seller, {
            turnOver: prd.price
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err.response);
        });
    }).catch(err =>{
        console.log(err.response.data);
    })

    
    }
    console.log({
        id_product: props.match.params.id,
        id_seller: prd.id_seller,
        id_buyer: decodedToken._id,
        totalPrice: prd.price,
        address:decodedToken.address
    });
    function findOneProduct(){
        const id = props.match.params.id
        console.log(id);
        axios.get(process.env.REACT_APP_URL+'product/'+id)
        .then(response=>{
            console.log(response.data);
            setPrd(response.data)
        })
        .catch(err=>{
            console.log(err);
        })
    }
    React.useEffect(() => {

        findOneProduct()
    }, [])
    return (
        // <div className=" mt-4 bg-dark" style={{height:"80vh" ,overflowX:"hidden"}}>
        //     <div className="row mt-1 " >
        //     <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-center mt-5" key={prd._id}>
        //                         <div className="single-product row">
        //                             <div className="product-thumb col-md-6 h-100" >
        //                                 <img src={'../imagesUploded/'+prd.picture} alt="im" className="img-fluid"/>
        //                             </div>
        //                             <div className="col-md-6">

        //                                 <div className="product-title">
        //                                     <h3><a href="">{prd.name}</a></h3>
        //                                 </div>
        //                                 <div className="product-btns">
        //                                     <button className="btn-small mr-5 btn-elemet">
        //                                         {prd.price}  
        //                                         {/* {Number(product.price*currency).toFixed(2)} */}

        //                                         </button>
        //                                         <PayWithPaypal totalPrice={prd.price} addOrder={addOrder} />
        //                                     {/* <button className="btn-round mr-5" onClick={()=>addToCart(product)} ><i className="fa fa-shopping-cart"></i></button>
        //                                     <button className="btn-round mr-5"><i className="fa fa-heart"></i></button> */}
        //                                     {/* <button className="btn-round mr-5"><Link to={'/prd/'+product._id}>Pay</Link> </button> */}
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //     </div>
        // </div>

        <div className="d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
            <div className="row bg-white shadow-lg m-1">
                <div className="col-md-6">
                <img src={'../imagesUploded/'+prd.picture} alt="im" className="img-fluid"/>
                </div>
                <div className="col-md-6 p-2">
                    <h3 className="mt-4">{prd.name}</h3>
                    <p className="mt-4" style={{fontSize:"18px"}}>{prd.description}</p>
                    <p className="mt-4" style={{fontSize:"18px"}}>{prd.price} $</p>
                    <PayWithPaypal totalPrice={prd.price} addOrder={addOrder} />
                </div>
            </div>
        </div>
    )
}

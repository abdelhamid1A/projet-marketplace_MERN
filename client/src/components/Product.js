import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../img/lg.png';
import '../style/product.css'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import { addToCart } from './store/actions/action';
import {connect} from 'react-redux'
import Ads from './ads'


function Product(props) {
    const cur = localStorage.getItem('currency')
    const [products,setProducts] = React.useState([])
    const [limit,setLimit] = React.useState(10)
    const [page,setPage] = React.useState(1)
    const [currency,setCurrency] = React.useState(0)
    function getAllProducts(){
        console.log(`${process.env.REACT_APP_URL}product/allProduct?limit=${limit}&page=${page}`)
        axios.get(`${process.env.REACT_APP_URL}product/allProduct?limit=${limit}&page=${page}`)
        .then(response=>{
            // console.log(response.data);
            setProducts(response.data)
            setPage(page+1)
        })
        .catch(err=>{
            console.log(err);
        })
    }
     function currencyChange(){
        //  console.log(curr);
        axios.get('http://data.fixer.io/api/latest?access_key=b6b7c6fb2ea8f7a7e36650de19b3509f')
        .then(response=>{
            const data = response.data.rates
            if(cur){
                var to = data[cur]
                setCurrency(to)
            }else{
                var to = data.EUR
                setCurrency(to)
            }
            // console.log(data);
            // return data
        }).catch(err=>console.log(err))
    }
    const fetchProduct=function fetchProduct (){
        setPage(page+1)
        console.log(page);
        console.log(`${process.env.REACT_APP_URL}product/allProduct?limit=${limit}&page=${page}`)
        axios.get(`${process.env.REACT_APP_URL}product/allProduct?limit=${limit}&page=${page}`)
          .then(response =>
            setProducts(products.concat(response.data))
          );
      };
    React.useEffect(() => {
        getAllProducts()
        currencyChange()
    }, [])
    
    function addToCart (product) {
        props.addToCart(product);
    }
    

    return (
        <div className="product">
            <InfiniteScroll
          dataLength={products.length}
          next={fetchProduct}
          hasMore={true}
          loader={<h4>End of page</h4>}
        >
            <div className="container mt-4 ">
                <Ads/>
                <div className="row">
                    
                        {products && products.map(product=>(
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 text-center mt-5" key={product._id}>
                                <div className="single-product">
                                    <div className="product-thumb">
                                        <img src={'./imagesUploded/'+product.picture[0]} alt="im" />
                                    </div>
                                    <div className="product-title">
                                        <h3><a href="">{product.name}</a></h3>
                                    </div>
                                    <div className="product-btns">
                                        <button className="btn-small mr-5 btn-elemet">
                                            {/* {product.price}   */}
                                            {Number(product.price*currency).toFixed(2)}

                                            </button>
                                        {/* <button className="btn-round mr-5" onClick={()=>addToCart(product)} ><i className="fa fa-shopping-cart"></i></button>
                                        <button className="btn-round mr-5"><i className="fa fa-heart"></i></button> */}
                                        <button className="btn-round mr-5"><Link to={'/prd/'+product._id+'?'}>Pay</Link> </button>
                                    </div>
                                </div>
                            </div>
                        ))

                        }
                </div>
            </div>
         </InfiniteScroll>
        </div>
    )
}

function mapDispatchToProps(dispatch){
    return {
        addToCart: (product) => dispatch(addToCart(product)),
    };
}
export default connect(null,mapDispatchToProps)(Product)
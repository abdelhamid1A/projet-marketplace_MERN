import React from 'react'
import axios from 'axios'
import ProductItems from './productItems'

export default function AllProduct() {
    const [product,setProduct]= React.useState([])
    const token = localStorage.getItem('token')
    function getProduct() {
        axios.get(process.env.REACT_APP_URL + 'product',{
            headers:{
                'auth-token':token
            }
        })
        .then(response=>{
        console.log(response)
        setProduct(response.data)
    })
    .catch(err=>console.log(err))
    }
    React.useEffect(() => {
        
        getProduct()
    }, [])
    return (
        <div className="col-md-11 rounded shadow-lg p-4 row  bg-white m-5">
            <table className="table" >
                <thead>
                    <tr>
                    <th scope="col">title</th>
                    <th scope="col">description</th>
                    <th scope="col">price</th>
                    <th scope="col">category</th>
                    <th scope="col">action</th>
                    </tr>
                </thead>
                {product.map(prd=>(
                    <ProductItems productList={prd} key={prd._id} getPrd={getProduct}/>
                ))}
            </table>
        </div>
    )
}

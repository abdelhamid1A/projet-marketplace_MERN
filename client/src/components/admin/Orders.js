import React from 'react'
import axios from 'axios'
import OrderRow from './orderRow'

export default function Orders() {
    const [order, setOrder] = React.useState([])
    function getOrders() {
        axios.get(process.env.REACT_APP_URL + 'admin/orders')
            .then(resp => {
                setOrder(resp.data);
            })
            .catch(err => console.log(err))
    }
    React.useEffect(() => {
        getOrders()
    }, [])
    return (
        <div className="col-md-11 rounded shadow-lg p-4 row  bg-white m-5">
            <table className="table" >
                <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">seller</th>
                        <th scope="col">buyer</th>
                        <th scope="col">price</th>
                        <th scope="col">address</th>
                    </tr>
                </thead>
                {order.map(item=>(
                    <OrderRow orderList={item} key={item._id} />
                ))}
            </table>
        </div>
    )
}

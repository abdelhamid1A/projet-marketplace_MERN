import React from 'react'
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useHistory } from 'react-router-dom'
import Page1 from './page1';
import Page2 from './page2';
import Info from '../info';
import '../../style/sellerDash.css'
import AddProduct from './addProduct'
import AllProduct from './allProduct'
import UpgradeAccount from './upgradeAccount'
import {
    Switch,
    Route,
    useRouteMatch,
    Link
} from 'react-router-dom'
import axios from 'axios';

export default function SellerDashboard() {
    // const {findUser} = props
    const [seller,setSeller] = React.useState({})
    const [valid,setValid] = React.useState(false)
    const [category,setCategory] = React.useState([])
    let history = useHistory()
    let { url } = useRouteMatch();
    function findSeller() {
        const token = localStorage.getItem('token')
        if(token){
            axios.get(process.env.REACT_APP_URL + 'seller/findSeller', {headers:{'auth-token':token}})
            .then(response=>{
                setSeller(response.data)
                setValid(response.data.findUser.isValid)
                axios.get(process.env.REACT_APP_URL + 'category')
                .then(response=>{
                    // console.log(response.data)
                    setCategory(response.data)
                })
                .catch(err=>{
                    console.log(err)
                })
            })
            .catch(err=>{
                console.log(err)
                history.push('/signIn')
            })
        }else{
            history.push('/signIn')
        }
    }

    React.useEffect(() => {
        findSeller()
        return () => {
            // cleanup
        }
    }, [])
    return (
        // <div className="container-fluid dash">

            <HelmetProvider >
                <Helmet>
                    <style type="text/css">{`
                        .navbarr{
                            display: none;
                        }
                    `}</style>
                </Helmet>

                <div className="row " style={{marginTop:"0.5px"}}>
                    <div className="col-md-2 category d-flex align-items-center ">
                        <ul className="col-md-2  ">

                            <li className="m-3">
                                <Link to={`${url}/info`}><i className="fa fa-user"></i> info</Link>
                            </li>
                            {
                              valid ?  
                            
                                    <>
                            <li className="m-3">
                                <Link to={`${url}/page1`}><i className="fa fa-chart-line"></i> statistic</Link>
                            </li>
                            <li className="m-3">
                                <Link to={`${url}/all-product`}><i className="fa fa-globe"></i> all product</Link>
                            </li>
                            <li className="m-3">
                                <Link to={`${url}/add-product`}><i className="fa fa-plus"></i> add product</Link>
                            </li>
                            <li className="m-3">
                                <Link to={`${url}/upgrade-account`}><i className="fa fa-level-up-alt"></i> upgrade account</Link>
                            </li>
                            </>
                            
                            :''
                            }
                        </ul>
                    </div>

                    <div className="col-md-10 info">
                    <Switch>
                        <Route exact path={url}>
                            <Info findSeller={seller}/>
                        </Route>
                        <Route exact path={`${url}/info`}>
                            <Info findSeller={seller}/>
                        </Route>
                        <Route exact path={`${url}/add-product`}>
                            <AddProduct category={category}/>
                        </Route>
                        <Route exact path={`${url}/all-product`}>
                            <AllProduct />
                        </Route>
                        <Route exact path={`${url}/upgrade-account`}>
                            <UpgradeAccount />
                        </Route>
                    </Switch>
                    </div>        
                </div>
                
                
            </HelmetProvider>
    )
}

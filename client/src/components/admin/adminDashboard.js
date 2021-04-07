import React from 'react'
import {useHistory} from 'react-router-dom'
import {Helmet,HelmetProvider} from 'react-helmet-async'
import AddAdmin from './addAdmin'
import AddAds from './addAds'
import ManageAds from './manageAds'
import ManageSeller from './manageSeller'
import ValidatSeller from './validatSeller'
import Order from './Orders'
import jwt from 'jwt-decode'
import {
    Switch,
    Route,
    useRouteMatch,
    Link
} from 'react-router-dom'

export default function AdminDashboard() {
    let history = useHistory()
    const token = localStorage.getItem('token')
    let status = jwt(token)
    console.log(status);
    
    function aze(){
      return ( <HelmetProvider >
                <Helmet>
                    <style type="text/css">{`
                        .navbarr{
                            display: none;
                        }
                    `}</style>
                </Helmet>
        </HelmetProvider>)
    }
    let { url } = useRouteMatch();
    // React.useEffect(() => {
    //     aze
    // }, [])
    // aze()
    return (
        <div>
            {aze()}
            {/* <HelmetProvider >
                <Helmet>
                    <style type="text/css">{`
                        .navbarr{
                            display: none;
                        }
                    `}</style>
                </Helmet> */}
    {
        status.isAdmin ?
            <div className="row " style={{marginTop:"0.5px"}}>
            <div className="col-md-2 category d-flex align-items-center ">
                <ul className="col-md-2  ">
                {status.is_super_admin &&

                    <li className="m-3">
                    <Link to={`${url}/add-admin`}><i className="fa fa-user"></i> add admin</Link>
                    </li>
                    
                }
                
                    <li className="m-3">
                        <Link to={`${url}/validate-seller`}><i className="fa fa-check"></i> validate seller</Link>
                    </li>
                    <li className="m-3">
                        <Link to={`${url}/manage-seller`}><i className="fa fa-tasks"></i> manage seller</Link>
                    </li>
                    <li className="m-3">
                        <Link to={`${url}/add-ads`}><i className="fa fa-ad"></i> add Ads</Link>
                    </li>
                    <li className="m-3">
                        <Link to={`${url}/manage-ads`}><i className="fa fa-cog"></i> manage Ads</Link>
                    </li>
                    <li className="m-3">
                        <Link to={`${url}/order`}><i className="fa fa-cog"></i> Orders</Link>
                    </li>
                </ul>
            </div>

            <div className="col-md-10 info">
            <Switch>
            {status.is_super_admin &&
                <div>
                    <Route exact path={url}>
                    <AddAdmin />
                </Route>
                
                <Route exact path={`${url}/add-admin`}>
                    <AddAdmin  />
                </Route>
                <Route exact path={`${url}/validate-seller`}>
                    <ValidatSeller />
                </Route>
                <Route exact path={`${url}/manage-Seller`}>
                    <ManageSeller />
                </Route>
                <Route exact path={`${url}/add-ads`}>
                    <AddAds />
                </Route>
                <Route exact path={`${url}/manage-ads`}>
                    <ManageSeller />
                </Route>
                <Route exact path={`${url}/order`}>
                    <Order />
                </Route>
                </div>
                
            
            }
                <Route exact path={`${url}/validate-seller`}>
                    <ValidatSeller />
                </Route>
                <Route exact path={`${url}/manage-Seller`}>
                    <ManageSeller />
                </Route>
                <Route exact path={`${url}/add-ads`}>
                    <AddAds />
                </Route>
                <Route exact path={`${url}/manage-ads`}>
                    <ManageAds />
                </Route>
            </Switch>
            </div>        
        </div>
        
        :history.push('/login-admin')
        
    } 
                
                
                
            {/* </HelmetProvider> */}
        </div>
    )
}

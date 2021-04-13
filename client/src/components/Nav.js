import React from 'react'
import '../style/App.css'
import logo from '../img/lg.png';
import {Link,useHistory} from 'react-router-dom'
import { Helmet, HelmetProvider } from "react-helmet-async";
import {connect} from 'react-redux'

function Nav(props) {
    const history = useHistory()
    console.log(props.item);
    const token = localStorage.getItem('token')
    function logOut(){
        localStorage.removeItem('token')
        window.location.reload();
        history.push('/')
    }
    // React.useEffect(() => {
    //     if(token){
    //         history.push('/products')
    //     }else{
    //         history.push('/')
    //     }
    // }, [token,history])
    return (
        <HelmetProvider >
            <div className="navbarr">

                <Helmet>
                        <style type="text/css">{`
                        
                        .goog-te-banner-frame.skiptranslate {
                            display: none !important;
                            } 
                        body {
                            top: 0px  !important;
                            }
                        .goog-logo-link, .goog-logo-link:link, .goog-logo-link:visited, .goog-logo-link:hover, .goog-logo-link:active {
                                display: none;
                              }
                              .goog-te-gadget .goog-te-combo{
                                border-radius: 15px;
                                color: white;
                                background: none;
                                outline: none;
                              }
                        .goog-te-gadget .goog-te-combo option{
                                background-color: #2F2F2F;
                              }
                             
                        `}</style>
                    </Helmet>
                <header>
                    <img src={logo} alt="logo" className="logo"/>
                    {/* <span className="brand">Brand</span> */}
                        <nav>
                        <ul className="nav-erea">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/product">Product</Link></li>
                            {/* <li><Link to="/cart"><i className="fa fa-shopping-cart"></i> {props.item}</Link></li> */}
                            {/* <li><Link to="">Contact</Link></li> */}
                            <li ><div  id="google_translate_element"></div></li>
                        </ul>
                        </nav>
                        {token ?
                        <button  className="btn-area" onClick={()=>logOut()}>logout</button>
                        :<Link to="/signIn" className="btn-area" >login</Link>
                        }
                </header>
            </div>
        </HelmetProvider>
    )
}
function mapStateToProps(state){
    const {cart} = state
    return{
        item : cart.length
    } 
}
export default connect(mapStateToProps)(Nav)

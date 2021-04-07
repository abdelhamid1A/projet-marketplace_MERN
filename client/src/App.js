import React from 'react';
import Nav from './components/Nav'
import Home from './components/Home'
import Product from './components/Product'
import SignIn from './components/SignIn'
import SignUp from './components/signUp'
import buyerSignUp from './components/user/buyerSignUp'
import sellerSignUp from './components/seller/sellerSignUp'
import beforVaidate from './components/MessageAfterSignup'
import validatAccount from './components/user/validateAccount'
import resetPassword from './components/seller/resetPassword'
import SellerDashboard from './components/seller/sellerDashboard';
import AdminDashboard from './components/admin/adminDashboard';
import LoginAdmin from './components/admin/loginAdmin';
import Cart from './components/user/cart';
import Prd from './components/prd';
import {Switch,Route,BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './components/store/store'


function App() {
  return (
    <Provider store={store}>
      <div className="App" >
      <BrowserRouter>
      <Nav/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/product' exact component={Product}/>
          <Route path='/signIn' exact component={SignIn}/>
          <Route path='/signUp' exact component={SignUp}/>
          <Route path='/buyer-sign-up' exact component={buyerSignUp}/>
          <Route path='/seller-sign-up' exact component={sellerSignUp}/>
          <Route path='/befor-vaidate' exact component={beforVaidate}/>
          <Route path='/reset-password' exact component={resetPassword}/>
          <Route path='/account/validate/' component={validatAccount}/>
          <Route path='/seller-dashboard' component={SellerDashboard}/>
          <Route path='/admin-dashboard' component={AdminDashboard}/>
          <Route path='/login-Admin' component={LoginAdmin}/>
          <Route path='/cart' component={Cart}/>
          <Route path='/prd/:id' component={Prd}/>
          

        </Switch>
      </BrowserRouter>
      
      
      
      </div >
    </Provider>
  );
}

export default App;

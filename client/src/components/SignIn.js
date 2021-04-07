import React from 'react'
import { Link } from 'react-router-dom'
import '../style/sign.css'
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from "react-router-dom";

export default function SignIn() {
    toast.configure()
    let history = useHistory();
    const { register, handleSubmit } = useForm()
    const login = (data) => {
        if (document.getElementById('seller').checked) {
            // console.log(data);
            axios.post(process.env.REACT_APP_URL + 'seller/login', data)
                .then(response => {
                    console.log(response.data);
                    if(response.data.message=='redirect to reset password'){

                        localStorage.setItem('token', response.data.token);
                        history.push('/reset-password')
                    }else{
                        localStorage.setItem('token', response.data.token);
                        history.push('/seller-dashboard')
                    }
                }).catch(err => {
                    toast.error('email or password incorrect')
                })

        } else if (document.getElementById('buyer').checked) {
            axios.post(process.env.REACT_APP_URL + 'user/signin', data)
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    history.push('/')
                }).catch(err => {
                    toast.error('email or password incorrect')
                })
        } else {
            toast.error('please select if your account seller or buyer')
        }
    }
    
    return (
        <div className="main">
            <div className="form-section mt-5">
                <h1 className="mb-3">sign In</h1>
                <form action="" onSubmit={handleSubmit(login)}>
                    <input type="text" placeholder="email" name="email" ref={register} />
                    <input type="password" placeholder="password" name="password" ref={register} />
                    <input type="radio" id="seller" name="status" value="seller" />
                    <label htmlFor="seller">seller</label>
                    <input type="radio" id="buyer" name="status" value="buyer" />
                    <label htmlFor="buyer">buyer</label>
                    <input type="submit" value="log In" />
                </form>
                <div className="athorInfo">
                    <Link to="/signup" >create account</Link>
                </div>
            </div>
        </div>

    )
}

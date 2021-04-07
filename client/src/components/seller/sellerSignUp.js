import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../style/sign.css'
import { useHistory } from "react-router-dom";
import axios from 'axios'

export default function SellerSignUp() {
    let history = useHistory();
    const initialValues = {full_name : '',email: '',phone: '',address: '',identity: ''}
    const validationSchema = Yup.object({
        full_name: Yup.string().min(5, 'enter full name').required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        phone: Yup.string().matches(/(?=.*(05|06|07))[0-9]{10}/, 'Is not in correct format').min(4, 'make a strong password more then 4 char').required('Required'),
        address: Yup.string().min(8, 'enter your correct address ').required('Required'),
        identity :Yup.string().min(4, 'identity is not correct').required('Required'),
    })
    const onSubmit=values=>{
        console.log(values);
        axios.post(process.env.REACT_APP_URL + 'seller', values)
    .then(response=>{
      // console.log(response);
      history.push('/befor-vaidate')
    })
    .catch(err=>{
      console.log(err.message);
    })
    }
    return (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <div className="main ">
            <Form action="" className="form-section mt-5">
    
              <Field type="text" placeholder="name" name="full_name" id="" />
              <div className="errMessage"><ErrorMessage name="full_name"  /></div>
    
              <Field type="text" placeholder="email" name="email" id="email" />
              <div className="errMessage"><ErrorMessage name="email"  /></div>
    
              <Field type="text" placeholder="phone" name="phone" />
              <div className="errMessage"><ErrorMessage name="phone"  /></div>
    
              <Field type="text" placeholder="address" name="address" />
              <div className="errMessage"><ErrorMessage name="address"  /></div>

              <Field type="text" placeholder="identity" name="identity" id="identity" />
              <div className="errMessage"><ErrorMessage name="identity"  /></div>
    
              <Field type="submit" value="sign Up" />
            </Form>
          </div>
        </Formik>
      )
}

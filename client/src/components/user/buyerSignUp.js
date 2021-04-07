import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../style/sign.css'
import { useHistory } from "react-router-dom";
import axios from 'axios'


export default function BuyerSignUp() {
  let history = useHistory();
  const validationSchema = Yup.object({
    name: Yup.string().min(5, 'enter full name').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(4, 'make a strong password more then 4 char').required('Required'),
    phone: Yup.string().matches(/^\d{10}$/, 'Is not in correct format').min(4, 'make a strong password more then 4 char').required('Required'),
    address: Yup.string().min(8, 'enter your correct address ').required('Required'),
  })
  const initialValues = { name: '', email: '', password: '', address: '', phone: '' }
  const onSubmit = values => {
    // console.log(values)
    axios.post(process.env.REACT_APP_URL + 'user/signup', values)
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

          <Field type="text" placeholder="name" name="name" id="" />
          <div className="errMessage"><ErrorMessage name="name"  /></div>

          <Field type="text" placeholder="email" name="email" id="email" />
          <div className="errMessage"><ErrorMessage name="email"  /></div>

          <Field type="password" placeholder="password" name="password" id="password" />
          <div className="errMessage"><ErrorMessage name="password"  /></div>

          <Field type="text" placeholder="phone" name="phone" />
          <div className="errMessage"><ErrorMessage name="phone"  /></div>

          <Field type="text" placeholder="address" name="address" />
          <div className="errMessage"><ErrorMessage name="address"  /></div>

          <Field type="submit" value="sign Up" />
        </Form>
      </div>
    </Formik>
  )
}

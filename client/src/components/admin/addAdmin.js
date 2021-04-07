import React from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'

export default function AddAdmin() {
    toast.configure()
    let hisory = useHistory()
    const initialValues = {
        full_name:'',
        email:'',
        phone:'',
        password: '',
        address:''
    }
    const validationSchema=Yup.object({
        full_name:Yup.string().required('required'),
        password:Yup.string().min(4,'make a string password'),
        email: Yup.string().email('Invalid email address').required('Required'),
        phone: Yup.string().matches(/(?=.*(05|06|07))[0-9]{10}/, 'Is not in correct format').min(4, 'make a strong password more then 4 char').required('Required'),
        address: Yup.string().min(8, 'enter your correct address ').required('Required'),
    })
    const onSubmit = values=>{
        console.log(values);
        axios.post(process.env.REACT_APP_URL+'admin',values)
        .then(response=>{
            console.log(response.data);
            toast.success('admin add')

        })
        .catch(err=>{
            console.log(err.response.data);
        })
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form className="col-md-11 rounded shadow-lg p-4 row  bg-white m-5">
            <div className="from-group">
                    <div className="my-3">
                        <label htmlFor="name" className="form-label fw-bold text-secondary">Full Name :</label>
                        <Field name="full_name" type="text" className="form-control" />
                        <div className="errMessage"><ErrorMessage name="full_name" /></div>
                    </div>
                    <div className="my-3">
                        <label htmlFor="name" className="form-label fw-bold text-secondary">email :</label>
                        <Field name="email" type="text" className="form-control" />
                        <div className="errMessage"><ErrorMessage name="email" /></div>
                    </div>
                    <div className="my-3">
                        <label htmlFor="name" className="form-label fw-bold text-secondary">password :</label>
                        <Field name="password" type="password" className="form-control" />
                        <div className="errMessage"><ErrorMessage name="password" /></div>
                    </div>
                    <div className="my-3">
                        <label htmlFor="name" className="form-label fw-bold text-secondary">phone :</label>
                        <Field name="phone" type="text" className="form-control" />
                        <div className="errMessage"><ErrorMessage name="phone" /></div>
                    </div>
                    <div className="my-3">
                        <label htmlFor="name" className="form-label fw-bold text-secondary">address :</label>
                        <Field name="address" type="text" className="form-control" />
                        <div className="errMessage"><ErrorMessage name="address" /></div>
                    </div>
                    <Field type="submit" value="add admin" className="btn btn-primary float-end" />
                    
            </div>
            </Form>
        </Formik>
    )
}

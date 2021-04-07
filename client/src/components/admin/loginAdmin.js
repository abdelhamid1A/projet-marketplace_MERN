import React from 'react'
import {useHistory} from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {toast} from 'react-toastify'
import * as Yup from 'yup';
import axios from 'axios'
export default function LoginAdmin() {
    toast.configure()
    let hisory = useHistory()
    const initailValues = { email: '', password: '' }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('password empty'),
    })
    const onSubmit = values => {
        axios.post(process.env.REACT_APP_URL+'admin/login',values)
        .then(response=>{
            console.log(response.data);
            localStorage.setItem('token',response.data)
            hisory.push('/admin-dashboard')

        }).catch(err=>{
            console.log(err.response.data);
            toast.error(err.response.data)
        })
    }
    return (
        <HelmetProvider>
            <Formik
                initialValues={initailValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <div className="admin-login d-flex justify-content-center align-items-center" style={{ backgroundColor: "#2F2F2F", height: "100vh" }}>
                    <Helmet>
                        <style type="text/css">{`
                            .navbarr{
                                display: none;
                            }
                            
                        `}</style>
                    </Helmet>
                    <div className="bg-white col-md-4 d-flex justify-content-center p-3 rounded row">
                        <Form>
                            <div className="form-group col-md-12">
                                <label htmlFor="email" className="form-label fw-bold text-secondary">email</label>
                                <Field type="text" className="form-control" id="email" name="email" />
                                <div className="errMessage"><ErrorMessage name="email" /></div>
                            </div>

                            <div className="form-group col-md-12">
                                <label htmlFor="email" className="form-label fw-bold text-secondary">password</label>
                                <Field type="password" className="form-control" id="password" name="password" />
                                <div className="errMessage"><ErrorMessage name="password" /></div>
                            </div>
                            <div className="col-md-12 mt-3">
                                <Field type="submit" className="btn btn-success float-end" value="login" />
                            </div>
                        </Form>
                    </div>
                </div>
            </Formik>

        </HelmetProvider>
    )
}

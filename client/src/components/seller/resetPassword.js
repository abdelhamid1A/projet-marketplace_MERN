import React from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import {useHistory} from 'react-router-dom'

export default function ResetPassword() {
    let history = useHistory()
    const initialValues = {password:'',newPassword:'',confirmPassword:''}
    const validationSchema = Yup.object({
        newPassword :Yup.string().required('Required').min(4,'make a strong password more than 4 chrs'),
        confirmPassword :Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    })
    const onSubmit =values=>{
        console.log(values);
        const token = localStorage.getItem('token')
        axios.patch(process.env.REACT_APP_URL+'seller/update',values,{ headers: { 'auth-token': token } })
        .then(response=>{
            // console.log(response);
            history.push('/seller-dashboard')
        })
        .catch(err=>console.log(err))
    }
    return (
        <Formik
            initialValues ={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <div className="main ">
                <Form action="" className="form-section mt-5">
                    <Field type="text" placeholder="password" name="password" id="password" />
                    <div className="errMessage"><ErrorMessage name="password"  /></div>

                    <Field type="text" placeholder="newPassword" name="newPassword" id="newPassword" />
                    <div className="errMessage"><ErrorMessage name="newPassword"  /></div>

                    <Field type="text" placeholder="confirm Password" name="confirmPassword" id="confirmPassword" />
                    <div className="errMessage"><ErrorMessage name="confirmPassword"  /></div>

                    <Field type="submit" value="reset Password"/>
                </Form>
            </div>
        </Formik>
    )
}

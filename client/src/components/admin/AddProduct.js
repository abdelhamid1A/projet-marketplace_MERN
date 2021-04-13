import React from 'react'
import {Formik,Form,Field} from 'formik'
import {db} from '../../firebase/firebase'
import firebase from 'firebase/app';
import {toast} from 'react-toastify'

export default function AddProduct() {
    toast.configure()
    const initialValues = {name:'',price:'',image:''}
    const onSubmit = values=>{
        console.log(values);
        // values.preventDefault()
        if (db) {
          db.collection('product').add({
            name: values.name,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            price: values.price,
            image: values.image
          }).then(()=>toast.success('product add'))
          .catch(err=>console.log(err))
        }
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <Form className="col-md-11 rounded shadow-lg p-4 row  bg-white m-5">
            <div className="my-3">
                <label htmlFor="name" className="form-label fw-bold text-secondary">Product Name :</label>
                <Field name="name" className="form-control" />
            </div>
            <div className="my-3">
                <label htmlFor="name" className="form-label fw-bold text-secondary">Product Price :</label>
                <Field name="price" className="form-control" />
            </div>
            <div className="my-3">
                <label htmlFor="name" className="form-label fw-bold text-secondary">image :</label>
                <Field name="image" className="form-control" />
            </div>
            <input type="submit" className="btn btn-primary" value="add product"/>
            </Form>
        </Formik
        >
    )
}

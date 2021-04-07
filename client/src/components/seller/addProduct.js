import React from 'react'
import { ErrorMessage, Formik, Form, Field } from 'formik';
import axios from 'axios'


export default function AddProduct(props) {
    const { category } = props
    console.log(category);
    const [picture, setPicture] = React.useState({})
    // const [category,setCategory] = React.useState({})
    // setCategory(category);
    const initialValues = { name: '', description: '', id_category: '', price: '', picture: '' }
    const onchange = e => {
        setPicture(e.target.files[0])
        // console.log(picture);
    }
    const onSubmit = values => {
        const token = localStorage.getItem('token')
        const { name, description, price,id_category } = values
        const formData = new FormData();
        formData.append('picture', picture);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('id_category', id_category);
        console.log(values);
        // values.picture = formData
        const data = {
            values: values,
            formData: formData
        }
        console.log(formData);
        // return
        axios.post(process.env.REACT_APP_URL + 'product/', formData,
            {
                headers: {
                    "auth-token": token
                }
            }
        )
            .then(response => {
                console.log(response);
            })
            .catch(err => console.log(err.response.data))
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >

            <Form className="col-md-11 rounded shadow-lg p-4 row  bg-white m-5">
                <div className="from-group">
                    <div className="my-3">
                        <label htmlFor="name" className="form-label fw-bold text-secondary">product title :</label>
                        <Field name="name" type="text" className="form-control" />
                        <div className="errMessage"><ErrorMessage name="name" /></div>
                    </div>
                    <div className="my-3">
                        <label htmlFor="description" className="form-label fw-bold text-secondary">product description :</label>
                        <Field name="description" type="text" className="form-control" />
                        <div className="errMessage"><ErrorMessage name="description" /></div>
                    </div>
                    <div className="my-3">
                        <label htmlFor="price" className="form-label fw-bold text-secondary">product price :</label>
                        <Field name="price" type="text" className="form-control" />
                        <div className="errMessage"><ErrorMessage name="price" /></div>
                    </div>
                    
                    
                    <div className="my-3">
                        {/* <label htmlFor="picture" className="form-label fw-bold text-secondary">product title :</label> */}
                        {/* <Field name="picture" type="file" className="form-control" 
                        onChange={onchange}
                          />  */}

                        <div className="my-3">
                            <label htmlFor="id_category" className="form-label fw-bold text-secondary">product category :</label>
                            <Field
                                as="select"
                                name="id_category"
                                className="form-select"
                            >
                                {category.map((cat) => (
                                    <option value={cat._id} key={cat._id}>{cat.name}</option>
                                ))}

                            </Field>

                            <div className="errMessage"><ErrorMessage name="name" /></div>
                        </div>
                        <label htmlFor="name" className="form-label fw-bold text-secondary">product image :</label>
                        <input id="picture" name="picture" className="form-control" type="file" onChange={onchange} multiple />
                        <div className="errMessage"><ErrorMessage name="picture" /></div>
                    </div>
                    
                </div>
                <button className="btn btn-primary  float-end">add Product</button>
            </Form>


        </Formik>
    )
}

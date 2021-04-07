import React from 'react'
import { Form, Formik, Field } from 'formik'
import axios from 'axios';
import PackWithPayapal from './PackWithPayapal'
import jwt from 'jwt-decode'

export default function UpgradeAccount() {
    // const [type,setType] = React.useState()
    const id = jwt(localStorage.getItem('token'))._id
    const [pricing, setPricing] = React.useState(0)
    const [name, setName] = React.useState('')
    const [type, setType] = React.useState([])
    const [showPaypalButton1, setShowPayPalButton1] = React.useState(false);
    // const [showPaypalButton2, setShowPayPalButton2] = React.useState(false);
    const initialValues = { type: '' }

    const onChange = (e) => {
        setName(e.target.value);
    }
    console.log(showPaypalButton1);

    React.useEffect(() => {



        axios.get(process.env.REACT_APP_URL + 'seller/types')
            .then(response => {
                console.log(response.data);
                setType(response.data)
                initialValues.type = type[0]._id
                console.log(type[0]._id);
            })
            .catch(err => {
                console.log(err);
            })
    }, [name, pricing])
    // const onSubmit = values => {
    //     console.log(values);
    // }

    const addStates = () => {
        if (name === 'pro') {
            console.log('if pro');
            setPricing(299)
        }
        else if (name === 'Expert') {
            console.log('if expert');
            setPricing(499)
        }
        // console.log(name);
        // console.log(pricing + " dddddddddddd");
        setShowPayPalButton1(true)
    }
    return (
        <Formik
            initialValues={initialValues}
            // onSubmit={onSubmit}
        >
            <div className="col-md-11 rounded shadow-lg p-4 row  bg-white m-5">
                <Form>

                    <Field
                        as='select'
                        name="type"
                        className="form-control"
                        onChange={(e) => onChange(e)}
                    >
                        <option value='' >Choose a pack</option>
                        {type.map(category => (
                            <option value={category.name} key={category.name}>{category.name}--{category.price_for_upgrade}</option>
                        ))}
                    </Field>
                    <input type="button" value="upgrad your acoount" onClick={addStates} className="btn btn-primary mt-3 float-end" />

                    {showPaypalButton1 && (
                        <PackWithPayapal name={name} turnOver={pricing} id={id} />
                    )}
                </Form>
               
            </div>
        </Formik>
    )
}

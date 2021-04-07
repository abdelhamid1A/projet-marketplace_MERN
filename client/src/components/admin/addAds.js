import React from 'react'
import axios from 'axios'

export default function AddAds() {
    const [pricing,setPricing] = React.useState('')
    const [startDate,setStartDate] = React.useState('2021/10/13')
    const [endDate,setEndDate] = React.useState('2021/10/13')
    const [picture, setPicture] = React.useState({})
    function submit(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('pricing', pricing);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('picture', picture);
        console.log(formData.entries());
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        axios.post(process.env.REACT_APP_URL+'ads',formData)
        .then(response=>console.log(response))
        .catch(err=>console.log(err))
    }
    return (
        <div>
            <form className="col-md-11 rounded shadow-lg p-4 row  bg-white m-5">
                <div className="from-group">
                    <div className="my-3">
                        <label htmlFor="name" className="form-label fw-bold text-secondary">pricing :</label>
                        <input name="pricing" type="text" className="form-control" onChange={(event)=>setPricing(event.target.value)}/>
                        {/* <div className="errMessage"><ErrorMessage name="name" /></div> */}
                    </div>
                    <div className="my-3">
                        <label htmlFor="startDate" className="form-label fw-bold text-secondary">startDate</label>
                        <input name="startDate" type="text" className="form-control" />
                        {/* <div className="errMessage"><ErrorMessage name="description" /></div> */}
                    </div>
                    <div className="my-3">
                        <label htmlFor="endDate" className="form-label fw-bold text-secondary">endDate</label>
                        <input name="endDate" type="text" className="form-control" />
                        {/* <div className="errMessage"><ErrorMessage name="price" /></div> */}
                    </div>
                    <div>
                        <label htmlFor="name" className="form-label fw-bold text-secondary">product image :</label>
                        <input id="picture" name="picture" className="form-control" type="file" 
                        onChange={(e)=>setPicture(e.target.files[0])}
                         multiple />
                        {/* <div className="errMessage"><ErrorMessage name="picture" /></div> */}
                    </div>
                    
                </div>
                <button className="btn btn-primary mt-4 float-end" onClick={(event)=>submit(event)}>add Product</button>
            </form>
        </div>
    )
}

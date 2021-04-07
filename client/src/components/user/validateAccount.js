import React from 'react'
import queryString from 'query-string'
import axios from 'axios'

export default function ValidateAccount(props) {
    React.useEffect(() => {
        const value= queryString.parse(props.location.search)
        console.log(value.token);
        axios.get(process.env.REACT_APP_URL+'user/account/validate/'+value.token)
        .then(response=>{
            console.log(response.data);
            localStorage.setItem('token',value.token)
        })
        .catch(err=>{
            console.log(err);
        })
        return () => {
            
        }
    }, [])
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height:"80vh",width:"100%"}} >
            <div className="alert alert-success text-center" style={{width:"90%"}}>your account is validate</div>
        </div>
    )
}

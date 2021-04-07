import React from 'react'

export default  function Info(props) {
    
    // const valid = findUser.isValid
    const {findUser}  = props.findSeller
    return (
        <div>

            <div className="col-md-11 rounded shadow-lg p-4 row personel-info bg-white m-5">
                <div className="col-md-4">
                    <img src="../azou2.jfif" className="img-fluid rounded-circle " alt="sqd"/>
                </div>
                    {
                        findUser ?
                <div className="col-md-8">
                        <span className="info-name">{findUser.full_name}</span><br/> 
                        <span className="info-phone"> {findUser.phone}</span><br/>
                        <span className="info-email"> {findUser.email}</span><br/>
                        <span className="info-identity">identity : <span className="info-email">{findUser.identity}</span></span><br/>
                        <span className="info-email">{findUser.type}</span><br/>
                        
                    
                    
                    {/* <span className="info-status">account : <span className="badge bg-success rounded-pill px-3 py-1">{findUser.isValid.toString()}</span></span><br/> */}
                     {findUser.isValid  
                       ? <React.Fragment><span className="info-status">account : <span className="badge bg-success rounded-pill px-3 py-1">open</span></span><br/></React.Fragment>
                    
                       : <React.Fragment><span className="info-status">account : <span className="badge bg-danger rounded-pill px-3 py-1">closed</span></span><br/></React.Fragment>
                    } 
                    <a href="#" className="btn btn-warning float-end text-white">update info</a>
                </div>
                :''
                }
            </div>
            <div className="row container d-flex justify-content-center ">
                <div className="col-md-5 row bg-white m-2 shadow-lg p-3 d-flex justify-content-center">
                    <div className="rounded-circle bg-warning img-sale col-md-12">
                        <img src="../sale.png" alt="sale_image" />
                    </div>
                    <div className="sale-info  col-md-12">
                        <span>Total : {findUser && findUser.turnOver}</span><br/>
                        {/* <span>130 items</span> */}
                    </div>
                </div>

                <div className="col-md-5 bg-white m-2 shadow-lg justify-content-center d-flex align-items-center fs-1 text-info ">
                    {findUser && findUser.productsCount} Products
                </div>

            </div>
        </div>
    )
}

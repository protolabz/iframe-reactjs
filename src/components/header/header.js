import React, { Component } from 'react'
import './header.css';

export default class componentName extends Component {
    state ={
        isShow:false,
        isShowSecure:false
    }
  render() {
    return (
        <div className='container-fluid border-bottom bg-light' style={{ position:"fixed",zIndex:"9999999",height:"40px" }}>
           <div className='row'>
           <div className='col-3 col-md-3 text-right p-1'>
           {/* &nbsp;  */}
             <div className="dropdown">
                {/*<button className="btn btn-dark" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className='fa fa-close'>&nbsp; </i>  Close
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ padding:"20px" }}>
                    <h1 style={{ fontSize:"15px" }}>Are you sure you want to close?</h1>
                    <p style={{ fontSize:"12px",color:"#768593" }}>You will lose any information that you've filled in.</p>
                     <div style={{ display:"flex" }}>
                    <button className='btn btn-default' style={{ width:"100px",marginRight:"5px" }}>
                        Stay
                    </button>
                    <button onClick={()=>this.closePopup} className='btn btn-primary' id="hidePopup">
                        Leave checkout
                    </button>
                    </div> 
                </div>*/}
             </div>
            </div>
            <div className='col-9 col-md-9 p-1 text-left' style={{ borderLeft:"1px solid #FFF" }}>
            {/* &nbsp; */}
                <div className="dropdown d-none d-sm-none d-md-block">
                    <button className="secureButton btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className='fa fa-lock'>&nbsp; </i>  Secure
                    </button>
                    <div className="dropdown-menu putArrow" aria-labelledby="dropdownMenuButton" style={{ width:"25%",padding:"20px" }}>
                    <div style={{ display:"inline-flex" }}>
                    <img src='/images/comodo.png' alt='secure' style={{ width:"73px",height:"40px" }} />
                    <p style={{ marginBottom:"0px",paddingLeft:"5px",fontSize:"10px" }}>Your info will be transferred securely over a SHA-256 encrypted connection.</p>
                    </div>
                    </div>
                </div>
            </div>
           </div>
        </div>

    )
  }
}

import React from 'react'
import './footer.css';
export default () => {
  return (
    <div className='container'>
        <div className='row'>
          <div className='col-sm-12 cols9-center mainOuterDiv mb-4'>
            <div className='row'>
              <div className='col-7 col-md-10 px-0'>
              <hr className='footerLine'/>
              </div>
              <div className='col-5 col-md-2'>
                <img className="logoImage" src='/images/trabo2.png' />
              </div>
            </div>
          </div>
        </div> 
    </div>
  )
}

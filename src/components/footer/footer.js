import React from 'react'
import './footer.css';
export default () => {
  return (
    <div className='container'>
        <div className='row'>
          <div className='col-sm-12 cols9-center mainOuterDiv mb-4'>
            <div className='row'>
              <div className='col-5 col-md-9 px-0'>
              <hr className='footerLine'/>
              </div>
              <div className='col-7 col-md-3'>
                <table>
                  <tbody>
                  <tr>
                    <td>
                      <p className='powered'>powered by</p> 
                    </td>
                    <td rowSpan='2'>
                    <img className="logoImage" src='/images/locationTrabo.png' />  
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <img className="logoImage" src='/images/traboText.png' />
                    </td>
                  </tr>
                  </tbody>
                </table>
                
              </div>
            </div>
          </div>
        </div> 
    </div>
  )
}

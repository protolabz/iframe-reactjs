import React, { Component } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './PaxDetails.css';
export default class componentName extends Component {
  state ={
    params:this.props.match.params,
    detail_product:[],
     locations:[],
     rates_pax_package:[],
     include_exclude:[],
     pax_details:[],
     additionalDesc:[],
     bannerImg:[],
     product:[],
     dates:[],
     OperationTime:[],
     OperationDate:null,
     OperationDateNormal:null,
     holidaysRows:[],
     showHolidays:false,
     isRequiredSelect:false,
     isRequiredBox:true,
     isTimeSelected:false,
     boxValue:[],
     selectValue:null,
     timeValue:null,
     cancellation_policy_package:[],
     cancellation_policy_pax:[],
     additional_productsMeals:[],
     additional_productsFoto:[],
     addProductsValue:0,
     currency:null,
     dateValue:null
  }
  componentWillMount(){
    axios({
      method: 'get',
      // url: `https://api.trabo.co/partner/activity/detail/${this.state.id}`,
      // url: `https://api.trabo.co/partner/activity/detail/A-09213790?date=2018-11-17&time=8:30 AM`,
      url: `https://api.trabo.co/partner/activity/detail/A-09229850`,
      })
      .then((res) => {
          // console.log(res);
          var data = res.data.response.product.additional_description.description;
          var len = res.data.response.product.additional_description.description.length;
              for(let i=0;i<=len-1;i++){
                  if(data[i].type==='check_box' && data[i].mandatory==='1'){
                      this.setState({isRequiredBox:false})
                  }
                  if(data[i].type==='list_box' && data[i].mandatory==='1'){
                      this.setState({isRequiredSelect:false})
                      
                  }
              }
          this.setState({
              detail_product:res.data.response.detail_product,
              product:res.data.response.product,
              additional_productsMeals:res.data.response.product.additional_products[0],
              additional_productsFoto:res.data.response.product.additional_products[1],
              rates_pax_package:res.data.response.detail_product.rates_pax_package,
              include_exclude:res.data.response.detail_product.include_exclude,
              locations:res.data.response.detail_product.location,
              pax_details:res.data.response.product.additional_description.pax_details,
              additionalDesc:res.data.response.product.additional_description.description,
              bannerImg:res.data.response.detail_product.image,
              dates:res.data.response.operationDate,
              cancellation_policy_pax:res.data.response.product.cancellation_policy.cancellation_policy_pax,
              cancellation_policy_package:res.data.response.product.cancellation_policy.cancellation_policy_package,
              currency:res.data.diagnostic.currency
          })

      })
      .catch((e) =>
      {
          console.error(e);
          this.setState({success:'Alert: Something went wrong'});
      });
  }
  render() {
    let {additionalDesc,cancellation_policy_pax,cancellation_policy_package,params,
        currency,detail_product,product,rates_pax_package} = this.state;
    let time = params.time.replace(/-/g,' '),productDate = new Date(params.date).toGMTString();
    let dts = (productDate.split(' ')),dd,mm,yy,dday;
    dd = dts[1];
    mm = dts[2];
    yy = dts[3];
    dday = dts[0];
    let preDate = dday+ " " +dd+ " " +mm+ " " +yy;
    let standardPax,otherPax,CancelationPolicy,CancelationPolicyPackage,additonalData,fullYear = new Date().getFullYear();
    let lastYear = fullYear - 1,quota = product.quota - product.used_quota,addDescText,addDescList,addDescCheck,
    reff;
    
 //Rates Data
 if(rates_pax_package.length!==0){
    function formatThousands(n, dp) {
        var s = ''+(Math.floor(n)), d = n % 1, i = s.length, r = '';
        while ( (i -= 3) > 0 ) { r = ',' + s.substr(i, 3) + r; }
        return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10,dp||2)) : '');
      }
    standardPax = (
       rates_pax_package.map((item,index) => (
           item.amount>0 && item.pax_type==='ADULT' || item.pax_type==='CHILD' || item.pax_type==='INFANT'?
        <div className='col-sm-4 mb-3' key={item.id}>
            <div className='row ratesDiv px-0 mx-0'>
                <div className='col-sm-7 mt-2'>
                    <h5 className='PaxType'>{item.pax_type}</h5>
                    <p className='PaxPrice'>IDR {formatThousands(item.amount)}</p>
                    <p className='PaxAge mb-2'>Age {item.age_from}-{item.age_to}</p>
                </div>
                <div className='col-sm-5 mt-3'>
                    <input type='number' className='form-control Box'/>
                </div>
            </div>
        </div>
        :''
       ))
   )

   otherPax = (
    rates_pax_package.map((item,index) => (
        item.amount>0 && (item.pax_type==='ADULT' || item.pax_type==='CHILD' || item.pax_type==='INFANT')?
     ''
     :<div className='col-sm-4 mb-3' key={index}>
     <div className='row ratesDiv px-0 mx-0'>
         <div className='col-sm-7 mt-2'>
             <h5 className='PaxType'>{item.pax_type}</h5>
             <p className='PaxPrice'>IDR {formatThousands(item.amount)}</p>
             <p className='PaxAge mb-2'>Age {item.age_from}-{item.age_to}</p>
         </div>
         <div className='col-sm-5 mt-3'>
             <input type='number' className='form-control Box'/>
         </div>
     </div>
 </div>
    ))
)
}  
    if(cancellation_policy_pax){
        CancelationPolicy = (
            cancellation_policy_pax.map((item,index) => (
                <div className='col-sm-10 ' key={index}>
                    <input className='form-control CancelationTextBox' type="text" value={item} readOnly/>
                </div>
            ))
        )
    }
    if(cancellation_policy_package){
        CancelationPolicyPackage = (
            cancellation_policy_pax.map((item,index) => (
                <div className='col-sm-10 ' key={index}>
                    <input className='form-control CancelationTextBox' type="text" value={item} readOnly/>
                </div>
            ))
        )
    }

    if(product.additional_products){
    let a = product.additional_products;
     additonalData = (      
        a.map((item,i) => (
            <div className='col-sm-12' key = {i}>
            <h5 className='Meals mt-4'>{item.name}</h5>
            <hr/>
            {
                item.details.map((it,i) => (
                   <div className='row' key={i}>
                    <div className='col-sm-3'>
                    <label style={{ display:"flex" }}>
                    <button id="subs" className="pull-left btnMinus"><i className='fa fa-minus'></i></button>
                    <input type="text" value={this.state.addProductsValue} className="additoinalTextBox form-control pull-left" id="noOfRoom" name="noOfRoom" />&nbsp;
                    <button type="button" id="adds" className="btnPlus" ><i className='fa fa-plus'></i></button>
                    </label>
                    </div>
                    <div className='col-sm-6'>
                        <h5 className='addProductRightHead'>{it.description} <span className='productAmt'> ({currency} {formatThousands(it.amount)}) </span></h5>
                        <p className='Remark'>Remark:{it.remark} </p>
                    </div>
                    </div>
                ))
            }
                </div>         
            )) 
        )
        }
    function formatThousands(n, dp) {
        var s = ''+(Math.floor(n)), d = n % 1, i = s.length, r = '';
        while ( (i -= 3) > 0 ) { r = ',' + s.substr(i, 3) + r; }
        return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10,dp||2)) : '');
      }

          //Additional Description
    if(additionalDesc.length!==''){
        addDescText = (
            additionalDesc.map(item => 
                item.type === 'text' ? (
                <div key={item.heading}>
                    <h5 className='Tempat px-4 mb-0'>{item.heading}</h5>
                    <p className='tempatText mx-4'>{item.items[0]}</p>
                </div>
                ) 
                : ''
            ));
         addDescCheck = (
            additionalDesc.map(item => 
                item.type === 'check_box' ? (
                <div key={item.heading}>
                    <h5 className='Perlengkapan px-4 mb-0'>{item.heading} {item.mandatory==='1'?  <i className='fa fa-asterisk requiredField'></i>:''}</h5>
                    <ul className='pelam mb-4'>
                    {
                        item.items.map((chk,index) =>(
                        <div key={chk} className="custom-control custom-checkbox">
                            <input type="checkbox" onClick={this.handleCheckbox} className="custom-control-input" value={chk} id={`customCheck${index}`}/>
                            <label className="custom-control-label chkBoxLabel" htmlFor={`customCheck${index}`}>{chk}</label>
                        </div>
                        ))
                    }
                    
                    </ul>
                </div>
                ) : 
            ''
            ));
    
        addDescList = (
            additionalDesc.map((item,index) => 
                item.type === 'list_box' ? (
                    <div key={index}>
                        <h5 className='Kendaraan mx-4 mb-3'>{item.heading} {item.mandatory==='1'?  <i className='fa fa-asterisk requiredField'></i>:''}</h5>
                        <div className='selectdiv'>
                            <select onChange={(e) => this.handleSelectBox(e.target.value)} className='Text-Box mx-4'>
                            <option disabled={true} selected={true}>Select option</option>
                            {
                                item.items.map((list,index) =>(
                                <option key={index}>{list}</option>
                                ))
                            }
                            </select>
                        </div>
                    </div>  
                    ) : 
            ''
            ));
        }
        if(product.referral){
        reff = (
            product.referral.map((item,index) =>(
                <option key={index} value={item}>{item}</option>
            ))
            )
        }


    return (
      <div className='container mt-5 mb-5'>
      <div className='row'>
          <div className='col-sm-9 cols9-center mainOuterDiv'>
          <div className='row mb-4'>
              <div className='col-sm-12'>
                  <NavLink to='#'  onClick={this.props.history.goBack} className='Select-another-activ'><i className='fa fa-angle-left'> </i> Pick another date</NavLink>
              </div>
          </div>
          <div className='row mb-3'>
              <div className='col-sm-12'>
              <h4 className='Youre-viewing'>You're booking</h4>
              <p className='productName'>{detail_product.name}</p>
              <p className='mb-5 prodDescTop'>{time} -- {preDate}</p>
              </div> 
          </div>

          <div className='row mb-3'>
              <div className='col-sm-12'>
              <h1 className='PAX-Details mb-4'>PAX Details</h1>
                <label className='Name'>NAME</label>
                <div className='col-sm-10 px-0 mb-3'>
                  <input type='text' name='name' className='Text-Box mt-2 mb-3' />
                </div>
                
                <label className='Name'>PHONE NUMBER</label>
                <div className='row'>
                  <div className='col-sm-2 pr-3'>
                    <input type='text' name='name' className='Text-Box mt-2 mb-3' />
                  </div>
                  <div className='col-sm-3 px-0'>
                    <input type='text' name='name' className='Text-Box mt-2 mb-3' />
                  </div>
                </div>
                 
                <div className='row mt-4'>
                    <div className='col-sm-12 px-0'>
                        <h1 className='PAX-Details mt-4'>Tickets</h1>
                    </div>
                     {standardPax}
                 </div>
                <div className='row mt-4'>
                    <div className='col-sm-12 px-0'>
                        <h2 className='CancelationPax'>CANCELATION POLICY PAX</h2>
                    </div>
                    {CancelationPolicy}
                </div>  

                <div className='row mt-5'>
                    <div className='col-sm-12 px-0'>
                    <h2 className='CancelationPax'>PACKAGE</h2>
                    {otherPax}

                 </div>
                  </div>  
                 <div className='row mt-4'>
                    <div className='col-sm-12 px-0'>
                        <h2 className='CancelationPax'>CANCELATION POLICY PACKAGE</h2>
                    </div>
                    {CancelationPolicyPackage}
                </div>   
                <div className='row mt-5'>
                    <div className='col-sm-12 px-0'>
                        <h2 className='CancelationPax'>ADDITIONAL PAX DETAILS</h2>
                        
                    </div>
                    {additonalData}  
                </div>
                    
                <div className='row mt-5'>
                <h2 className='CancelationPax'>ADDITIONAL PAX DETAILS</h2>
                            {
                                addDescText?addDescText:''
                            }
                            {
                                addDescCheck?addDescCheck:''
                            }

                            {
                                addDescList?
                                    addDescList
                                :''
                            }
                </div>      

                <div className='row mt-5'>
                    <div className='col-sm-10'>
                    <h2 className='CancelationPax'>REFERRAL</h2>
                    <select className='Text-Box form-control'>
                            {reff}
                        </select>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className='col-sm-10'>
                    <h2 className='CancelationPax'>ADDITIONAL COMMENTS (Optional)</h2>
                        <textarea className='TextArea form-control'></textarea>
                    </div>
                </div>
              </div> 
          </div>
          </div>
      </div>
      </div>    
    )
  }
}

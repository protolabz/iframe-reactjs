import React, { Component } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './PaxDetails.css';
import IntlTelInput from 'react-intl-tel-input';
import '../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import '../../../node_modules/react-intl-tel-input/dist/main.css';
// import {ActivityDetail} from '../ChooseActivity/ActivityDetail';
import AdditionalData from './additionalData';
import ActivityDetail from '../ChooseActivity/ActivityDetail';
var arr =  {};
var otherPaxArr = {};

export default class componentName extends Component {
  state ={
    // params:this.props.match.params,
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
     isRequiredSelect:true,
     isRequiredBox:true,
     isTimeSelected:false,
     boxValue:[],
     selectValue:null,
     timeValue:null,
     cancellation_policy_package:[],
     cancellation_policy_pax:[],
     additional_productsMeals:[],
     additional_productsFoto:[],
     additionalPaxValues:null,    
     currency:null,
     dateValue:null,
     max_per_booking:0,
     min_per_booking:0,
     quota:0,
     used_quota:0,
     packageValues:[],
     //ImpData Form
     name:null,
     email:null,
     productCode:this.props.productId,
     paymentType:null,
     date:this.props.dateValue,
     amount:null,
     total_amount:null,
     operation_time:this.props.timeValue,
     phone_code:null,
     additional:[],
     user_code:null,
     refferal:null,
     phone:null,
     paxDetailsName:null,
     standardPax:{},
     package:[],
     additional_description:{},
     addProductsValue:[
            {id:1,qty:0},
     ],
     addProductsValue1:[
        {id:1,qty:0},
    ],
    addProductsValueQuota:[
        {id:1,qty:0,max_per_booking:0},
    ],
     commentBox:null,
     promoCode:false,
     //Errors
     quotaE:false,
     reqiredE:false,
     standardPaxE:false,
     otherPaxE:false,
    // Promo API states
     product_code:null,
     sub_total_pax:null,
     sub_total_package:null,
     sub_total_additions:null,
     sub_total_frontend:null,
     discount:null,
     commission:null,
     service:null,
     total_frontend:null,
     minimum_depos:null,

  }
  componentWillMount(){
    axios({
      method: 'get',
      // url: `https://api.trabo.co/partner/activity/detail/${this.state.id}`, A-09229850
      // url: `https://api.trabo.co/partner/activity/detail/A-09213790?date=2018-11-17&time=8:30 AM`,
      url: `https://api.trabo.co/partner/activity/detail/A-09213790`,
      })
      .then((res) => {
          // console.log(res);
        //   console.log(res.data.response.product.additional_products)
          let addPr = res.data.response.product.additional_products;
          let detData;
          let arr = [];
          for(let i=0; i < addPr.length; i++){
                for(let j=0; j<addPr[i].details.length; j++){
                   detData = addPr[i].details[j];
                   arr.push(addPr[i].details[j])
                }
          }
          this.setState({additionalPaxValues:arr})
          var data = res.data.response.product.additional_description.pax_details;
          var len = res.data.response.product.additional_description.pax_details.length;
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
              additionalDesc:res.data.response.product.additional_description.pax_details,
              bannerImg:res.data.response.detail_product.image,
              dates:res.data.response.operationDate,
              cancellation_policy_pax:res.data.response.product.cancellation_policy.cancellation_policy_pax,
              cancellation_policy_package:res.data.response.product.cancellation_policy.cancellation_policy_package,
              currency:res.data.diagnostic.currency,
              max_per_booking:res.data.response.product.max_per_booking,
              min_per_booking:res.data.response.product.min_per_booking,
              quota:res.data.response.product.quota,
              used_quota:res.data.response.product.used_quota,
          })

      })
      .catch((e) =>
      {
          console.error(e);
        //   this.setState({success:'Alert: Something went wrong'});
      });

      
  }
  incrementCounter = (id,count,maxB) => {
    var addValuesData = [...this.state.addProductsValue1];
    var addProBooking = [...this.state.addProductsValueQuota];
        if(addValuesData.findIndex(x=>x.id===id)>=0){
            for (var i = 0; i < addValuesData.length; i++){
                if (addValuesData[i].id ===id){
                    addValuesData[i]={id:id,qty:count};
                    this.setState({addProductsValue1: addValuesData});
                }
            }
        }
        if(addProBooking.findIndex(x=>x.id===id)>=0){
            for (var j = 0; j < addProBooking.length; j++){
                if (addProBooking[j].id ===id){
                    addProBooking[j]={id:id,qty:count,max_per_booking:maxB};
                    this.setState({addProductsValueQuota: addProBooking});
                }
            }
        }
        else{
            addValuesData= addValuesData.concat([{id:id,qty:count}]);
            addProBooking= addProBooking.concat([{id:id,qty:count,max_per_booking:maxB}]);
        }     
        this.setState({
            addProductsValue1: addValuesData,
            addProductsValueQuota:addProBooking,
            quotaE:false
        });
  }

  decrementCounter = (id,count,maxB) => {
    var addValuesData = [...this.state.addProductsValue1];
    var addProBooking = [...this.state.addProductsValueQuota];
        if(addValuesData.findIndex(x=>x.id===id)>=0){
            for (var i = 0; i < addValuesData.length; i++){
                if (addValuesData[i].id ===id){
                    addValuesData[i]={id:id,qty:count};
                    this.setState({addProductsValue1: addValuesData});
                }
            }
        }
        if(addProBooking.findIndex(x=>x.id===id)>=0){
            for (var j = 0; j < addProBooking.length; j++){
                if (addProBooking[j].id ===id){
                    addProBooking[j]={id:id,qty:count,max_per_booking:maxB};
                    this.setState({addProductsValueQuota: addProBooking});
                }
            }
        }
        else{
            addValuesData= addValuesData.concat([{id:id,qty:count}]);
            addProBooking= addProBooking.concat([{id:id,qty:count,max_per_booking:maxB}]);
        }     
        this.setState({
            addProductsValue1: addValuesData, 
            addProductsValueQuota:addProBooking,
            quotaE:false
        });
  }

  //Handle Name change
  handleChangeName =(e) =>{
      this.setState({
          name:e.target.value,
          reqiredE:false
        })
    }
    //Email
    handleChangeEmail = (e) =>{
        this.setState({
            email:e.target.value,
            reqiredE:false
        })
    }
    //Mobile number Codes
    handler = (status, value, countryData, number, id) =>  {
        // console.log(status, value, countryData, number, id)
        this.setState({
            phone:value,
            phone_code:countryData.dialCode,
            reqiredE:false
        })
    };
   
    handleStandardPax =(e) => { 
            arr[e.target.name] = e.target.value;
            this.setState({
                standardPax: arr
            })
    }
    handleOtherPax = (e) => {
        otherPaxArr[e.target.name] = e.target.value;
        let packageValues = [...this.state.packageValues]
        if(packageValues.findIndex(x=>x.id===e.target.name)>=0){
            for (var j = 0; j < packageValues.length; j++){
                if (packageValues[j].id ===e.target.name){
                    packageValues[j]={id:e.target.name,qty:e.target.value};
                    this.setState({packageValues: packageValues});
                }
            }
        }
        else{
            this.setState({
                package: otherPaxArr,
                packageValues:this.state.packageValues.concat({id:e.target.name,qty:e.target.value})
            })
        }
        this.setState({
            package: otherPaxArr
        })
    }

    handleCheckbox = (e) => {   
        let val = e.target.value;    
        var value = this.state.boxValue;  
        if(value.includes(val)){          
            value.pop(val);
        }else{
            value.push(val);   
        }
        this.setState({
            boxValue: value,
            reqiredE:false
        });

        if(!this.state.isRequiredBox){
            this.setState({
                isRequiredBox: true,
                reqiredE:false
            })
        }   
      }
      handleSelectBox = (listValue) =>{
        this.setState({selectValue:listValue})
        if(this.state.additionalDesc[2].mandatory === '1'){
             this.setState({
                 isRequiredSelect: true
             })
        }
     }
     handleCommentBox =(e) =>{
        this.setState({
            commentBox:e.target.value
        })
     }
     handleRefferal = (slect) =>{
         this.setState({
             refferal:slect
         })
     }

     handleBook = () =>{
        const {name,email,productCode,date,operation_time,phone_code,phone,refferal,paxDetailsName,
            standardPax,additional_description,addProductsValue1,boxValue,selectValue,
            commentBox,product,isRequiredBox,isRequiredSelect,quota,used_quota,max_per_booking,
            addProductsValueQuota} =this.state;
            const packg = this.state.package;

            let adult=0,children=0,other=0;

            if(standardPax.adult){
                adult=standardPax.adult
            }
            if(standardPax.child){
                children=standardPax.child;
            }
            if(standardPax.child){
                other=standardPax.child
            }
            //Validations Related to Pax
            // console.log(name+ " !=null && "+email+" !=null && "+phone+" !=null && "+phone_code+" !=null  && "+isRequiredBox+" !== "+false+" && "+isRequiredSelect+ " !== " +false);
            if(name!=null && email!=null && phone!=null && phone_code!=null && isRequiredBox!=false && isRequiredSelect!=false){
                let quotaDiff = quota - used_quota,finalQuota;
                let tUsedQuota =0;
                    if(max_per_booking<quotaDiff){
                        finalQuota = max_per_booking;
                    }
                    else{
                        finalQuota = quotaDiff;
                    }
                if(addProductsValueQuota.length>1){
                    for(let i=0;i<=addProductsValueQuota.length-1;i++){
                        if(addProductsValueQuota[i].value>addProductsValueQuota[i].max_per_booking){
                            this.setState({quotaE:true});
                        }
                        else{
                            tUsedQuota = parseInt(adult)+parseInt(children)+parseInt(other);
                            if(tUsedQuota>finalQuota){
                                this.setState({standardPaxE:true})
                            }
                            else{
                                const pack = this.state.packageValues;
                                var packageQ = 0; 
                                for(let p = 0; p<pack.length; p++){
                                    packageQ = packageQ + parseInt(pack[p].qty);
                                }
                                  tUsedQuota = parseInt(tUsedQuota) + parseInt(packageQ); 
                                                                
                            }
                        }
                    }
                    if(tUsedQuota>finalQuota){
                    this.setState({standardPaxE:true})
                    }
                    else{
                        this.setState({reqiredE:false})
                        var databook = {
                            "token":"aadsfasdf",
                            "date":date,
                            "product_id":product.product_id,
                            // "product_code":productCode,
                            "product_code":"A-09213790",
                            "additional":addProductsValue1.splice(1),
                            "package":this.state.packageValues,
                            "adult":adult,
                            "children":children,
                            "toddlers":other,
                            "user_code":"10"
                       }
                       databook = JSON.stringify(databook);
                       axios({
                        method: 'post',
                        url: `https://api.trabo.co/partner/activity/total`,
                        headers: {
                            "Content-Type" : "application/json",
                            "Accept" : "application/json",
                            "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQxNjk0ZjljMzkzZDJmMzRlOTkwNzViMGUyOWI4MWJlZjYwMmNmOTVlYzA2ZGZkOWNkZGVlMzNmYmJjZGMzOGEyZDk5MzhmNzc1ODlkYTFlIn0.eyJhdWQiOiI4IiwianRpIjoiNDE2OTRmOWMzOTNkMmYzNGU5OTA3NWIwZTI5YjgxYmVmNjAyY2Y5NWVjMDZkZmQ5Y2RkZWUzM2ZiYmNkYzM4YTJkOTkzOGY3NzU4OWRhMWUiLCJpYXQiOjE1MzQ3NDgxNjEsIm5iZiI6MTUzNDc0ODE2MSwiZXhwIjoxNTk3OTA2NTYxLCJzdWIiOiIxMCIsInNjb3BlcyI6W119.PTJDSvnkPoCmfR19HF5JFf7IZik8JqZg0CNTCUaiDmaXZqx8QTyTjktH2MUgG6TUQC1kDlUKscIW6yDkEOFfr2HgvFKvsmj09qjrk06L0ClaQax3uoPaMVo88DD3ucruWAw34yrRi9DXAZTWm4KpgaSBv3bnuMSUlLK496XXrkBUY6rDKOk2GT9f5qPYmZLG-rl1CTv3Yvz7CjXFO5AJasWKGvnx7YCE8bRSt3jw-DUClyT4AzB24VorD_02wxz00vcTffApdWuv7-3LMq-mhk5m8E3NJH_6zBsP_knGUVihXleScmopPeinaMToNo9mUFMSVTSUV4jAHHWwetoCrFzLpIoTSNUfUPQUay902g8icPMh8qMFYMUB0GDh0iIm7jkFCxuhSzYFc3IeSpZ9y-_SIVrA3Ayc5d4rV4aluvK22xDsc-9eCcqJ76ANpZSPRULd5eQ6hQuSORuF0brg-VzC-kjkr34Z2OAS416-PCtZ6VFxqhab6HhuHYUGlNj9Rz13WJWJjYG8F_p3TdphjaIkHEEWu14-5jjFReYa4Eb0y5mJuqxKMGgvjALUAewG40T6dA10Lyq8YZrLRB6Fy2L7JyF0sPHdmFDJoQW9ZDLDGXmvJ2feLQDcuxDWMT1XQaAmLdBek3q3AR2Edx1DQB7852TC9mvk5ZkjAlTfe04"
                          },
                          data:databook
                        })
                        .then((res) => {
                            console.log(res);
                        })
                    }
                }

            }   
            else{
                this.setState({reqiredE:true})
            }

     }
     refreshRoute =() =>{
        window.location.reload()
     }
  render() {
    let {additionalDesc,cancellation_policy_pax,cancellation_policy_package,params,
        currency,detail_product,product,rates_pax_package} = this.state;
    let time = this.state.operation_time,productDate = new Date(this.state.date).toGMTString();
    let dts = (productDate.split(' ')),dd,mm,yy,dday;
    dd = dts[1];
    mm = dts[2];
    yy = dts[3];
    dday = dts[0];
    let preDate = dday+ " " +dd+ " " +mm+ " " +yy;
    let standardPax,otherPax,CancelationPolicy,CancelationPolicyPackage,additonalData,fullYear = new Date().getFullYear();
    let lastYear = fullYear - 1,quota = product.quota - product.used_quota,addDescText,addDescList,addDescCheck,
    reff, a;

    //Get Quota Value
    let quotaDiff = quota - this.state.used_quota,finalQuota;
    if(this.state.max_per_booking<quotaDiff){
        finalQuota = this.state.max_per_booking;
    }
    else{
        finalQuota = quotaDiff;
    }
 //Rates Data
 if(rates_pax_package.length!==0){
    function formatThousands(n, dp) {
        var s = ''+(Math.floor(n)), d = n % 1, i = s.length, r = '';
        while ( (i -= 3) > 0 ) { r = ',' + s.substr(i, 3) + r; }
        return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10,dp||2)) : '');
      }
    standardPax = (
       rates_pax_package.map((item,index) => (
           item.amount>0 && (item.pax_type==='ADULT' || item.pax_type==='CHILD' || item.pax_type==='INFANT')?
        <div className='col-sm-4 mb-3' key={item.id}>
            <div className='row ratesDiv px-0 mx-0'>
                <div className='col-sm-7 mt-2'>
                    <h5 className='PaxType'>{item.pax_type}</h5>
                    <p className='PaxPrice'>{currency} {formatThousands(item.amount)}</p>
                    <p className='PaxAge mb-2'>Age {item.age_from}-{item.age_to}</p>
                </div>
                <div className='col-sm-5 mt-3'>
                    <input 
                    min={item.minimum} 
                    max={item.maximum} 
                    type='number' 
                    onChange={this.handleStandardPax} 
                    name={item.pax_type.toLowerCase()} 
                    className='form-control Box'
                    />
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
     :<div className='col-sm-6 mb-3' key={index}>
     <div className='row ratesDiv px-0 mx-0'>
         <div className='col-sm-7 mt-2'>
             <h5 className='PaxType'>{item.pax_type}</h5>
             <p className="paxCountClass">Minimum {item.minimum} PAX</p>
             <p className='PaxPrice'>{currency} {formatThousands(item.amount)}</p>
             <p className='PaxAge mb-2'>Age {item.age_from}-{item.age_to}</p>
         </div>
         <div className='col-sm-5 mt-3'>
             <input type='number' min={item.minimum} max={item.maximum} onChange={this.handleOtherPax} name={item.id} className='form-control Box'/>
         </div>
     </div>
 </div>
    ))
)
// otherPax = (
//     rates_pax_package.map((item,index) => (
//         item.amount>0 && (item.pax_type==='ADULT' || item.pax_type==='CHILD' || item.pax_type==='INFANT')?
//      ''
//      :<div className='col-sm-4 mb-3' key={index}>
//      <div className='row ratesDiv px-0 mx-0'>
//          <div className='col-sm-7 mt-2'>
//              <h5 className='PaxType'>{item.pax_type}</h5>
//              <p className='PaxPrice'>IDR {formatThousands(item.amount)}</p>
//              <p className='PaxAge mb-2'>Age {item.age_from}-{item.age_to}</p>
//          </div>
//          <div className='col-sm-5 mt-3'>
//              <input type='number' min='0' onChange={this.handleOtherPax} name={item.pax_type} className='form-control Box'/>
//          </div>
//      </div>
//  </div>
//     ))
// )
}  
    if(cancellation_policy_pax){
        CancelationPolicy = (
            cancellation_policy_pax.map((item,index) => (
                <div className='col-sm-10 ' key={index}>
                    <input className='form-control CancelationTextBox' name={"cancelationPax"+index} type="text" value={item} readOnly/>
                </div>
            ))
        )
    }
    if(cancellation_policy_package){
        CancelationPolicyPackage = (
            cancellation_policy_pax.map((item,index) => (
                <div className='col-sm-10 ' key={index}>
                    <input className='form-control CancelationTextBox' name={"cancelationPackage"+index} type="text" value={item} readOnly/>
                </div>
            ))
        )
    }

    if(product.additional_products){
    a = product.additional_products;
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
                    <input type="text" name={it.description} value={this.state.addProductsValue} className="additoinalTextBox form-control pull-left" id="noOfRoom" />&nbsp;
                    <button type="button" onClick={()=>this.increementByOne(it)} id="adds" className="btnPlus" ><i className='fa fa-plus'></i></button>
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
                <div key={item.heading} className='col-sm-12'>
                    <h5 className='Tempat px-4 mb-0'>{item.heading}</h5>
                    <p className='tempatText mx-4'>{item.items[0]}</p>
                </div>
                ) 
                : ''
            ));
         addDescCheck = (
            additionalDesc.map(item => 
                item.type === 'check_box' ? (
                <div key={item.heading} className='col-sm-12'>
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
                    <div key={index} className='col-sm-12'>
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
                  <a href="#" onClick={this.refreshRoute} className='Select-another-activ'><i className='fa fa-angle-left'> </i> Pick another date</a>
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
                <div className='row'>
                <div className='col-sm-5  mb-3'>
                <label className='Name'>NAME <i className='fa fa-asterisk requiredField'></i></label>
                  <input ref={el => this.nameValue=el}  onChange={this.handleChangeName} type='text' name='name' className='Text-Box mt-2 mb-3' />
                </div>
                <div className='col-sm-5  mb-3'>
                <label className='Name'>E-MAIL <i className='fa fa-asterisk requiredField'></i></label>
                  <input ref={el => this.nameValue=el}  onChange={this.handleChangeEmail} type='email' name='email' className='Text-Box mt-2 mb-3' />
                </div>
                </div>
                <label className='Name'>PHONE NUMBER <i className='fa fa-asterisk requiredField'></i></label>
                <div className='row'>
                  <div className='col-sm-6 pr-3'>
                        <IntlTelInput 
                        fieldName='mobile'
                        value={this.state.mobileNumber}
                        style={ { width: '100%' } }
                        onPhoneNumberChange={ this.handler }
                        onPhoneNumberBlur={ this.handler }
                            preferredCountries={['id']}
                            css={ ['intl-tel-input', 'form-control'] }
                            utilsScript={ 'libphonenumber.js' } 
                        />
                  </div>
                </div>
                 
                <div className='row mt-4'>
                    <div className='col-sm-12 px-0'>
                        <h1 className='PAX-Details mt-4'>Tickets (Max {finalQuota})</h1>
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
                        <h2 className='CancelationPax'>ADDITIONAL PRODUCT</h2>
                        
                    </div>

                    {a?
                    this.state.currency?
                    a.map((item,i) => (
                        <div className='col-sm-12' key = {i}>
                        <h5 className='Meals mt-4'>{item.name}</h5>
                        <hr/>
                        {
                            item.details.map((it,i) => (
                                this.state.addProductsValue.map(x=> (
                                    <AdditionalData myFun={this.incrementCounter} decrement={this.decrementCounter} key={x.id} it={it} addiValue={x} currency={this.state.currency} data={a}></AdditionalData>  
                                ))
                                
                            ))
                        }
                            </div>         
                        )) 
                    
                    :''
                    :''}
                </div>
                    
                <div className='row mt-5'>
                    <div className='col-sm-12 px-0'>
                        <h2 className='CancelationPax'>ADDITIONAL PAX DETAILS</h2>
                    </div>
                    <div className='row'>
                
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
                </div>      

                <div className='row mt-5'>
                    <div className='col-sm-10'>
                    <h2 className='CancelationPax'>REFERRAL</h2>
                    <select onChange={(e) => this.handleRefferal(e.target.value)} className='Text-Box'>
                    <option >select option</option>
                            {reff}
                        </select>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className='col-sm-10'>
                    <h2 className='CancelationPax'>ADDITIONAL COMMENTS (Optional)</h2>
                        <textarea onChange={this.handleCommentBox} className='TextArea form-control'></textarea>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-sm-10' style={{ textAlign:"center" }}>
                        <div className='row'>
                            <div className='col-sm-6 offset-3'>
                            <button className='book4thComponent' onClick={this.handleBook}>Book</button>
                            </div>
                        </div>
                        {this.state.reqiredE?
                            <div className="alert alert-danger mt-3 mb-5" style={{ padding:"0.25rem 1.25rem",fontSize:"12px" }}>
                                <strong>Error!</strong> Fields indicates with * are mandatory.
                            </div>
                            :''
                        }
                        {this.state.quotaE?
                            <div className="alert alert-danger mt-3 mb-5" style={{ padding:"0.25rem 1.25rem",fontSize:"12px" }}>
                               <strong>Error!</strong> Maximum quota limit Exceeds for Additional Product.
                            </div>
                            :''
                        }
                        {this.state.standardPaxE?
                            <div className="alert alert-danger mt-3 mb-5" style={{ padding:"0.25rem 1.25rem",fontSize:"12px" }}>
                               <strong>Error!</strong> Maximum quota limit Exceeds for Tickets.
                            </div>
                            :''
                        }
                        {this.state.otherPaxE?
                            <div className="alert alert-danger mt-3 mb-5" style={{ padding:"0.25rem 1.25rem",fontSize:"12px" }}>
                               <strong>Error!</strong> Maximum quota limit Exceeds for Package.
                            </div>
                            :''
                        }
                    </div>
                </div>
                {this.state.promoCode?
                <div className='row mt-5'>
                    <div className='col-sm-8 offset-md-1'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <h3 className='Have-a-promo-code mt-4'>HAVE A PROMO CODE</h3>
                            </div>                        
                        </div> 
                        <div className='row'>
                            <div className='col-sm-9'>
                                <input type='text' name='promocode' className='promoTextBox form-control' />
                            </div>
                            <div className='col-sm-3'>
                                <button className='applyPromoBtn'>Apply Code</button>
                            </div>                        
                        </div>   
                        <div className='row mt-5'>
                            <div className='col-6'>
                                <h5 className='subTotalText'>SUB-TOTAL (<span className='subTotalPax'>2 ADULTS</span>)</h5>
                            </div>
                            <div className='col-6'>
                                <h5 className='subTotalValLight'>{currency}<span className='subTotalValDark'>&nbsp;&nbsp;7,00,000</span></h5>
                            </div>                        
                        </div>  
                        <div className='row mt-3'>
                            <div className='col-6'>
                                <h5 className='subTotalText'>SERVICE CHARGE </h5>
                            </div>
                            <div className='col-6'>
                                <h5 className='subTotalValLight'>{currency}<span className='subTotalValDark'>&nbsp;&nbsp;125,000</span></h5>
                            </div>                        
                        </div>    
                        <div className='row mt-3'>
                            <div className='col-6'>
                                <h5 className='subTotalText'>DISCOUNT (<span className='subTotalPax'>15%</span>)</h5>
                            </div>
                            <div className='col-6'>
                                <h5 className='subTotalValLight'>{currency}<span className='subTotalValDark'>&nbsp;&nbsp;125,000</span></h5>
                            </div>                        
                        </div>
                        <div className='row mt-3'>
                            <div className='col-6'>
                                <h5 className='subTotalText'>PROMO</h5>
                            </div>
                            <div className='col-6'>
                                <h5 className='subTotalValLight'>{currency}<span className='subTotalValDark'>&nbsp;&nbsp;50,000</span></h5>
                            </div>
                            <div className='col-sm-12'>
                            <hr/>
                            </div>                        
                        </div>  
                        <div className='row mt-3'>
                            <div className='col-6'>
                                <h5 className='subTotalText'>TOTAL</h5>
                            </div>
                            <div className='col-6'>
                                <h5 className='subTotalValLight'>{currency}<span className='totalAmtText'>&nbsp;&nbsp;6,125,000</span></h5>
                            </div>                        
                        </div>  
                        <div className='row mt-4'>
                            <div className='col-sm-12'>
                                <h3 className='payment-type mt-4'>How do you want to make the payment?</h3>
                            </div>                        
                        </div>
                        <div className='row mt-3'>
                            <div className='col-6'>
                            <label htmlFor="defaultUnchecked" className='cstmLabel'>
                            <div className='row checkBoxDiv'>
                                <div className='col-3'>
                                    {/* <input type='radio' name='fullPayment' />     */}
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="defaultUnchecked" value='Full Payment' name="payment" />
                                        <label className="custom-control-label customLabel" htmlFor="defaultUnchecked"></label>
                                    </div>
                                </div>
                                <div className='col-9'>
                                    <h4>Full Payment</h4>
                                </div>
                            </div>  
                            </label>  
                            </div>
                            <div className='col-6'>
                            <label htmlFor="defaultUncheckeds" className='cstmLabel'>
                                <div className='row checkBoxDiv'>
                                    <div className='col-3'>
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="defaultUncheckeds" value='Deposit' name="payment" />
                                        <label className="custom-control-label customLabel" ></label>
                                    </div>
                                    </div>
                                    <div className='col-9'>
                                    <h4>Deposit</h4>
                                    <p className='payentAddText'><span className='payentAddText'>Min</span> IDR 3,000,000</p>
                                    </div>
                                </div>                                    
                                </label>
                            </div>      
                            <div className='row mt-4 mx-2'>
                                <div className='col-sm-12'>
                                    <h3 className='Deposit-Payment-Amou mt-4'>Deposit Payment Amount (<span className='depositAmtDark'>IDR 3,000,000</span>)</h3>
                                </div>                        
                            </div>      
                            {/* <div className='row mt-4'> */}
                                <div className='col-sm-12 mt-3'>
                                    <button className='proceedToPayment'>Proceed to payment <i className='fa fa-arrow-right'></i></button>
                                </div>                        
                            {/* </div>                   */}
                        </div>  
                    </div>
                </div>
                :''}
              </div> 
          </div>

          </div>
          
      </div>
      </div>    
    )
  }
}

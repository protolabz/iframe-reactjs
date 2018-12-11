import React, { Component } from 'react'
import axios from 'axios';
import './voucher.css';
import ListBooking from '../ListBooking/ListBooking';
import CreditCardInput from 'react-credit-card-input';
import Modal from 'react-responsive-modal';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import ScrollIntoView from 'react-scroll-into-view'
var QRCode = require('qrcode-react');
const EX_API_KEY = 'xnd_public_development_NImDfL511rH6wMJgKrcdT2PFZdWnpIR8xXOx+Rxg+mHV8LegCQR0hQ==';
export default class componentName extends Component {
  state ={
    paxDetails:null,
    companyEmail:null,
    companyPhone:null,
    userEmail:null,
    userPhone:null,
    paxText:null,
    operationDate:null,
    opertaionTime:null,
    productName:null,
    leadPaxName:null,
    address:null,
    paymentType:null,
    paymentMethodId:null,
    transactionCode:null,
    totalPaid:null,
    due:null,
    cancelationPolicyPack:null,
    expirationDate:null,
    operationDateNormal:null,
        mandiri:null,
        bri:null,
        bni:null,
        mandiriAtm:null,
        mandiriIban:null,
        briAtm:null,
        briIban:null,
        briMba:null,
        bniAtm:null,
        bniIban:null,
        bniMba:null,
        detailMandiri:null,
        detailBni:null,
        detailBri:null,
        aflaDetails:null,
        alfaPayCode:null,
        alfaPayName:null,
        expiryDate:null,
        cardNumber:null,
        expiry:null,
        cvc:null,
        cardHolderName:null,
        bank_code:'',
        showModal:false,
        redirectedUrl:null,
        paymentMethodType:'BankTransfer',
        baknkTransferE:false,
        alfaMartData:true,
        paymentFail:false,
        isShowVoucher:false,
        specialNote:null,
        cancelText:null,
        emailVoucherText:null,
        isShowBooking:false

  }
  componentWillMount(){
    axios({
      method: 'get',
      // url: `https://api.trabo.co/partner/activity/payment?transaction_code=${this.props.transaction_code}`,
      url: `https://api.trabo.co/partner/activity/payment?transaction_code=${this.props.transaction_code}`,
      })
      .then((res) => {
        var data = res.data;
        let opDate = new Date(res.data.transaction.operation_date).toGMTString();
            let dts = (opDate.split(' '));
            let dd,mm,yy,dday;
            dd = dts[1];
            mm = dts[2];
            yy = dts[3];
            dday = dts[0];
            let preDate = dday+ " " +dd+ " " +mm+ " " +yy;
            var expDate = new Date(data.transaction.time_limit * 1000);
            expDate = expDate.toGMTString();
            let expDt = (expDate.split(' '));
            let edd = expDt[1],emm = expDt[2],eyy = expDt[3],eday = expDt[0];
            let finalExDate = eday+ " " +edd+ " " +emm+ " " +eyy;
            this.setState({
            operationDate:preDate,
            operationDateNormal:res.data.transaction.operation_date,
            operationTime:data.transaction.operation_time,
            productName:data.activity.name,
            address:data.activity.address,
            companyEmail:data.company.email,
            companyPhone:data.company.phone_number,
            userEmail:data.customer.email,
            userPhone:data.customer.phone,
            transactionCode:data.transaction.transaction_code,
            leadPaxName:data.customer.name,
            paymentType:data.total_status,
            paxText:data.pax_text+" "+data.package_text,
            totalPaid:data.transaction.total_price,
            due:data.transaction.due,
            expirationDate:finalExDate,
            cancelationPolicyPack:data.cancellation_policy.cancellation_policy_package,
            paymentMethodId:data.transaction.payment_method_id

        })
      })

      var data = {
        transaction_code:this.props.transaction_code,
        bank_code:"BRI"
    }
    
    axios({
        method: 'post',
        url: `https://api.trabo.co/payment/xendit/client/invoice`,
        headers: {
            "Content-Type" : "application/json"
          },
          data:data
        })
        .then((res) => {
            if(res.data.diagnostic.status===400){
                this.setState({
                    isExpired:true,
                    isLoading:false
                })
            }else{
                var mandiri=[],bri=[],bni =[],mandiriAtm =[],
                mandiriIban =[],briAtm=[],briIban=[],briMba=[],
                bniAtm=[],bniIban=[],bniMba=[],detMandiri,detBni,detBri;
                let allBanks =res.data.response.bank;
                allBanks.map(x=>{
                    if(x.bank_code==='MANDIRI'){
                        mandiri.push(x.instruction);
                        detMandiri = x;
                    }
                    if(x.bank_code==='BRI'){
                        bri.push(x.instruction);
                        detBni = x;
                    }
                    if(x.bank_code==='BNI'){
                        bni.push(x.instruction);
                        detBri = x;
                    }
                })
                mandiri.map(y=>{
                    y.map(z=>{
                        if(z.name==='ATM'){
                            mandiriAtm.push(z.instruction)
                        }
                        else{
                            mandiriIban.push(z.instruction)
                        }
                    })
                    
                })
                bri.map(y=>{
                    y.map(z=>{
                        if(z.name==='ATM'){
                            briAtm.push(z.instruction);
                        }
                        else if(z.name==='MBANKING'){
                            briMba.push(z.instruction);
                        }
                        else{
                            briIban.push(z.instruction);
                        }
                    })
                    
                })
                bni.map(y=>{
                    y.map(z=>{
                        if(z.name==='ATM'){
                            bniAtm.push(z.instruction)
                        }
                        else if(z.name==='MBANKING'){
                            bniMba.push(z.instruction);
                        }
                        else{
                            bniIban.push(z.instruction)
                        }
                    })
                    
                })

                this.setState({
                    mandiri:mandiri,
                    bri:bri,
                    bni:bni,
                    mandiriAtm:mandiriAtm,
                    mandiriIban:mandiriIban,
                    briAtm:briAtm,
                    briIban:briIban,
                    briMba:briMba,
                    bniIban:bniIban,
                    bniAtm:bniAtm,
                    bniMba:bniMba,
                    detMandiri:detMandiri,
                    detBni:detBni,
                    detBri:detBri,
                    expiryDate:res.data.response.expiry_date,
                    isLoading:false,
                    componentOpacity:1
                })
            }
        });

        var dataAlfa = {
            transaction_code:this.props.transaction_code,
            bank_code:"ALFAMART"
        }

        axios({
            method: 'post',
            url: `https://api.trabo.co/payment/xendit/client/invoice`,
            headers: {
                "Content-Type" : "application/json"
              },
              data:dataAlfa
            })
            .then((res) => {
                if(res.data.diagnostic.status===400){
                    this.setState({
                        alfaMartData:false
                    })
                }
                else{
                    this.setState({
                        aflaDetails:res.data.response.retail[0].instruction[0].instruction,
                        alfaPayCode:res.data.response.retail[0].payment_code,
                        alfaPayName:res.data.response.retail[0].instruction[0].name
                    })
                }
                // console.log(res.data.response.retail[0].instruction[0].name)
              
            })
  }

onCloseModal = () => {
    this.setState({ showModal: false });
  };
handleBankClick = (code) =>{
    this.setState({
        bank_code:code,
        baknkTransferE:false
    })
}
selectPaymentMethod = (method) =>{
    if(method==='ALFAMART'){
        
    }
    if(method==='CreditCard'){
        
    }
    this.setState({
        bank_code:'ALFAMART',
        paymentMethodType:method,
        baknkTransferE:false
    })

}
handleCardNumberChange = (e) =>{
    this.setState({
        cardNumber:e.target.value
    })
}
handleCardCVCChange = (e) =>{
    let cvv = e.target.value;
    this.setState({
        cvc:e.target.value
    })
}
handleCardExpiryChange = (e) =>{
    let dt = e.target.value;
    // dt = dt.replace(/ /g,'');
    // dt.split('/');
    this.setState({
      expiry:dt  
    })
}
handleHolderName = (e) =>{
    this.setState({
        cardHolderName:e.target.value
    })
}

handleSpecialNote = (e) =>{
  this.setState({
    specialNote:e.target.value
  })
}
handleClickSpecialNote =()=>{
  var data = {
    "token": "eyJpdiI6Ik4yVEFTOHVLZmV2SEdXckdNUHl0b0E9PSIsInZhbHVlIjoiYVQ3ZGJRZ1BcL29TaEVuVU5KbXpDWWc9PSIsIm1hYyI6ImIzMTY1MDhkZWMzMWExMWE4MWMwNmVlMjIwMzUyYzc0NDI1YTUwYjA5MzczZTZjYjA3OWVmNDA5M2E2ZmI4M2IifQ==",
    "transaction_code": this.state.transactionCode,
    "spesial_note" : this.state.specialNote
  }
  if(this.state.specialNote===null){
    swal({
      title: "Warning",
      text: "Note text cannot be empty!",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
  }
  else{
    axios({
      method: 'post',
      url: `https://api.trabo.co/partner/activity/spesial-note`,
      headers: {
          "Content-Type" : "application/json"
        },
        data:data
      })
      .then((res) => {
          if(res.data.diagnostic.status===200){
            swal({
              title: "Success",
              text: "Note has been sent successfully!",
              icon: "success",
              button: true,
              dangerMode: false,
            })
          }
          else{
            swal({
              title: "Error",
              text: "Note text cannot be empty!",
              icon: "error",
              button: true,
              dangerMode: true,
            })
          }
      })
  }
}

handleEmailVoucher =(e) =>{
  this.setState({
    emailVoucherText:e.target.value
  })
}
handleEmailVoucherButton = () =>{
  if(this.state.emailVoucherText===null){
    swal({
      title: "Warning",
      text: "Email cannot be empty!",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
  }
  else{

  }
}

handleCancelText =(e) =>{
  this.setState({
    cancelText:e.target.value
  })
}

callApiAgain =() =>{
    axios({
        method: 'get',
        // url: `https://api.trabo.co/partner/activity/payment?transaction_code=${this.props.transaction_code}`,
        url: `https://api.trabo.co/partner/activity/payment?transaction_code=${this.state.transaction_code}`,
        })
        .then((res) => {
          var data = res.data;
          let opDate = new Date(res.data.transaction.operation_date).toGMTString();
              let dts = (opDate.split(' '));
              let dd,mm,yy,dday;
              dd = dts[1];
              mm = dts[2];
              yy = dts[3];
              dday = dts[0];
              let preDate = dday+ " " +dd+ " " +mm+ " " +yy;
              var expDate = new Date(data.transaction.time_limit * 1000);
              expDate = expDate.toGMTString();
              let expDt = (expDate.split(' '));
              let edd = expDt[1],emm = expDt[2],eyy = expDt[3],eday = expDt[0];
              let finalExDate = eday+ " " +edd+ " " +emm+ " " +eyy;
              this.setState({
              operationDate:preDate,
              operationDateNormal:res.data.transaction.operation_date,
              operationTime:data.transaction.operation_time,
              productName:data.activity.name,
              address:data.activity.address,
              companyEmail:data.company.email,
              companyPhone:data.company.phone_number,
              userEmail:data.customer.email,
              userPhone:data.customer.phone,
              transactionCode:data.transaction.transaction_code,
              leadPaxName:data.customer.name,
              paymentType:data.total_status,
              paxText:data.pax_text+" "+data.package_text,
              totalPaid:data.transaction.total_price,
              due:data.transaction.due,
              expirationDate:finalExDate,
              cancelationPolicyPack:data.cancellation_policy.cancellation_policy_package,
              paymentMethodId:data.transaction.payment_method_id
  
          })
        })
}
handleCancelTextButton = () =>{
 if(this.state.emailVoucherText===null){
    swal({
      title: "Warning",
      text: "Cancel field required!",
      icon: "warning",
      button: true,
      dangerMode: true,
    })
  }
  else{

  }

}
displaySuccess (creditCardToken) {
    var requestData = Object.assign({}, this.getTokenData());
     this.onCloseModal();
     var data = {
        transaction_code:this.props.transaction_code,
        token_id:creditCardToken.id
    } 
     if(creditCardToken.status==='VERIFIED'){
        axios({
            method: 'post',
            url: `https://api.trabo.co/payment/credit-card`,
            headers: {
                "Content-Type" : "application/json"
              },
              data:data
            })
            .then((res) => {
                if(res.data.diagnostic.status===200){
                    swal({
                        title: "Success",
                        text: "Payment has been made successfully!",
                        icon: "success",
                        button: true,
                        dangerMode: false,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                            this.callApiAgain();
                        }
                      });
                }
                else{
                    swal({
                        title: res.data.diagnostic.error,
                        text: res.data.diagnostic.error_msgs,
                        icon: "warning",
                        button: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                            this.callApiAgain();
                        }
                      });
                }
            })
    }
}

getTokenData () {
    let {cardNumber,expiry,cvc,cardHolderName} = this.state;
        let dt = expiry.split('/'),mm,yy;
        mm = dt[0];
        yy = dt[1];
        yy = "20"+yy;
        yy = yy.split(' ').join('');
        mm = mm.split(' ').join('');
    return {        
        // "amount": "75000",        
        "amount": this.props.amount,
        // "card_number": "4000000000000002",
        "card_number": cardNumber,        
        // "card_exp_month": "12",
        "card_exp_month": mm,        
        // "card_exp_year": "2018",
        "card_exp_year": yy,        
        // "card_cvn": "123",
        "card_cvn": cvc,
        "is_multiple_use": false,
        "should_authenticate": true,
        "meta_enabled": false
    };
}
displayError (err) {
    var requestData = Object.assign({}, this.getTokenData());
    swal({
        title: 'Failed',
        text: "Service Temporary unavailable.",
        icon: "warning",
        button: true,
        dangerMode: true,
      })
    // console.log(requestData)
}
xenditResponseHandler (err, creditCardToken) {
    if (err) {
        // this.setState({ isLoading: false });
        return this.displayError(err);
    }
    this.setState({ creditCardToken: creditCardToken })

    if (creditCardToken.status === 'APPROVED' || creditCardToken.status === 'VERIFIED') {
        this.displaySuccess(creditCardToken);
        // console.log(this.displaySuccess(creditCardToken));
        console.log("VERIFIED",creditCardToken.status);
        
    } 
    else if (creditCardToken.status === 'IN_REVIEW') {
        this.setState({ 
            redirectedUrl: creditCardToken.payer_authentication_url,
            showModal:true
         })
         window.open(creditCardToken.payer_authentication_url, 'sample-inline-frame');
        //  this.setState({
        //     showModal:true
        //  })
                // $('.overlay').show();
                // $('#three-ds-container').show();
       // console.log("REVIEW",creditCardToken);
    }
    
     else if (creditCardToken.status === 'FAILED') {
        // this.displayError(creditCardToken);
        console.log(creditCardToken.status);
    }
}
handleConfirmPayment =() => {
  let {bank_code,paymentMethodType} = this.state;
  let transaction_code = this.props.transaction_code;
  let {cardNumber,expiry,cvc,cardHolderName} = this.state; 
  if(paymentMethodType==='CreditCard'){
    if(expiry===null){

    }else{
        let dt = expiry.split('/'),mm,yy;
        mm = dt[0];
        yy = dt[1];
        yy = "20"+yy;
        if(cardNumber===null && cvc===null && cardHolderName===null){
            swal({
                title: 'Warning',
                text: "All fields are required!",
                icon: "warning",
                button: true,
                dangerMode: true,
              })
        }else{
          window.Xendit.setPublishableKey(EX_API_KEY);
          var tokenData = this.getTokenData();
          window.Xendit.card.createToken(tokenData, this.xenditResponseHandler.bind(this));
        }
    }

      
  }
  else{
      if(bank_code===''){
          this.setState({
              baknkTransferE:true
          })
      }else{
      var confirmPay = {  
          // "transaction_code":"56713178-05-12-2018-2867",
          "transaction_code":this.state.transactionCode,
          "payment":"full payment"
          // "payment":this.state.paymentType
        }
      axios({
          method: 'post',
          url: `https://api.trabo.co/payment/confirm`,
          headers: {
              "Content-Type" : "application/json"
            },
            data:confirmPay
          })
          .then((res) => {
              if(res.data.response==='success'){
                  swal({
                      title: "Success",
                      text: "Payment has been made successfully!",
                      icon: "success",
                      button: true,
                      dangerMode: false,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            this.callApiAgain();
                          }
                    });
              }
              else{
                  swal({
                      title: res.data.diagnostic.error,
                      text: res.data.diagnostic.error_msgs,
                      icon: "warning",
                      button: true,
                      dangerMode: true,
                    })
                    .then((willDelete) => {
                        if(willDelete){
                            this.callApiAgain();
                        }
                    });
              }
          })
      }
  }
  
}
showListBooking = () =>{
    
    this.setState({isShowBooking:true})
}
handlePrint =()=>{
    window.print()
}
  render() {
 
    let {detMandiri,detBri,detBni,mandiriAtm,mandiriIban,briAtm,briIban,bniAtm,bniIban,
      briMba,bniMba,expiryDate,expiry,aflaDetails,alfaPayCode,alfaPayName} = this.state;
    let mandiriA,mandiriI,briA,briI,bniA,bniI,briM,bniM,normalTime,alfaDet;
    let cancelationPolicy;
    function formatThousands(n, dp) {
      var s = ''+(Math.floor(n)), d = n % 1, i = s.length, r = '';
      while ( (i -= 3) > 0 ) { r = ',' + s.substr(i, 3) + r; }
      return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10,dp||2)) : '');
    }
    let accMandiri,nameMandiri,accBri,nameBri,accBni,nameBni;
        if(detMandiri){
        accMandiri = detMandiri.bank_account_number;
        nameMandiri = detMandiri.account_holder_name;

        accBri = detBri.bank_account_number;
        nameBri = detBri.account_holder_name;

        accBni = detBni.bank_account_number;
        nameBni = detBni.account_holder_name;
        }
    if(this.state.cancelationPolicyPack!==null){
      cancelationPolicy = (
        this.state.cancelationPolicyPack.map((item,index) =>(
          <p key={index} className='noteText'>{item}</p>
        ))
        )
    }    
    if(mandiriAtm!==null){
      mandiriA =(
          mandiriAtm.map(x =>(
              x.map((item,index)=>(
                  <li key={index} className='pb-2'><div className='textCounter mr-1'>{index+1}</div>{item} </li>
              ))
              
          ))
          )
    }
    if(mandiriIban!==null){
      mandiriI =(
          mandiriIban.map(x =>(
              x.map((item,index)=>(
                  <li key={index} className='pb-2'><div className='textCounter mr-1'>{index+1}</div>{item} </li>
              ))
          ))
          )
    }
    if(briIban!==null){
      briI =(
          briIban.map(x =>(
              x.map((item,index)=>(
                  <li key={index} className='pb-2'><div className='textCounter mr-1'>{index+1}</div>{item} </li>
              ))
          ))
          )
    }
    if(briAtm!==null){
      briA =(
          briAtm.map(x =>(
              x.map((item,index)=>(
                  <li key={index} className='pb-2'><div className='textCounter mr-1'>{index+1}</div>{item} </li>
              ))
          ))
          )
    }
    if(briMba!==null){
      briM =(
          briMba.map(x =>(
              x.map((item,index)=>(
                  <li key={index} className='pb-2'><div className='textCounter mr-1'>{index+1}</div>{item} </li>
              ))
          ))
          )
    }
    
    if(bniAtm!==null){
      bniA =(
          bniAtm.map(x =>(
              x.map((item,index)=>(
                  <li key={index} className='pb-2'><div className='textCounter mr-1'>{index+1}</div>{item} </li>
              ))
          ))
          )
    }
    if(bniIban!==null){
      bniI =(
          bniIban.map(x =>(
              x.map((item,index)=>(
                  <li key={index} className='pb-2'><div className='textCounter mr-1'>{index+1}</div>{item} </li>
              ))
          ))
          )
    }
    if(bniMba!==null){
      bniM =(
          bniMba.map(x =>(
              x.map((item,index)=>(
                  <li key={index} className='pb-2'><div className='textCounter mr-1'>{index+1}</div>{item} </li>
              ))
          ))
          )
    }
    if(aflaDetails!==null){
      alfaDet =(
      aflaDetails.map((item,index)=>(
          <li key={index} className='pb-2'><div className='textCounter mr-1'>{index+1}</div>{item} </li>
        ))
      )
    }
    
    return (
        
        <div className="container mt-5 mb-5">
         <Modal 
            open={this.state.showModal} 
            closeOnEsc={false} 
            showCloseIcon={true} 
            closeOnOverlayClick={false} 
            onClose={this.onCloseModal} 
            blockScroll={true}
            center>
                <iframe title="Of" height="450" width="550" id="sample-inline-frame" name="sample-inline-frame"> </iframe>
         </Modal>
         {this.state.isShowBooking?
            <div className='' >
            <ListBooking
                userEmail={this.state.userEmail}
            />
            </div>
            :
          <div className='col-md-9 cols9-center mainOuterDiv' >

            <div className='row mb-4'>
                <div className='col-sm-12'>
                    <a href="#" onClick={this.refreshRoute} className='Select-another-activ'><i className='fa fa-angle-left'> </i> Pick another date</a>
                </div>
            </div>
            <div className='row pt-5 pb-4'>
                <div className='col-md-6 voucherOrange p-md-4'>
                   <h3 className='operationDate'>{this.state.operationDate+" — "+this.state.operationTime}</h3>
                   <h3 className='productTitle'>{this.state.productName}</h3>
                   <p className='paxDetails'>for <span className='paxDetailsBold'>{this.state.paxText}</span></p>
                   <p className='location my-4'><span>{this.state.address}</span></p>
                  
                  <div className='row mt-md-2'>
                    <div className='col-5'>
                      <p className='contactDetail'><span>{this.state.companyPhone}</span></p>
                    </div>
                    <div className='col-7 p-0'>
                      <p className='contactDetailEmail'><span>{this.state.companyEmail}</span></p>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 py-2 voucherWhite'>
                  <div className='row'>
                    <div className='col-6'>
                      <p className='bookingId mb-md-3'> BOOKING ID</p>
                      {/* <h3 className='transId'>{this.props.transaction_code}</h3> */}
                      <h3 className='transId'>{this.state.transactionCode}</h3>
                    </div>
                    <div className='col-6 text-right'>
                    <QRCode 
                      value={
                        this.state.transactionCode+" "
                        + this.state.leadPaxName+ " " 
                        +this.state.productName+ " "
                        +this.state.operationDateNormal+ " "
                        +this.state.operationTime
                      }
                    />
                    </div>
                  </div>
                  <div className='row pt-2'>
                    <div className='col-5'>
                      <h3 className='leadPaxTitle'> LEAD PAX</h3>
                      {/* <h3 className='transId'>{this.props.transaction_code}</h3> */}
                    </div>
                    <div className='col-7'>
                      <h3 className='leadPaxValue text-right'>{this.state.leadPaxName}</h3>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-6'>
                    {this.state.paymentType==='DEPOSIT'?
                     <h3 className='totalPaidTitle '> TOTAL (<span className='totalPaidTitleRed'>DEPOSIT</span>)</h3>
                    :
                    <h3 className='totalPaidTitle '> TOTAL (<span className='totalPaidTitleGreen'>PAID IN FULL</span>)</h3>
                    }
                      
                      
                      {/* <h3 className='transId'>{this.props.transaction_code}</h3> */}
                      
                    </div>
                    <div className='col-6'>
                      {/* <h3 className='leadPaxVal'>{this.props.currency}</h3> */}
                      <h3 className='totalPaidValue text-right'>IDR {formatThousands(this.state.totalPaid)}</h3>
                    </div>
                  </div>
                  {this.state.paymentType==='DEPOSIT'?
                  <div className='row'>
                    <div className='col-6'>
                      <h3 className='totalPaidTitle '> REMAINING </h3>
                      {/* <h3 className='transId'>{this.props.transaction_code}</h3> */}
                      
                    </div>
                    <div className='col-6'>
                      {/* <h3 className='leadPaxVal'>{this.props.currency}</h3> */}
                      <h3 className='remainingValue text-right'>IDR {formatThousands(this.state.due)}</h3>
                    </div>
                  </div>
                  :''}
                  <div className='row pt-3 borderDashed'>
                    {cancelationPolicy}
                 
                  </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-12 p-0'>
              <ul className="nav nav-pills navPill">
                <li className="active"><a data-toggle="pill" href="#emailVoucher"><i className='fa fa-envelope-o'> </i> Email Voucher</a></li>
                <li><a data-toggle="pill" className='cancelButton' onClick={this.handlePrint} href="#"><i className='fa fa-print'> </i> Print Voucher</a></li>
                <li><a data-toggle="pill" href="#specialRequest"><i className='fa fa-commenting-o'> </i> Special Request</a></li>
                <li><a className='cancelButton' data-toggle="pill" onClick={this.showListBooking}> Cancel</a></li>
              </ul>
                <div className="tab-content m-md-5">
                  <div id="emailVoucher" className="tab-pane fade in active">
                    <h3 className='customLabel'>DESTINATION EMAIL ADDRESS</h3>
                    <form className="form-inline" action="/action_page.php">
                      <div className="form-group" style={{ width:"100%" }} >
                        <input type="email" className="form-control email-textBox"id="email" style={{ width:"80%" }}  placeholder="Input e-mail address" name="email"/>
                        <button type="submit" className="btn btn-default buttonEmail"  style={{ width:"10%" }}>Send e-mail</button>
                      </div>
                    </form>
                  </div>
                  <div id="printVoucher" className="tab-pane fade">
                    {/* <h3 className='customLabel'>Menu 1</h3>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> */}
                  </div>
                  <div id="specialRequest" className="tab-pane fade mb-3">
                    <h3 className='customLabel'>SPECIAL REQUESTS</h3>
                    <textarea onChange={this.handleSpecialNote} style={{ height: "100px" }} placeholder='If you have additional request or comments, please type them here' className='form-control'></textarea>
                    <button onClick={this.handleClickSpecialNote} className='buttonEmail btn btn-default mt-2 mb-4' style={{ float:"right" }}>Submit</button>
                  </div>
                  <div id="cancel" className="tab-pane fade">
                    <h3 className='customLabel'>Please tell us your reason (Optional)</h3>
                    <textarea style={{   height: "100px" }} placeholder='Type the reason why do you want to cancel this booking' className='form-control'></textarea>
                    <button className='buttonEmail btn btn-default mt-2 mb-4' style={{ float:"right" }}>Submit</button>
                  </div>
                </div> 
              </div>
            </div>

            <div className='row mb-5'>
                <div className='col-sm-12 border rounded'>
                    <div className='row'>
                      <div className='col-sm-4 pt-3 customBorder'>
                        <p className='customerText'>YOUR EMAIL ADDRESS</p>
                      </div>
                      <div className='col-sm-6 pt-3'>
                        <p className='customerTextValue'>{this.state.userEmail}</p>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-sm-4 customBorder'>
                        <p className='customerText'>YOUR PHONE NUMBER</p>
                      </div>
                      <div className='col-sm-6'>
                      <p className='customerTextValue'>{this.state.userPhone}</p>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-sm-4 customBorder'>
                        <p className='customerText'>YOUR PAYMENT METHOD</p>
                      </div>
                      <div className='col-sm-6'>
                      <p className='customerTextValue'>{this.state.paymentMethodId}</p>
                      </div>
                    </div>
                </div>    
             </div>

             <div className='row mb-4'>
                <div className='col-sm-12 text-center'>
                <ScrollIntoView selector="#doPayment">
                    <button className='confirm-payment' onClick={this.handleConfirmPayment}>Continue to Payment</button>
                </ScrollIntoView>
                </div>
             </div>  
            {this.state.due>0?
            <div className='row'>
              <div className='col-sm-12'>
                  <h3 className='expirationText'>Please complete your payment before <span className='expirationTextRed'>{this.state.expirationDate}</span></h3>
              </div>
              <div className='col-sm-6 offset-md-3 my-4'>
                  <h3 className='dueDateText'>AMOUNT DUE: <span className='dueDateTextRed'>IDR {formatThousands(this.state.due)}</span></h3>
              </div>
              <div className='row mt-5 rounded p-md-y-5' id='doPayment'>
                    <div className='col-md-12 mb-4'>
                        <h4 className='paymentMethod'>Choose a payment method</h4>
                    </div>
                    <div className='col-12 border border-top-0'>
                        <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                           <a className="nav-link active" onClick={(e) =>this.selectPaymentMethod('BankTransfer')} data-toggle="tab" href="#bankTransfers">Bank Transfer</a>
                        </li>
                        {this.state.alfaMartData?
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e) =>this.selectPaymentMethod('RetailTransfer')} data-toggle="tab" href="#retailTransfer">Retail Transfer</a>
                        </li>
                        :''}
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e) =>this.selectPaymentMethod('CreditCard')} data-toggle="tab" href="#creditCard">Credit Card</a>
                        </li>   
                        </ul>
                    
                        <div className="tab-content">
                        <div id="bankTransfers" className="container tab-pane active px-md-5"><br/>
                        <p className="bankImage custom-control custom-radio" data-toggle="collapse" style={{ paddingLeft:"0px" }} data-target="#mandiri" data-parent="#bankTransfers">
                        <input type='radio' className='custom-control-input' onChange={(e) =>this.handleBankClick('MANDIRI')} value={'mandiri'} name='checkBank' id='checkMandiri'/>
                        <label htmlFor='checkMandiri' className='custom-control-label'> 
                            <img className='bankImg' alt='mandiri' src='/images/mandiri.png'/>
                        </label>
                        </p>
                            <div id="mandiri" className="collapse mb-4">
                                <button className="customButtonTop" data-toggle="collapse" data-target="#mAtm">ATM</button><br></br>
                                <div id="mAtm" className="collapse p-md-4 p-sm-1">
                                    <h4 className='virtualAccountNorm'>Virtual Account <span className='virtualAccount'># {accMandiri}</span></h4>
                                    <h4 className='virtualAccountNorm mb-4'>Nama Akun Virtual <span className='virtualAccount'>{nameMandiri}</span></h4>
                                    <p className='atmText'>* Silakan baca petunjuk di bawah ini untuk menyelesaikan transaksi Anda. </p>
                                    <ul className='listText'>
                                        {mandiriA}
                                    </ul>
                                </div>
                                <button className="customButtonBottom mb-3" data-toggle="collapse" data-target="#mIbanking">I-Banking</button>
                                <div id="mIbanking" className="collapse p-md-4 p-sm-1">
                                    <h4 className='virtualAccountNorm'>Virtual Account <span className='virtualAccount'># {accMandiri}</span></h4>
                                    <h4 className='virtualAccountNorm mb-4'>Nama Akun Virtual <span className='virtualAccount'>{nameMandiri}</span></h4>
                                    <p className='atmText'>* Silakan baca petunjuk di bawah ini untuk menyelesaikan transaksi Anda. </p>
                                    <ul className='listText'>
                                        {mandiriI}
                                    </ul>
                                </div>
                            </div>


                        <p className="bankImage custom-radio" data-toggle="collapse" data-target="#bankBri" data-parent="#bankTransfers">
                        <input type='radio' className='custom-control-input' onChange={(e) =>this.handleBankClick('BRI')} value={'BRI'} name='checkBank' id='checkBri'/>
                            <label htmlFor='checkBri' className='custom-control-label'> 
                        <img className='bankImg' alt='BRI' src='/images/bank-bri.png'/>
                        </label>
                        </p>
                            <div id="bankBri" className="collapse mb-4">
                            <button className="customButtonTop" data-toggle="collapse" data-target="#briAtm">ATM</button><br></br>
                                <div id="briAtm" className="collapse p-md-4 p-sm-1">
                                    <h4 className='virtualAccountNorm'>Virtual Account <span className='virtualAccount'># {accBri}</span></h4>
                                    <h4 className='virtualAccountNorm mb-4'>Nama Akun Virtual <span className='virtualAccount'>{nameBri}</span></h4>
                                    <p className='atmText'>* Silakan baca petunjuk di bawah ini untuk menyelesaikan transaksi Anda. </p>
                                    <ul className='listText'>
                                        {briA}
                                    </ul>
                                </div>
                                <button className="customButtonMiddle" data-toggle="collapse" data-target="#briIban">I-Banking</button>
                                <div id="briIban" className="collapse p-md-4 p-sm-1">
                                    <h4 className='virtualAccountNorm'>Virtual Account <span className='virtualAccount'># {accBri}</span></h4>
                                    <h4 className='virtualAccountNorm mb-4'>Nama Akun Virtual <span className='virtualAccount'>{nameBri}</span></h4>
                                    <p className='atmText'>* Silakan baca petunjuk di bawah ini untuk menyelesaikan transaksi Anda. </p>
                                    <ul className='listText'>
                                        {briI}
                                    </ul>
                                </div>
                                <button className="customButtonBottom mb-3" data-toggle="collapse" data-target="#briMba">M-Banking</button>
                                <div id="briMba" className="collapse p-md-4 p-sm-1">
                                    <h4 className='virtualAccountNorm'>Virtual Account <span className='virtualAccount'># {accBri}</span></h4>
                                    <h4 className='virtualAccountNorm mb-4'>Nama Akun Virtual <span className='virtualAccount'>{nameBri}</span></h4>
                                    <p className='atmText'>* Silakan baca petunjuk di bawah ini untuk menyelesaikan transaksi Anda. </p>
                                    <ul className='listText'>
                                        {briM}
                                    </ul>
                                </div>
                            </div>
                        <p className="bankImage custom-radio" data-toggle="collapse" data-target="#bni" data-parent="#bankTransfers">
                        <input type='radio' className='custom-control-input' onChange={(e) =>this.handleBankClick('BNI')} value={'BNI'} name='checkBank' id='checkBni'/>
                            <label htmlFor='checkBni' className='custom-control-label'> 
                            <img style={{ height:"20px" }} alt='bni' src='/images/bank-bni.png'/>
                        </label>
                        
                        </p>
                            <div id="bni" className="collapse">
                            <button className="customButtonTop" data-toggle="collapse" data-target="#bniAtm">ATM</button><br></br>
                                <div id="bniAtm" className="collapse p-md-4 p-sm-1">
                                    <h4 className='virtualAccountNorm'>Virtual Account <span className='virtualAccount'># {accBni}</span></h4>
                                    <h4 className='virtualAccountNorm mb-4'>Nama Akun Virtual <span className='virtualAccount'>{nameBni}</span></h4>
                                    <p className='atmText'>* Silakan baca petunjuk di bawah ini untuk menyelesaikan transaksi Anda. </p>
                                    <ul className='listText'>
                                        {bniA}
                                    </ul>
                                </div>
                                <button className="customButtonMiddle" data-toggle="collapse" data-target="#bniIban">I-Banking</button>
                                <div id="bniIban" className="collapse p-sm-4 p-sm-1">
                                    <h4 className='virtualAccountNorm'>Virtual Account <span className='virtualAccount'># {accBni}</span></h4>
                                    <h4 className='virtualAccountNorm mb-4'>Nama Akun Virtual <span className='virtualAccount'>{nameBni}</span></h4>
                                    <p className='atmText'>* Silakan baca petunjuk di bawah ini untuk menyelesaikan transaksi Anda. </p>
                                    <ul className='listText'>
                                        {bniI}
                                    </ul>
                                </div>
                                <button className="customButtonBottom mb-3" data-toggle="collapse" data-target="#bniMba">M-Banking</button>
                                <div id="bniMba" className="collapse p-md-4 p-sm-1">
                                    <h4 className='virtualAccountNorm'>Virtual Account <span className='virtualAccount'># {accBni}</span></h4>
                                    <h4 className='virtualAccountNorm mb-4'>Nama Akun Virtual <span className='virtualAccount'>{nameBni}</span></h4>
                                    <p className='atmText'>* Silakan baca petunjuk di bawah ini untuk menyelesaikan transaksi Anda. </p>
                                    <ul className='listText'>
                                        {bniM}
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div id="retailTransfer" className="container tab-pane px-md-5 px-sm-0">
                            <div className='row'>
                                <div className='col-md-12 my-5 border-bottom'>
                                    <img src='/images/alfa.jpg' alt='alpha'/>
                                </div>
                                
                                <div className='col-md-12'>
                                <h4 className='virtualAccountNorm'>Berikut kode pembayaran Alfamart anda : <span className='virtualAccount'># {alfaPayCode}</span></h4>
                                    <h4 className='virtualAccountNorm mb-4'>Nama Akun Virtual <span className='virtualAccount'>{alfaPayName}</span></h4>
                                    <p className='atmText'>* Silahkan baca petunjuk di bawah ini untuk menyelesaikan transaksi anda.
  Kami sarankan Anda untuk menyimpan halaman ini. </p>
                                    <ul className='listText'>
                                        {alfaDet}
                                    </ul>
                                </div>
                            </div>    
                        </div>

                        <div id="creditCard" className="container tab-pane px-md-4 py-md-5 px-sm-0 py-sm-5">
                            <div className='row'>
                            <CreditCardInput
                                cardNumberInputProps={{ value: this.state.cardNumber, onChange: this.handleCardNumberChange }}
                                cardExpiryInputProps={{ value: this.state.expiry, onChange: this.handleCardExpiryChange }}
                                cardCVCInputProps={{ value: this.state.cvc, onChange: this.handleCardCVCChange }}
                                holderNameProps ={{ value: this.state.cardHolderName, onChange: this.handleHolderName }}
                                fieldClassName="input"
                            />
                            <div className='sc-bdVaJa1'>
                                <input type='text' name='holderName' className='form-control' placeholder='Card Holder Name'/>
                            </div>
                                
                            </div>    
                        </div>
                      </div>
                     
                    </div>
                    <div className='col-md-12 mt-5 text-center'>
                        <button className='confirm-payment' onClick={this.handleConfirmPayment}>Confirm Payment</button>
                        {this.state.baknkTransferE?  
                           <div className="alert alert-danger mt-3 mb-5" style={{ padding:"0.25rem 1.25rem",fontSize:"12px" }}>
                               <strong>Error!</strong> Please select one of the bank.
                            </div>:''
                            }
                    </div>
                    
                </div>
            </div>
            :''}    
          </div>
          }
        </div>
    )
  }
}

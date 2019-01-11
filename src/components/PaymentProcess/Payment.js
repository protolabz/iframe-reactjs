import React, { Component } from 'react'
import axios from 'axios';
import './payment.css';
import CreditCardInput from 'react-credit-card-input';
// import Xendit from 'xendit-js-node';
import Modal from 'react-responsive-modal';
import swal from 'sweetalert';
import Voucher from '../Vouchers/vouchers';
const EX_API_KEY = 'xnd_public_development_NImDfL511rH6wMJgKrcdT2PFZdWnpIR8xXOx+Rxg+mHV8LegCQR0hQ==';

export default class componentName extends Component {

    state ={
        paymentType:this.props.paymentType,
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
        isLoading:true,
        componentOpacity:0.2,
        isExpired:false,
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
        isDisablePayment:false,
        nameE:false
    }

    componentWillMount(){

        var data = {
            transaction_code:this.props.transaction_code,
            // transaction_code:"56713178-05-12-2018-2867",
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
                // transaction_code:"56713178-05-12-2018-2867",
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
            bank_code:code
        })
    }
    selectPaymentMethod = (method) =>{
        if(method==='ALFAMART'){
            
        }
        if(method==='CreditCard'){
            
        }
        this.setState({
            bank_code:'ALFAMART',
            paymentMethodType:method
        })

    }
    handleCardNumberChange = (e) =>{
        let num = e.target.name;
        console.log(num)
        if(num===16){
            // e.preventDefault();
            // return false;
            console.log(num)
        }
        this.setState({
            cardNumber:e.target.value
        })
    }
    handleCard = (e) => {
        let num = e.target.value;
        if(num>16 || num<16){
            this.setState({
                cardNumber:null
            })
        }else{
            this.setState({
                cardNumber:num
            })
        }
        
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
        let names = e.target.value;
      if(/^[-\w ]+$/.test(names)){
        this.setState({
            cardHolderName:names,
            nameE:false
          })
      }
      else{ 
        this.setState({
            cardHolderName:names,
            nameE:true,
          })  
    //   }
    // this.setState({
    //     cardHolderName:e.target.value
    // })
    //     this.setState({
    //         cardHolderName:e.target.value
    //     })
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
                    console.log(res)
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
                                this.setState({
                                    isShowVoucher:true
                                })
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
                                this.setState({
                                    isShowVoucher:true
                                })
                            }
                          });
                    }
                })
                .catch(function (err) {
                    swal({
                        title: "Error!",
                        text: "Incorrect password",
                        icon: "warning",
                        button: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                            this.setState({
                                isDisablePayment:false
                            })
                        }
                      });
                  });
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
           cardNumber = cardNumber.split(' ').join('');
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
            title: "Failed",
            text: err.message,
            icon: "warning",
            button: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                this.setState({
                    isDisablePayment:false
                })
            } 
          });
        //   console.log(requestData);
        console.log(err);
        console.log(requestData);
    }
    xenditResponseHandler (err, creditCardToken) {
        if (err) {
            return this.displayError(err);
        }
        // this.setState({ creditCardToken: creditCardToken })

        if (creditCardToken.status === 'APPROVED' || creditCardToken.status === 'VERIFIED') {
            this.displaySuccess(creditCardToken);
            
        } 
        else if (creditCardToken.status === 'IN_REVIEW') {
            this.setState({ 
                redirectedUrl: creditCardToken.payer_authentication_url,
                showModal:true
             })
             window.open(creditCardToken.payer_authentication_url, 'sample-inline-frame');
        }
        
         else if (creditCardToken.status === 'FAILED') {
            this.displayError(creditCardToken);
            // console.log(creditCardToken.status);
        }
    }
    
    handleConfirmPayment =() => {
        let {bank_code,paymentMethodType} = this.state;
        let transaction_code = this.props.transaction_code;
        let {cardNumber,expiry,cvc,cardHolderName} = this.state;
        this.setState({
            isDisablePayment:true
        })

        if(paymentMethodType==='CreditCard'){
            if(expiry===null){
                swal({
                    title: 'Warning',
                    text: "All fields are required!",
                    icon: "warning",
                    button: true,
                    dangerMode: true,
                  }).then((willDelete) => {
                    if (willDelete) {
                        this.setState({
                            isDisablePayment:false
                        })
                    } 
                  });
            }else{
                let dt = expiry.split('/'),mm,yy;
                mm = dt[0];
                yy = dt[1];
                yy = "20"+yy;
                if(cardNumber===null || cvc===null || cardHolderName===null){
                    swal({
                        title: 'Warning',
                        text: "All fields should be valid!",
                        icon: "warning",
                        button: true,
                        dangerMode: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                            this.setState({
                                isDisablePayment:false
                            })
                        } 
                      });
                }else{
                    window.Xendit.setPublishableKey(EX_API_KEY);
                    // Request a token from Xendit:
                    var tokenData = this.getTokenData();
                    window.Xendit.card.createToken(tokenData, this.xenditResponseHandler.bind(this));
                }
            }
           
          
        }
        else{
            if(bank_code===''){
                swal({
                    title: "Warning",
                    text: "Please select at least one payment method!",
                    icon: "warning",
                    button: true,
                    dangerMode: false,
                  }) 
                  .then((willDelete) => {
                    if (willDelete) {
                        this.setState({
                            isDisablePayment:false
                        })
                    }
                  });
            }else{
            var confirmPay = {  
                "transaction_code":this.props.transaction_code,
                "payment":this.state.paymentType
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
                                this.setState({
                                    isShowVoucher:true,
                                })
                            }
                          });
                    }
                    else if(res.data.diagnostic.status===300){
                        swal({
                            title: res.data.diagnostic.error,
                            text: res.data.diagnostic.error_msgs,
                            icon: "warning",
                            button: true,
                            dangerMode: false,
                          })
                          .then((willDelete) => {
                            if (willDelete) {
                                this.setState({
                                    isShowVoucher:true,
                                })
                            } 
                          });
                    }
                    else if(res.data.diagnostic.status===400){
                        swal({
                            title: res.data.diagnostic.error,
                            text: res.data.diagnostic.error_msgs,
                            icon: "error",
                            button: true,
                            dangerMode: true,
                          })
                          .then((willDelete) => {
                            if (willDelete) {
                                this.setState({
                                    isDisablePayment:false
                                })
                            } 
                          });
                    }
                    else if(res.data.diagnostic.status===401){
                        swal({
                            title: res.data.diagnostic.error,
                            text: res.data.diagnostic.error_msgs,
                            icon: "error",
                            button: true,
                            dangerMode: true,
                          })
                          .then((willDelete) => {
                            if (willDelete) {
                                this.setState({
                                    isDisablePayment:false
                                })
                            } 
                          });
                    }
                    else{
                        swal({
                            title: 'Failed',
                            text: 'Server error',
                            icon: "error",
                            button: true,
                            dangerMode: false,
                          })
                          .then((willDelete) => {
                            if (willDelete) {
                                this.setState({
                                    isDisablePayment:false
                                })
                            } 
                          });
                    }
                })
            }
        }
        
    }

    refreshRoute =() =>{
        window.location.reload()
     }
  render() {
      let {detMandiri,detBri,detBni,mandiriAtm,mandiriIban,briAtm,briIban,bniAtm,bniIban,
        briMba,bniMba,expiryDate,expiry,aflaDetails,alfaPayCode,alfaPayName} = this.state;

      let mandiriA,mandiriI,briA,briI,bniA,bniI,briM,bniM,normalTime,alfaDet;
      expiryDate = expiryDate.replace(/[/]/g, "-");
      let ForTime = new Date(expiryDate);
      console.log("ForTime: "+ForTime);
      console.log("Date: "+expiryDate);
      let ForDate = new Date(expiryDate).toISOString().slice(0,10);
      ForDate = new Date(ForDate).toGMTString();
        let dts = (ForDate.split(' '));
        var dd = dts[1];
        var mm = dts[2];
        var yy = dts[3];
        var dday = dts[0];
        let preDate = dday+ " " +dd+ " " +mm+ " " +yy;
        var h =	ForTime.getHours() % 12 || 12;
        var m =   ForTime.getMinutes();
        var mid = '';
        if(h < 12){
        mid="AM";
        }
        else{
        mid = "PM"
        }
        normalTime = h+":"+m+" "+mid;
        let accMandiri,nameMandiri,accBri,nameBri,accBni,nameBni;
        if(detMandiri){
        accMandiri = detMandiri.bank_account_number;
        nameMandiri = detMandiri.account_holder_name;

        accBri = detBri.bank_account_number;
        nameBri = detBri.account_holder_name;

        accBni = detBni.bank_account_number;
        nameBni = detBni.account_holder_name;
    }
    
    function formatThousands(n, dp) {
        var s = ''+(Math.floor(n)), d = n % 1, i = s.length, r = '';
        while ( (i -= 3) > 0 ) { r = ',' + s.substr(i, 3) + r; }
        return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10,dp||2)) : '');
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

        <div className="container-fluid mb-5">
 
        <Modal 
            open={this.state.showModal} 
            closeOnEsc={false} 
            showCloseIcon={true} 
            closeOnOverlayClick={false} 
            onClose={this.onCloseModal} 
            blockScroll={true}
            center>
                <iframe title="Of" height="450" style={{ width:"100%" }} id="sample-inline-frame" name="sample-inline-frame"> </iframe>
         </Modal>
         {this.state.isLoading?
            <div className='row'>
                <div className='col-md-1 offset-md-5 mt-5'>
                    <img className='loading' src='/images/loading.svg' alt='loading'/>
                </div>
            </div>
        :''}
        {this.state.isExpired?
            <div className='col-md-9 cols9-center mainOuterDiv mt-5' style={{ textAlign:"center" }}>
                <h3 className='expiredMessage'>Your booking has been expired</h3>
                <button className='proceedToPayment mt-5'  onClick={this.refreshRoute} style={{ width:"20%" }}><i className='fa fa-arrow-left'></i> Go Back </button>
            </div>
            :
            this.state.isShowVoucher?
            <Voucher
                transaction_code = {this.props.transaction_code}
                operation_date = {this.props.operationDate+" — "+this.props.operationTime}
                product_name = {this.props.productName}
                email = {this.props.email}
                phone_number = {"+"+this.props.phoneNumber}
                currency= {this.props.currency}
             />:
            <div className='col-md-9 cols9-center mainOuterDiv' style={{ opacity:this.state.componentOpacity }} >

                <div className='row pt-5 pb-4'>
                    <div className='col-md-12'>
                        <h2 className='paymentHeading'>Payment</h2>
                    </div>
                </div>

                <div className="clearfix"></div>

                <div className='row text-left'>
                    <div className='col-md-4'>
                        <p className='operationDateTime'>{this.props.operationDate+" — "+this.props.operationTime}</p>
                        <h4 className='productHeading'>{this.props.productName}</h4>
                        <h4 className='paxDetails'><span className='paxDetailsLight'>FOR</span> {this.props.total_frontend_count}</h4> 
                    </div>
                    <div className='col-md-4 text-left'>
                        <p className='bookingId mb-2'>BOOKING ID</p>
                        <h4 className='bookingValue mb-3'>{this.props.transaction_code}</h4>
                        {/* <h4 className='bookingValue mb-3'>308945454</h4> */}
                        <p className='bookingId mb-2'>E-MAIL ADDRESS</p>
                        <h4 className='bookingValue'>{this.props.email}</h4>
                        {/* <h4 className='bookingValue'>jmmkaler@gmail.com</h4> */}
                    </div>
                    <div className='col-md-4 text-left'>
                        <p className='bookingId mb-2'>PHONE NUMBER</p>
                        <h4 className='bookingValue mb-3'>+{this.props.phoneNumber}</h4>
                        {/* <h4 className='bookingValue mb-3'>308945454</h4> */}
                    </div>
                </div>

                <div className="clearfix"></div>

                <div className='row mt-5'>
                    <div className='col-md-6'>
                        <h4 className='paymentTypeLight'><span className='paymentType'>PAYMENT AMOUNT (</span>{this.props.paymentType}<span className='paymentType'>)</span></h4>
                    </div>
                    <div className='col-md-6'>
                        <h4 className='amountValue'><span className='currencyValue'>{this.props.currency} </span>
                            {formatThousands(this.props.amount)} 
                        </h4>
                    </div>
                </div>

                <div className="clearfix"></div>

                <div className='row'>
                    <div className='col-md-12 borderTop'>
                        <h4 className='mt-3 paymentNotice'>Please complete your payment before <span className='paymentNoticeDark'>{preDate}, {normalTime}</span></h4>   
                    </div>
                </div>

                <div className="clearfix"></div>

                <div className='row mt-5 rounded p-md-y-5'>
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
                            <img className='bankImg' alt='mandiri' src='/images/mandiri.png' style={{ marginTop: "-11px" }}/>
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

                        <p className="bankImage custom-radio" data-toggle="collapse" data-target="#other" data-parent="#bankTransfers">
                        <input type='radio' className='custom-control-input' onChange={(e) =>this.handleBankClick('other')} value={'other'} name='checkBank' id='checkOther'/>
                            <label htmlFor='checkOther' className='custom-control-label'> 
                            <h2 className='otherBank'>Other Bank</h2>
                        </label>
                        
                        </p>
                            <div id="other" className="collapse">
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
                            <p className="bankImage custom-radio" data-toggle="collapse" data-target="#bni" data-parent="#bankTransfers">
                            <input type='radio' className='custom-control-input' value={'ALFAMART'} checked='true' name='checkRetail' id='checkAlfa'/>
                                <label htmlFor='checkBni' className='custom-control-label'> 
                                <img src='/images/alfa.jpg' alt='alpha'/>
                            </label>
                        </p>           
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
                                cardNumberInputProps={{ value: this.state.cardNumber, onChange: this.handleCard }}
                                cardExpiryInputProps={{ value: this.state.expiry, onChange: this.handleCardExpiryChange }}
                                cardCVCInputProps={{ value: this.state.cvc, onChange: this.handleCardCVCChange }}
                                holderNameProps ={{ value: this.state.cardHolderName, onChange: this.handleHolderName }}
                                // cardNumberInputRenderer={this.handleCard}
                                fieldClassName="input"
                            />
                            <div className='sc-bdVaJa1'>
                                <input type='text' onChange={this.handleHolderName} name='holderName' className='form-control' placeholder='Card Holder Name' id={this.state.nameE===true?'errorBorder':''}/>
                            </div> 
                            </div>
                            {this.state.nameE===true?<p class='errorText' style={{ textAlign:"center" }}> only a-z , A-Z and (- , _ ) Allowed</p>:''}    
                        </div>
                      </div>
                     
                    </div>
                    <div className='col-md-12 mt-5 text-center'>
                        <button className='confirm-payment' onClick={this.handleConfirmPayment} disabled={this.state.isDisablePayment}>Confirm Payment</button>
                        {/* {this.state.baknkTransferE?  
                           <div className="alert alert-danger mt-3 mb-5" style={{ padding:"0.25rem 1.25rem",fontSize:"12px" }}>
                               <strong>Error!</strong> Please select one of the bank.
                            </div>:''
                            } */}
                    </div>
                    
                </div>

            </div>

            }

      </div>
    )
  }
}

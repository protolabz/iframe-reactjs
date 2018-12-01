import React, { Component } from 'react'
import axios from 'axios';
import './payment.css';
import CreditCardInput from 'react-credit-card-input';
export default class componentName extends Component {

    state ={
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
        expiryDate:null,
        isLoading:true,
        componentOpacity:0.2,
        isExpired:false,
        cardNumber:null,
        expiry:null,
        cvc:null,
        cardHolderName:null
    }

    componentWillMount(){
        var data = {
            // transaction_code:this.props.transaction_code,
            transaction_code:"56713178-01/12/2018-9059",
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
            })
            var dataRet = {
                transaction_code:"56713178-01/12/2018-9059",
                bank_code:"ALFAMART"
            }
            axios({
                method: 'post',
                url: `https://api.trabo.co/payment/xendit/client/invoice`,
                headers: {
                    "Content-Type" : "application/json"
                  },
                  data:dataRet
                })
                .then((res) => {
                    console.log(res);

                })
    }
  render() {
      let {detMandiri,detBri,detBni,mandiriAtm,mandiriIban,briAtm,briIban,bniAtm,bniIban,
        briMba,bniMba,expiryDate} = this.state;
      let mandiriA,mandiriI,briA,briI,bniA,bniI,briM,bniM,normalTime;
      let ForTime = new Date(expiryDate);
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

    return (

        <div className="container mt-5 mb-5">

         {this.state.isLoading?
            <img className='loading' src='/images/loading.svg' alt='loading'/>
        :''}
        {this.state.isExpired?
            <div className='col-md-9 cols9-center mainOuterDiv' style={{ textAlign:"center" }}>
                <h3 className='expiredMessage'>Your booking has been expired</h3>
                <button className='proceedToPayment mt-5' style={{ width:"20%" }}><i className='fa fa-arrow-left'></i> Go Back </button>
            </div>
            :
            <div className='col-md-9 cols9-center mainOuterDiv' style={{ opacity:this.state.componentOpacity }} >
                <div className='row pt-5 pb-4'>
                    <div className='col-md-12'>
                        <h2 className='paymentHeading'>Payment</h2>
                    </div>
                </div>

                <div className="clearfix"></div>

                <div className='row text-left'>
                    <div className='col-md-4'>
                        <p className='operationDateTime'>{this.props.operationDate+"--"+this.props.operationTime}</p>
                        {/* <p className='operationDateTime'>Thu, 27 Jul 2018 -- 07:00 AM</p> */}
                        <h4 className='productHeading'>{this.props.productName}</h4>
                        {/* <h4 className='productHeading mb-3'>Grand Ubud Tour</h4> */}
                        {/* <h4 className='paxDetails'><span className='paxDetailsLight'>FOR</span> Details</h4>
                        <h4 className='paxDetails'><span className='paxDetailsLight'>FOR</span> 2 ADULTS</h4> */}
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
                        <h4 className='amountValue'><span className='currencyValue'>IDR </span>
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
                           <a className="nav-link active" data-toggle="tab" href="#bankTransfers">Bank Transfer</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#retailTransfer">Retail Transfer</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#creditCard">Credit Card</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link otherBank" data-toggle="tab" href="#creditCard">Other Bank</a>
                        </li>
                        </ul>
                    
                        <div className="tab-content">
                        <div id="bankTransfers" className="container tab-pane active px-md-5"><br/>
                        <p className="bankImage custom-control custom-radio" data-toggle="collapse" style={{ paddingLeft:"0px" }} data-target="#mandiri" data-parent="#bankTransfers">
                        <input type='radio' className='custom-control-input' name='checkBank' id='checkMandiri'/>
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
                        <input type='radio' className='custom-control-input' name='checkBank' id='checkBri'/>
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
                        <input type='radio' className='custom-control-input' name='checkBank' id='checkBni'/>
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
                                <h4 className='virtualAccountNorm'>Virtual Account <span className='virtualAccount'># {accBri}</span></h4>
                                    <h4 className='virtualAccountNorm mb-4'>Nama Akun Virtual <span className='virtualAccount'>{nameBri}</span></h4>
                                    <p className='atmText'>* Silakan baca petunjuk di bawah ini untuk menyelesaikan transaksi Anda. </p>
                                    <ul className='listText'>
                                        {briA}
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
                                holderNameProps ={{ value: this.state.cvc, onChange: this.handleHolderName }}
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
                        <button className='confirm-payment'>Confirm Payment</button>
                    </div>
                    
                </div>
            </div>
            }
      </div>
    )
  }
}

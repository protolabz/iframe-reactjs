import React, { Component } from 'react'
import axios from 'axios';
import './listBooking.css';
import { stat } from 'fs';
import Voucher from '../Vouchers/vouchers'
export default class componentName extends Component {
    state ={
        bookingList:[],
        bookingListExpire:[],
        showVoucher:false,
        transaction_code:null
    }

    componentWillMount(){
        axios({
            method: 'get',
            // url: `https://api.trabo.co/partner/activity/transactions?email=umag@gmail.com`,
            url: `https://api.trabo.co/partner/activity/transactions?email=${this.props.userEmail}`,
            })
            .then((res) => {
                // console.log(res)
                var bLi =[],bLiE =[];
                var list = res.data;
                if(res.data.length>1){
                    list.map(x=>{
                        if(x.status_name==='Expired'){
                            bLiE.push(x)
                        }
                        else{
                            bLi.push(x)
                        }
                    })
                }
                else{
                    if(res.data[0].status_name==='Paid'){
                        bLi.push(res.data[0])
                     }
                     else{
                        bLi.push(res.data[0])
                     }
                }

                this.setState({
                    bookingList:bLi,
                    bookingListExpire:bLiE
                })

            })
        }
        handleDetail = (transCode) =>{
            this.setState({
                transaction_code:transCode,
                showVoucher:true
            })
        }
  render() {
      let {bookingList,bookingListExpire} = this.state;
      let boList,boListE;
      function formatThousands(n, dp) {
        var s = ''+(Math.floor(n)), d = n % 1, i = s.length, r = '';
        while ( (i -= 3) > 0 ) { r = ',' + s.substr(i, 3) + r; }
        return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10,dp||2)) : '');
      }
      if(bookingList.length!==0){
        boList =(
            bookingList.map((x,index)=>(
                <div key={index}>
                    <div className='row mt-4 mainBooking p-4'>
                    <div className='col-12'>
                    <div className='row'>
                    <div className='col-7'>
                        <h4 className="opDate">{x.operation_date}</h4>
                        <h4 className='proTitle pt-2'>{x.product_name}</h4>
                        <h4 className='paxDet pt-2'><span className='paxDetLight'>for </span>{x.pax_text} {x.item_text}</h4>
                    </div>
                    <div className='col-5 text-right'>
                    {x.due>0?
                        <h4 className="totalText">PAID (<span className='totalPaidRed'>{x.status_name}</span>)</h4>
                        :
                        <h4 className="totalText">PAID (<span className='totalPaidGreen'>{x.status_name}</span>)</h4>
                        }
                        <h4 className='totalAmt'>IDR {formatThousands(x.paid_amount)}</h4>
                        {x.due>0?
                        <h4 className='remainAmt'>IDR {formatThousands(x.due)}<span className='remainAmtLight'> remains</span></h4>
                        :''}
                    </div>
                    </div>
                                          
                    </div>
                </div>
                <div className='row py-3 px-4 bookingBottom'>
                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-7'>
                            <h4 className='paxDet'><span className='paxDetLight'>Booked on </span>{x.booked_on}</h4>
                            </div>
                            <div className='col-5 text-right'>
                                <h4 onClick={(e)=>this.handleDetail(x.transaction_code)} className='details'>Detials <i className='fa fa-angle-right'></i></h4>
                            </div> 
                        </div>    
                    </div>                
                </div>  

                </div>
            ))
        )

        boListE =(
            bookingListExpire.map((x,index)=>(
                <div key={index}>
                    <div className='row mt-4 mainBookingE p-4'>
                    <div className='col-12'>
                    <div className='row'>
                    <div className='col-7'>
                        <h4 className="opDate">{x.operation_date}</h4>
                        <h4 className='proTitle pt-2'>{x.product_name}</h4>
                        <h4 className='paxDet pt-2'><span className='paxDetLight'>for </span>{x.pax_text} {x.item_text}</h4>
                    </div>
                    <div className='col-5 text-right'>
                    {x.due>0?
                        <h4 className="totalText">PAID (<span className='totalPaidRed'>{x.status_name}</span>)</h4>
                        :
                        <h4 className="totalText">PAID (<span className='totalPaidGreen'>{x.status_name}</span>)</h4>
                        }
                        <h4 className='totalAmt'>IDR {formatThousands(x.paid_amount)}</h4>
                        {x.due>0?
                        <h4 className='remainAmt'>IDR {formatThousands(x.due)}<span className='remainAmtLight'> remains</span></h4>
                        :''}
                    </div>
                    </div>
                                          
                    </div>
                </div>
                <div className='row py-3 px-4 bookingBottomE'>
                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-7'>
                                <h4 className='paxDet'><span className='paxDetLight'>Booked on </span>{x.booked_on}</h4>
                            </div>
                            <div className='col-5 text-right'>
                                <h4 onClick={(e)=>this.handleDetail(x.transaction_code)} className='details'>Detials <i className='fa fa-angle-right'></i></h4>
                            </div> 
                        </div>    
                    </div>                
                </div>  

                </div>
            ))
        )
      }
      var expiredListis;
      if(boListE){
        if(boListE.length>0){
        expiredListis = (
        <div className='row mt-4'>
        <div className='col-sm-12'>
            <div className='col-3 p-0'>
                <h4 className="activeText">Expired</h4>
            </div>
        </div>
         </div>
        )
        }
      }
      
    return (
          this.state.showVoucher?
             <Voucher
             transaction_code = {this.state.transaction_code}
            />
            :
        <div className="container-fluid mt-5 mb-5">
            
            <div className='col-md-9 cols9-center mainOuterDiv' >
                <div className='row'>
                    <div className='col-sm-12 p-0'>
                        <div className='col-sm-3 bookingsHeading p-0'>
                            <h4 className="bookingText py-2"><i className='fa fa-file-text-o bookingIcon'>&nbsp; </i>Bookings</h4>
                        </div>
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-sm-12 p-0'>
                        <div className='col-3 p-0'>
                            <h4 className="activeText">Active</h4>
                        </div>
                    </div>
                </div>
               {boList}
               {expiredListis}
               {boListE}
            </div>
           
        </div> 
 
    )
  }
}

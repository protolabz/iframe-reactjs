import React, { Component } from 'react'
import axios from 'axios';
// import { NavLink } from 'react-router-dom';
import Paxpage from '../PaxDetails/PaxDetails'
import './ChooseActivity.css';

export default class MultipleHours extends Component {
    state ={
        dateBefore:null,
        dateCurrent:null,
        dateAfter:null,
        selectedTime:null,
        selectedDate:null,
        showPaxPage:false,
        showActivityDetail:false,
        isLoading:true
    }

    componentWillMount(){
        axios({
            method: 'get',
            url: `https://api.trabo.co/partner/activity/detail/${this.props.productId}?date=${this.props.dateValue}&&multi=true`,
            // url: `https://api.trabo.co/partner/activity/detail/A-09213790?date=${this.props.dateValue}&&multi=true`,
        })
            .then((res) => {
                    this.setState({
                       dateBefore:res.data.response.date_before,
                       dateAfter:res.data.response.date_after,
                       dateCurrent:res.data.response.date_current,
                       isLoading:false
                    })
            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });
    }
    handlePreviousDay = (d,t,quota,used_quota) => {
        t = t.replace(/ /g,'-');
        this.setState({
            selectedTime:t,
            selectedDate:d,
            showPaxPage:true,
            quota:quota,
            used_quota:used_quota
        })
        // window.location = `/pax-details/${t}/${d}/boxvalue/selectValue/${this.props.match.params.params}`


    }
    handleCurrentDay = (d,t,quota,used_quota) => {
        t = t.replace(/ /g,'-');
        this.setState({
            selectedTime:t,
            selectedDate:d,
            showPaxPage:true,
            quota:quota,
            used_quota:used_quota
        })
        // window.location = `/pax-details/${t}/${d}/boxvalue/selectValue/${this.props.match.params.params}`
    }
    handleNextDay = (d,t,quota,used_quota) => {
        t = t.replace(/ /g,'-');
        this.setState({
            selectedTime:t,
            selectedDate:d,
            showPaxPage:true,
            quota:quota,
            used_quota:used_quota
        })
        // window.location = `/pax-details/${t}/${d}/boxvalue/selectValue/${this.props.match.params.params}`
        // `/pax-details/${timeValue}/${dateValue}/${boxValue}/${selectValue}/${this.props.match.params.id}`
    }
    goToActivity = () =>{
        window.location.reload();
    }
  render() {
    
      const {dateBefore,dateAfter,dateCurrent} = this.state;
      let preDate;
      let curDate;
      let CopyPrevDate
      let CopyCurDate
      let CopyNexDate
      let nexDate;
      let preTime =[];
      let curTime =[];
      let nexTime =[];
      if(dateBefore){
          if(dateBefore.before_date!==null){
          preDate = dateBefore.before_date.from;
          CopyPrevDate = dateBefore.before_date.from;
          preTime = dateBefore.before;

          let dateFormat = new Date(preDate).toGMTString();
            let dts = (dateFormat.split(' '));
            let dd,mm,yy,dday;
            dd = dts[1];
            mm = dts[2];
            yy = dts[3];
            dday = dts[0];
            preDate = dday+ " " +dd+ " " +mm+ " " +yy;
        }
      }
      if(dateAfter){
        if(dateAfter.after_date!==null){
        nexDate = dateAfter.after_date.from;
        CopyNexDate = dateAfter.after_date.from;
        nexTime = dateAfter.after;

        let dateFormat = new Date(nexDate).toGMTString();
            let dts = (dateFormat.split(' '));
            let dd,mm,yy,dday;
            dd = dts[1];
            mm = dts[2];
            yy = dts[3];
            dday = dts[0];
            nexDate = dday+ " " +dd+ " " +mm+ " " +yy;
        }
      }
      if(dateCurrent){
        if(dateCurrent.current_date!==null){
        curDate = dateCurrent.current_date.from;
        CopyCurDate  =dateCurrent.current_date.from;
        curTime = dateCurrent.current;
        let dateFormat = new Date(curDate).toGMTString();
            let dts = (dateFormat.split(' '));
            let dd,mm,yy,dday;
            dd = dts[1];
            mm = dts[2];
            yy = dts[3];
            dday = dts[0];
            curDate = dday+ " " +dd+ " " +mm+ " " +yy;
        }
      }
      const previousTime = (
          (
            preTime.map((item,index) => (
                <div className='row mb-2' key={item.time}>
                    <div className='col-sm-12'>
                        <div className='bookingCard'>
                            <span>{item.time}</span>
                            {
                              item.quota-item.used_quota>0?
                            <button onClick={() => this.handleCurrentDay(CopyPrevDate,item.time,item.quota,item.used_quota)} className='hourlyBookBtn'>Book</button>
                            :''}
                        </div>
                    </div>
                </div>
            )) 
          )
      )

      const currentTime = (
        (
          curTime.map((item,index) => (
              <div className='row mb-2' key={item.time}>
                  <div className='col-sm-12'>
                      <div className='bookingCardCurrent'>
                          <span>{item.time} <br/>
                          {
                              item.quota-item.used_quota>0?
                              <span className='quota-left-multiple'>{item.quota-item.used_quota} left</span>
                          :''}
                          </span>
                          {
                              item.quota-item.used_quota>0?
                          <button onClick={() => this.handleCurrentDay(CopyCurDate,item.time,item.quota,item.used_quota)} className='hourlyBookBtnCurrent'>Book</button>
                          :''}
                      </div>
                  </div>
              </div>
          )) 
        )
    )

    const nextTime = (
        (
          nexTime.map((item,index) => (
              <div className='row mb-2' key={item.time}>
                  <div className='col-sm-12'>
                      <div className='bookingCard'>
                          <span>{item.time}<br/>
                          {
                              item.quota-item.used_quota>0?
                              <span className='quota-left-multiple'>{item.quota-item.used_quota} left</span>
                          :''}
                          </span>
                          {
                              item.quota-item.used_quota>0?
                          <button onClick={() => this.handleCurrentDay(CopyNexDate,item.time,item.quota,item.used_quota)} className='hourlyBookBtn'>Book</button>
                          :''}
                      </div>
                  </div>
              </div>
          )) 
        )
    )
    return (
        this.state.showPaxPage?
        <Paxpage 
            boxValue={this.props.boxValue} 
            selectValue={this.props.selectValue}
            timeValue={this.state.selectedTime} 
            dateValue={this.state.selectedDate} 
            productId={this.props.productId}
            quota={this.state.quota}
            used_quota={this.state.used_quota}
        />:
           <div className='container mt-5 mb-5'>
           {this.state.isLoading?
                <img className='loading' src='/images/loading.svg' alt='loading'/>
            :
                <div className='row'>
                    <div className='col-sm-9 cols9-center mainOuterDiv'>
                        <div className='row mb-1 goBackBox'>
                            <div className='col-sm-12 py-2'>
                                <p className='goBack' onClick={this.goToActivity}><i className='fa fa-angle-left'> </i> Go back to activity</p>
                            </div>
                        </div>
                        {/* <hr/>  */}
                        <div className='row createTimesBox py-3'>
                            <div className='col-sm-4 mb-4'>
                                <h6 className='dayState'>PREVOUS DAY</h6>
                                <h6 className='fullDate'>{preDate?preDate:<b>(No previous date available)</b>}</h6>
                                    {previousTime}
                            </div>
                            <div className='col-sm-4 mb-4'>
                            <h6 className='dayStateCurrent'>YOU SELECTED</h6>
                                <h6 className='fullDateCurrent'>{curDate?curDate:''} </h6>
                                    {currentTime}
                            </div>
                            <div className='col-sm-4 mb-4'>
                            <h6 className='dayState'>NEXT DAY</h6>
                                <h6 className='fullDate'>{nexDate?nexDate:<b>(No next date available)</b>}</h6>
                                    {nextTime}
                            </div>
                        </div>
                    </div>
                </div>
           }
            </div>
    )
  }
}

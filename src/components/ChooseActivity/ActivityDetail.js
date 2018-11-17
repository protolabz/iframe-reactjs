import React, { Component } from 'react'
import axios from 'axios';
import './ChooseActivity.css';
import { NavLink } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Alert from 'react-s-alert';
export default class ActivityDetail extends Component {
    state ={
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
     holidaysRows:[],
     showHolidays:false     
    }
    componentWillMount(){
        axios({
            method: 'get',
            // url: `https://api.trabo.co/partner/activity/detail/${this.props.match.params.id}`,
            // url: `https://api.trabo.co/partner/activity/detail/A-09213790?date=2018-11-17&time=8:30 AM`,
            url: `https://api.trabo.co/partner/activity/detail/A-09213790`,
        })
            .then((res) => {
                this.setState({
                    detail_product:res.data.response.detail_product,
                    product:res.data.response.product,
                    rates_pax_package:res.data.response.detail_product.rates_pax_package,
                    include_exclude:res.data.response.detail_product.include_exclude,
                    locations:res.data.response.detail_product.location,
                    pax_details:res.data.response.product.additional_description.pax_details,
                    additionalDesc:res.data.response.product.additional_description.description,
                    bannerImg:res.data.response.detail_product.image,
                    dates:res.data.response.operationDate
                })

            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });
            
            axios({
                method: 'get',
                url: `https://www.googleapis.com/calendar/v3/calendars/en.indonesian%23holiday%40group.v.calendar.google.com/events?key=AIzaSyDiaLvDNpNZVX6Vw6QHLqLhYOqgQPeEIsE`,
            })
                .then((res) => {
                    this.setState({
                        holidaysRows:res.data.items,
                    })
    
                })
                .catch((e) =>
                {
                    console.error(e);
                    this.setState({success:'Alert: Something went wrong'});
                });
    }


    handleDayClick = (day) =>{
        let abs = day.toLocaleDateString("en-US").replace(/[/]/g, "-");
        let {dates} =this.state;
        let d;
        abs = abs.split('-');
        let days,month,year;
            days = abs[1];
            month = abs[0];
            year = abs[2];
            let FullDate = year+'-'+month+'-'+days;
            function checkDate(dateVal){
                for(let i = 0; i<=dates.length-1; i++){
                    d = dates[i].from;
                    if(d===dateVal){
                        return true;
                    }
                }
            }
            if(checkDate(FullDate)===true){
            axios({
                method: 'get',
                url: `https://api.trabo.co/partner/activity/detail/A-09213790?date=${FullDate}`,
            })
                .then((res) => {
                    
                    if(res.data.response.operation_times.length>0){
                        this.setState({
                            OperationTime:res.data.response.operation_times
                        })
                    }

                })
                .catch((e) =>
                {
                    console.error(e);
                    this.setState({success:'Alert: Something went wrong'});
                });
            }
            // else{
            //     console.log("Not Fine")
            // }
    }
   
    handleMouseHover = (day) =>{
        let abs = day.toLocaleDateString("en-US").replace(/[/]/g, "-");
        let {holidaysRows} =this.state;
        let selectedDate;
        abs = abs.split('-');
        let days,month,year;
            days = abs[1];
            month = abs[0];
            year = abs[2];
            if(days<10){
                days = 0+''+days;
            }
            let FullDate = year+'-'+month+'-'+days;
            function checkDate(dateVal){
                for(let i = 0; i<=holidaysRows.length-1; i++){
                    selectedDate = holidaysRows[i].start.date;
                    if(selectedDate===dateVal){
                        return (
                          {
                                result:'true',
                                date: selectedDate+' '+holidaysRows[i].summary
                            }
                        );
                    }
                }
               
            }
            let kk =checkDate(FullDate)
            
            if(kk){
                Alert.error(kk.date, {
                    position: 'bottom-right',
                    effect: 'jelly',
                    timeout: 2000
                });
            }

        }
        toggleHidden =() => {
            this.setState({
                showHolidays: !this.state.showHolidays
            });
          }
  render() {
      let {holidaysRows,detail_product,product,locations,rates_pax_package,include_exclude,additionalDesc,bannerImg,dates,OperationTime} = this.state;
      let mainCity;
      let locs;
      let rates;
      let incl;
      let excl;
      let addDescText;
      let addDescList;
      let addDescCheck;
      let incidence = product.incidence;
      let images =[];
      let sDays = [];
      let hDays =[];
      let hNames = [];
      let oTime;
      var hol;
      var fullYear = new Date().getFullYear();
      let lastYear = fullYear - 1;
     
    // Banner Images
    if(bannerImg.length>=1){
        for(let i = 0; i < bannerImg.length; i++){
            let ifs = {original:"https://res.cloudinary.com/trabo/"+bannerImg[0].resource+"",thumbnail:"https://res.cloudinary.com/trabo/"+bannerImg[0].resource+""};
            images.push(ifs);
        }
    }
  
    // DatesData
    var d;
    if(dates.length>0){
        for(let i = 0; i<=dates.length-1; i++){
            d = dates[i].from.replace(/-/g, ",");
            sDays.push(new Date(d));
        }
    }

    if(holidaysRows.length>0){
        for(let i = 0; i<=holidaysRows.length-1; i++){
            hol =  holidaysRows[i].start.date.replace(/-/g, ",");
            hDays.push(new Date(hol));
            if(holidaysRows[i].start.date<=fullYear+'-12-31' && holidaysRows[i].start.date>lastYear+'-12-31'){
                hNames.push({date:holidaysRows[i].start.date,holidays:holidaysRows[i].summary})
            }
                

        }
    }
    if(OperationTime!==''){
        if(OperationTime.length<=5){
            oTime =(
                OperationTime.map((item,index) => (
                        <div className="card timeCard mb-2" key={index}>
                            <div className="card-body">
                                <h5 className="card-title">Thu, 26 Jul 2018</h5>
                                <p className="card-text">Starts at<span className='boldCardText'> {item.time}</span></p>
                            </div>
                        </div>
                    
                ))
            )
        }
        else{
            console.log('asdf')
        }
        
        
    }
    
    // Locations Data
    if(locations.length!==0){
        if(locations.length>1){
            mainCity = locations[0].city;
            locations = locations.splice(1,locations.length);
        }
        locs = (
            locations.map((item, index) =>(
                 <li key={item.id}>{item.city}</li>
             ))
    );
    }

    //Rates Data
    if(rates_pax_package.length!==0){
        function formatThousands(n, dp) {
            var s = ''+(Math.floor(n)), d = n % 1, i = s.length, r = '';
            while ( (i -= 3) > 0 ) { r = ',' + s.substr(i, 3) + r; }
            return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10,dp||2)) : '');
          }
       rates = (
           rates_pax_package.map((item,index) => (
               item.amount>0?
            <div className='row px-3' key={item.id}>
                <div className='col-sm-8 col-xs-8'>
                <p className='participants'>{item.pax_type} (Age {item.age_from}-{item.age_to})
                <br/>
                {item.minimum>0?<span style={{ fontSize:"10px",textTransform:"capitalize" }}>Minimum : {item.minimum} PAX</span>:''}
                </p>
                </div>
                <div className='col-sm-4 col-xs-4'><p className='currency'>IDR {formatThousands(item.amount)}</p></div>
            </div>
            :''
           ))
       )
    }  

    // Include Exclude Data
    if(include_exclude.length!==0){
    
        incl = (
            include_exclude.map(item => 
                item.type === 0 ? (<li key={item.id}>{item.description}</li>) : 
            ''
            ));
        excl = (
            include_exclude.map(item => 
                item.type === 1 ? (<li key={item.id}>{item.description}</li>) : 
            ''
            ));
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
                        <input type="checkbox" className="custom-control-input" value={chk} id={`customCheck${index}`}/>
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
                        <select className='Text-Box mx-4'>
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

    return (
      <div className='container mt-5 mb-5'>
            <div className='row'>
                <div className='col-sm-9 cols9-center mainOuterDiv'>
                <div className='row mb-4'>
                    <div className='col-sm-12'>
                        <NavLink to='/' className='Select-another-activ'><i className='fa fa-angle-left'> </i> Select another activity</NavLink>
                    </div>
                </div>
                    <div className='row mb-3'>
                        <div className='col-sm-12'>
                        <h4 className='Youre-viewing'>You're viewing</h4>
                        <p className='productName'>{detail_product.name}</p>
                        <p className='mb-5 prodDescTop'>{detail_product.brief_description}</p>
                            <div className='row mb-4'>
                                <div className='col-sm-12'>
                                    <ImageGallery 
                                        useBrowserFullscreen={false} 
                                        items={images}
                                        showFullscreenButton={false}
                                        showPlayButton={false}
                                        disableArrowKeys={true}
                                    />
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className='row px-5 mb-4'>
                        <div className='col-sm-7'>
                            <h5 className="Location mb-4">LOCATION</h5>
                            <p className='Ubud-Bali-Indonesi'>{mainCity}</p>
                            <ul className='locationList'>
                            {locs}
                            </ul>
                            <NavLink className='View-map' to="#">View map</NavLink>

                            <h5 className='Rates mb-4 mt-5'>RATES</h5>
                            {rates}
                            <hr />

                            {incidence?
                            <div>
                            <h5 className='incidents mb-2'>INCIDENTS</h5>
                            <div className='Rectangle-10'>
                                <p className='IncidenceText'>{incidence}</p>
                            </div>
                            </div>
                            :''}

                             <h5 className='Description mb-4 mt-5'>DESCRIPTION</h5>
                            <p className='DescriptionTexts'>{detail_product.brief_description}</p>
                            <div className='row mt-4'>
                             <div className='col-sm-6'>
                                    <h5 className='Include mb-3'>INCLUDE</h5>
                                        <ul className='include'>
                                            {incl}
                                        </ul>
                                </div>
                                <div className='col-sm-6'>
                                    <h5 className='Exclude mb-3'>EXCLUDE</h5>
                                    <ul className='exclude'>
                                        {excl}
                                    </ul>
                                </div>
                             </div>
                                <h5 className='ADDITIONAL-DESCRIPTI mb-3 mt-4'>ADDITIONAL DESCRIPTION</h5>
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

                             <h5 className='Special-Notes mt-5 mb-3'>SPECIAL NOTES</h5>
                            <p className='specialText'>{product.spesial_note}</p>
                    </div>
                   
                    <div className='col-sm-5 calendarOuter'>
                        <p className='pickDate'>PICK A DATE</p>
                        <DayPicker 
                            initialMonth={new Date()} 
                            fromMonth={new Date()}
                            selectedDays={sDays}
                            onDayClick={this.handleDayClick}
                            onDayMouseEnter={this.handleMouseHover}
                            onDayMouseLeave={this.onDayMouseLeave}
                            disabledDays={hDays}
                        />
                        <div className='cardParent'>
                            {oTime}
                        </div>
                           <button className='nextStep mt-4 mb-1'>Next Step <i className='fa fa-arrow-right'></i></button>
                           {/* <button onClick={this.toggleHidden} className='showHolidays mt-2 mb-5'>Show Holidays <i className='fa fa-arrow-down'></i></button> */}
                           {/* {
                               this.state.showHolidays?
                                <ul>
                                    {
                                        hNames.map((item,index) =>(
                                            <li key={item.date}>{item.date} : {item.holidays}</li>
                                        ))
                                    }  
                                </ul>
                                :''
                            }   */}
                        </div>
                        </div>


                        
                    </div>         

                   
                   
                </div>
                <Alert stack={{limit: 1}} timeout={2000}/>
            </div>

    )
  }
}

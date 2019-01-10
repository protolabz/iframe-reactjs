import React, { Component } from 'react'
import axios from 'axios';
import './ChooseActivity.css';
import { NavLink } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import PaxDetails from '../PaxDetails/PaxDetails';
import MultipleHours from './MultipleHours';
import Alert from 'react-s-alert';
import swal from 'sweetalert';
import Header from '../header/header';
import Footer from '../footer/footer';

export default class ActivityDetail extends Component {
    state ={
     detail_product:[],
     locations:[],
     rates_pax_package:[],
     rates_additional_product:[],
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
     boxValHeading:null,
     selectValHeading:null,
     selectValue:null,
     textValue:null,
     timeValue:null,
     dateValue:null,
     showError:false,
     showPaxPage:false,
     showMultipleHrs:false,
     showModal:false,
     isLoading:true,
     maxQuota:null,
     token:this.props.match.params.token
    }

    componentWillMount(){
        // console.log(this.props.match.params.token);
        axios({
            method: 'get',
            url: `https://api.trabo.co/partner/activity/detail/${this.props.match.params.id}`,
            // url: `https://api.trabo.co/partner/activity/detail/A-09213790?date=2018-11-17&time=8:30 AM`,
            // url: `https://api.trabo.co/partner/activity/detail/A-09213790`,
        })
            .then((res) => {
                var data = res.data.response.product.additional_description.description;
                var len = res.data.response.product.additional_description.description.length;
                var descriptionWithText = [];
                    for(let i=0;i<=len-1;i++){
                        if(data[i].type==='check_box' && data[i].mandatory==='1'){
                            this.setState({isRequiredBox:false})
                        }
                        if(data[i].type==='list_box' && data[i].mandatory==='1'){
                            this.setState({isRequiredSelect:false})
                            
                        }
                    }
                    var textDesc = res.data.response.product.additional_description.description;
                    textDesc.map(x=>{
                        if(x.type==='text'){
                            // descriptionWithText += {"heading":x.heading,"content":x.items};
                            // descriptionWithText.concat([{"heading":x.heading,"content":x.items}]);
                            descriptionWithText.push({"heading":x.heading,"content":x.items})
                        }
                    })

                this.setState({
                    detail_product:res.data.response.detail_product,
                    product:res.data.response.product,
                    rates_pax_package:res.data.response.detail_product.rates_pax_package,
                    rates_additional_product:res.data.response.detail_product.rates_additional_product,
                    include_exclude:res.data.response.detail_product.include_exclude,
                    locations:res.data.response.detail_product.location,
                    pax_details:res.data.response.product.additional_description.pax_details,
                    additionalDesc:res.data.response.product.additional_description.description,
                    bannerImg:res.data.response.detail_product.image,
                    dates:res.data.response.operationDate,
                    isLoading:false,
                    textValue:descriptionWithText
                })

            })
            .catch((e) =>
            {
                console.error(e);
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
                });
    }

    handleDayClick = (day) =>{
        // console.log("Function called");
        let abs = day.toLocaleDateString("en-ID").replace(/[/]/g, "-");
        let dateFormat = day.toGMTString();
        let dts = (dateFormat.split(' '));
        let dd,mm,yy,dday;
        dd = dts[1];
        mm = dts[2];
        yy = dts[3];
        dday = dts[0];

        dateFormat = dday+ " " +dd+ " " +mm+ " " +yy;
        let {dates} =this.state;
        let d;
        abs = abs.split('-');
        let days,month,year;
            days = abs[1];
            month = abs[0];
            year = abs[2];
            if(days<10){
                days = "0"+days;
            }
            if(month<10){
                month = "0"+month;
            }
        let FullDate = FullDate = year+'-'+month+'-'+days;
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        if(isSafari) {
            if(days<10){
                days = days.substr(1);
            }
            if(month<10){
                month = month.substr(1);
            }
            FullDate = year+'-'+days+'-'+month;
        }


            function checkDate(dateVal){
                for(let i = 0; i<=dates.length-1; i++){
                    d = dates[i].from;
                    if(d===dateVal){
                        return true;
                    }
                }
            }
            let nextPgData = {
                date:FullDate,
                params:this.props.match.params.id
            }
            if(checkDate(FullDate)===true){
            axios({
                method: 'get',
                url: `https://api.trabo.co/partner/activity/detail/${this.props.match.params.id}?date=${FullDate}`,
            })
                .then((res) => {
                    if(res.data.response.operation_times.length>0){
                        this.setState({
                            OperationTime:res.data.response.operation_times,
                            OperationDate:dateFormat,
                            OperationDateNormal:nextPgData,
                        })
                    }

                })
                .catch((e) =>
                {
                    console.error(e);
                    // this.setState({success:'Alert: Something went wrong'});
                });
            }
 
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
            if(month<10){
                month = 0+''+month;
            }
            let FullDate = year+'-'+month+'-'+days;
            function checkDate(dateVal){
                for(let i = 0; i<=holidaysRows.length-1; i++){
                    selectedDate = holidaysRows[i].start.date;
                    // console.log(selectedDate+' '+holidaysRows[i].summary)
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
        selectTimeFrame = (date,time,maxQuota) => {
            this.setState({
                isTimeSelected:true,
                timeValue:time,
                dateValue:date,
                maxQuota:maxQuota
            })
        }

        handleSelectBox = (listValue,head) =>{
           this.setState({
               selectValue:listValue,
               selectValHeading:{heading:head,content:[listValue]}
            })
           if(this.state.additionalDesc[2].mandatory === '1'){
                this.setState({
                    isRequiredSelect: true,
                    selectValue:listValue,
                })
           }
        }
        handleCheckbox = (e,heading) => {   
            let val = e.target.value;    
            var value = this.state.boxValue;  
            if(value.includes(val)){          
                value.pop(val);
            }else{
                value.push(val);
                
            }

            this.setState({
                boxValue: value,
                boxValHeading:{heading:heading,content:value}
            });

            if(!this.state.isRequiredBox){
                this.setState({
                    isRequiredBox: true
                })
            }   

            
          }
        handleBookButton =(timeValue) => {
            let {boxValue,selectValue} = this.state;
            var selectHead='', boxHead='';
            var add_pax = this.state.additionalDesc;
            for(let i=0;i<add_pax.length;i++){
                if(add_pax[i].type==='list_box'){
                    selectHead = add_pax[i].heading;
                }
                if(add_pax[i].type==='check_box'){
                    boxHead = add_pax[i].heading;
                }
            }
            if(timeValue===null){
                if(this.state.isRequiredBox && this.state.isRequiredSelect){
                    // timeValue = timeValue.replace(/ /g,'-');
                    if(this.state.boxValHeading===null){
                        this.setState({
                            // boxValHeading:{heading:boxHead,content:[null]}
                            boxValHeading:{heading:boxHead,content:[]}
                         }) 
                    }
                    if(this.state.selectValHeading===null){
                        this.setState({
                            // selectValHeading:{heading:selectHead,content:[null]}
                            selectValHeading:{heading:selectHead,content:[]}
                         }) 
                    }
                    if(selectValue===''){
                        selectValue = '0';
                    }
                    if(boxValue.length===0){
                        boxValue = '0';
                    }
                    if(this.state.showMultipleHrs===false){
                        this.setState({showMultipleHrs:true})
                    }
                }
                else{
                    // console.log("else");
                    if(this.state.showError===false){
                        // this.setState({showError:true})
                        swal({
                            title: "Alert",
                            text: "Fields indicates with * are mandatory!",
                            icon: "warning",
                            button: true,
                            dangerMode: true,
                          })
                    }
                    
                }
            }
            else{
                if(this.state.isRequiredBox && this.state.isRequiredSelect){
                    if(this.state.boxValHeading===null){
                        this.setState({
                            // boxValHeading:{heading:boxHead,content:[null]}
                            boxValHeading:{heading:boxHead,content:[]}
                         }) 
                    }
                    if(this.state.selectValHeading===null){
                        this.setState({
                            // selectValHeading:{heading:selectHead,content:[null]}
                            selectValHeading:{heading:selectHead,content:[]}
                         }) 
                    }
                    timeValue = timeValue.replace(/ /g,'-');
                    if(selectValue===''){
                        selectValue = '0';
                    }
                    if(boxValue.length===0){
                        boxValue = '0';
                    }
                    this.setState({
                        showPaxPage:true,
                        timeValue:timeValue
                    })
                }
                else{
                    this.handleBookButton(null); 
                }
            }
        }


  render() {  
      let {OperationDate,holidaysRows,detail_product,product,locations,
            rates_pax_package,rates_additional_product,include_exclude,
            additionalDesc,bannerImg,dates,OperationTime} = this.state;
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
      var hol,ratesAdditional;
      var fullYear = new Date().getFullYear();
      let lastYear = fullYear - 1;
      let quota = product.quota - product.used_quota;
    // Banner Images

    if(bannerImg.length>=1){
        for(let i = 0; i < bannerImg.length; i++){
            let ifs = {original:"https://res.cloudinary.com/trabo/"+bannerImg[i].resource+"",thumbnail:"https://res.cloudinary.com/trabo/"+bannerImg[i].resource+""};
            images.push(ifs);
        }
    }
  
    // DatesData
    var d;
    if(dates.length>0){
        for(let i = 0; i<=dates.length-1; i++){
            d = dates[i].from.replace(/-/g, "/");
            sDays.push(new Date(d));
        }
    }

    if(holidaysRows.length>0){
        for(let i = 0; i<=holidaysRows.length-1; i++){
            hol =  holidaysRows[i].start.date.replace(/-/g, "/");
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
                    <div className="card timeCard mb-2" key={index} onClick={()=>this.selectTimeFrame(this.state.OperationDateNormal.date,item.time,item.balance)}>
                        <div className="card-body">
                            <h5 className="card-title">{OperationDate}</h5>
                            <p className="card-text">Starts at<span className='boldCardText'> {item.time}</span></p>
                            {
                                item.balance>0?
                            <p className='quota'>
                            <button onClick={() => this.handleBookButton(item.time)} className='inCalBook'>
                            Book
                            </button>
                             {item.balance}<span className='quota-left'> left
                             </span>
                             </p>
                             :
                             <p className='quota'>
                            <button onClick={() => this.handleBookButton(item.time)} disabled='true' className='inCalBook'>
                            Book
                            </button>
                             {item.balance}<span className='quota-left'> left
                             </span>
                             </p>
                             }
                        </div>
                    </div>
                ))
            )
        }
        else{
            // window.location = `/select-hours/${this.state.OperationDateNormal.params}/${this.state.OperationDateNormal.date}`
            oTime = (
                    <div>
                        {this.state.showMultipleHrs===false?this.handleBookButton(null):''}
                    </div>
            )
            // this.setState({showMultipleHrs:true})
        }
        
    }
    
    // Locations Data
    if(locations.length!==0){
        var location;
        if(locations.length>0){
            mainCity = locations[0].city;
            location = locations;
            // location.splice(0,1)
            locs = (
                location.map((item) =>(
                     <li key={item.city}>{item.city}</li>
                 ))
        );
        }
        

    }

    function formatThousands(n, dp) {
        var s = ''+(Math.floor(n)), d = n % 1, i = s.length, r = '';
        while ( (i -= 3) > 0 ) { r = ',' + s.substr(i, 3) + r; }
        return s.substr(0, i + 3) + r + (d ? '.' + Math.round(d * Math.pow(10,dp||2)) : '');
      }
    //Rates Data
    if(rates_pax_package.length!==0){
       rates = (
           rates_pax_package.map((item,index) => (
               item.amount>0?
            <div className='row px-3' key={item.id}>
                <div className='col-sm-8 col-xs-8 px-1'>
                <p className='participants'>{item.pax_type} (Age {item.age_from}-{item.age_to})
                <br/>
                {item.minimum>0?<span style={{ fontSize:"10px",textTransform:"capitalize" }}>Minimum : {item.minimum} PAX</span>:''}
                </p>
                </div>
                <div className='col-sm-4 col-xs-4 px-1'><p className='currency'>IDR {formatThousands(item.amount)}</p></div>
            </div>
            :''
           ))
       )
    }  
    if(rates_additional_product.length>0){
        ratesAdditional = (
            rates_additional_product.map((item,index) => (
                item.amount>0?
             <div className='row px-3' key={item.description}>
                 <div className='col-sm-8 col-xs-8 px-1'>
                 <p className='participants'>{item.description} 
                 <br/>
                <span style={{ fontSize:"10px",textTransform:"capitalize" }}>Maximum : {item.max_per_booking} {item.pricing_type}</span>
                 </p>
                 </div>
                 <div className='col-sm-4 col-xs-4 px-1' style={{ textTransform:"capitalize" }}><p className='currency'>IDR {formatThousands(item.amount)}/{item.pricing_type}</p></div>
             </div>
             :''
            ))
        )
    }
    let includes=false, excludes = false;
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
            include_exclude.map((item,index) =>{
                if(item.type===0){
                        includes=true;
                }
                if(item.type===1){
                        excludes=true;
                }
            });  

    }  


    //Additional Description
    if(additionalDesc.length!==''){
    addDescText = (
        additionalDesc.map(item => 
            item.type === 'text' ? (
            // <div className='row' key={item.heading}>
                <div className='col-sm-12' key={item.heading}>
                    <h5 className='Tempat mb-0'>{item.heading}</h5>
                    <p className='tempatText'>{item.items[0]}</p>
                </div>
            // </div>
            ) 
            : ''
        ));
     addDescCheck = (
        additionalDesc.map(item => 
            item.type === 'check_box' ? (
            <div className='col-sm-12' key={item.heading}>
                <h5 className='Perlengkapan mb-0'>{item.heading} {item.mandatory==='1'?  <i className='fa fa-asterisk requiredField'></i>:''}</h5>
                <ul className='pelam mb-4'>
                {
                    item.items.map((chk,index) =>(
                    <div key={chk} className="custom-control custom-checkbox">
                        <input type="checkbox" onClick={(e)=>this.handleCheckbox(e,item.heading)} className="custom-control-input" value={chk} id={`customCheck${index}`}/>
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
                <div className='col-sm-12' key={index}>
                    <h5 className='Kendaraan mb-3'>{item.heading} {item.mandatory==='1'?  <i className='fa fa-asterisk requiredField'></i>:''}</h5>
                    <div className='selectdiv'>
                        <select defaultValue='' onChange={(e) => this.handleSelectBox(e.target.value,item.heading)} className='Text-Box mx-md-4'>
                        <option disabled={true} value=''>Select option</option>
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
        // let {boxValue,selectValue,dateValue,timeValue} = this.state;
    }
    // console.log(this.state.boxValHeading);
    return (
        <div>
        <Header />
        {
        this.state.showPaxPage?
            <PaxDetails 
                productId={this.props.match.params.id} 
                boxValue={this.state.boxValHeading} 
                selectValue={this.state.selectValHeading} 
                dateValue={this.state.dateValue} 
                timeValue={this.state.timeValue}
                maxQuota={this.state.maxQuota}
                quota={this.state.quota}
                used_quota={this.state.used_quota}
                descriptionText={this.state.textValue}
                token={this.state.token}
            />
        : (this.state.showMultipleHrs?
            <MultipleHours 
                boxValue={this.state.boxValHeading} 
                productId={this.props.match.params.id} 
                dateValue={this.state.OperationDateNormal.date} 
                selectValue={this.state.selectValHeading}
                descriptionText={this.state.textValue}
                token={this.state.token}
            />
            :
      <div className='container-fluid mb-5'>
            {this.state.isLoading?
                <div className='row'>
                    <div className='col-md-1 offset-md-5 mt-5'>
                        <img className='loading' src='/images/loading.svg' alt='loading'/>
                    </div>
                </div>
            :
            <div className='row'>
                <div className='col-sm-9 cols9-center mainOuterDiv mt-5'>
                <div className='row mb-4 mt-5'>
                    <div className='col-sm-12'>
                        <NavLink to={`/${this.state.token}`} className='Select-another-activ'><i className='fa fa-angle-left'> </i> Select another activity</NavLink>
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
                                        disableArrowKeys={false}
                                        disableSwipe={false}
                                        showBullets={true}
                                        showThumbnails={false}
                                    />
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className='row px-md-5 mb-4 px-xs-1'>
                        <div className='col-sm-7'>
                            <h5 className="Location mb-4">LOCATION</h5>
                            {/* <p className='Ubud-Bali-Indonesi'>{mainCity}</p> */}
                            <ul className='locationList'>
                            {locs}
                            </ul>
                            <NavLink className='View-map' to="#">View map</NavLink>
                            {rates?
                            <h5 className='Rates mb-4 mt-5'>RATES</h5>
                            :''}
                            {rates}
                            {ratesAdditional}
                            <hr />

                            {incidence?
                            <div>
                            <h5 className='incidents mb-2'>INCIDENTS</h5>
                            <div className='Rectangle-10'>
                                <p className='IncidenceText'>{incidence}</p>
                            </div>
                            </div>
                            :''}
                            </div>

                        <div className='col-sm-5 calendarOuter d-none d-xs-none d-sm-none d-md-block'>
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
                        </div>
                        <div className='row mx-2'>
                          {detail_product.brief_description!==''?
                            <div className='col-sm-12'>
                            <h5 className='Description mb-4'>DESCRIPTION</h5>
                            <p className='DescriptionTexts'>{detail_product.brief_description}</p>
                            </div>
                          :''} 
                            {/* <div className='row mt-4'> */}
                            {includes?
                             <div className='col-sm-6'>
                                    <h5 className='Include mb-3'>INCLUDE</h5>
                                        <ul className='include'>
                                            {incl}
                                        </ul>
                                </div>
                                :''
                                }
                               {excludes?
                                <div className='col-sm-6'>
                                    <h5 className='Exclude mb-3'>EXCLUDE</h5>
                                    <ul className='exclude'>
                                        {excl}
                                    </ul>
                                </div>
                                :''}
                             {/* </div> */}
                             {addDescText=='' || addDescCheck=='' || addDescCheck==''?
                             ''
                             :
                             <div className='col-12'>
                                <h5 className='ADDITIONAL-DESCRIPTI mb-3 mt-4'>ADDITIONAL DESCRIPTION</h5>
                            </div>
                             }
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
                            {product.spesial_note?
                            <div className='col-sm-12'>
                            <h5 className='Special-Notes mt-5 mb-3'>SPECIAL NOTES</h5>
                            <p className='specialText'>{product.spesial_note}</p>
                            </div>
                            :''}
                        <div className='col-sm-12 d-xs-block d-sm-block d-md-none'>
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
                        </div>
                        </div>
                        </div>
                        
                    </div>         

                </div>
                 }
                <Alert stack={{limit: 1}} timeout={2000}/>
               
            </div>
            )}
            {this.state.isLoading?
            '':
            <Footer />}
            </div>
    )
  }
}

import React, { Component } from 'react'
import axios from 'axios';
import './ChooseActivity.css';
import { NavLink } from 'react-router-dom';
// import banner from '../../../public/images/place.jpg';
export default class ActivityDetail extends Component {
    state ={
     detail_product:[],
     locations:[],
     rates_pax_package:[],
     include_exclude:[],
     pax_details:[],
     additionalDesc:[],
     product:[]     
    }
    componentWillMount(){
        axios({
            method: 'get',
            // url: `https://api.trabo.co/partner/activity/detail/${this.props.match.params.id}`,
            url: `https://api.trabo.co/partner/activity/detail/A-09213790?date=2018-11-17&time=8:30 AM`,
        })
            .then((res) => {
                // console.log(res.data.response.detail_product.location[0].city)
                this.setState({
                    detail_product:res.data.response.detail_product,
                    product:res.data.response.product,
                    rates_pax_package:res.data.response.detail_product.rates_pax_package,
                    include_exclude:res.data.response.detail_product.include_exclude,
                    locations:res.data.response.detail_product.location,
                    pax_details:res.data.response.product.additional_description.pax_details,
                    additionalDesc:res.data.response.product.additional_description.description
                })

            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });
    }
  render() {
      let {detail_product,product,locations,rates_pax_package,include_exclude,additionalDesc} = this.state;
      let mainCity;
      let locs;
      let rates;
      let incl;
      let excl;
      let addDescText;
      let addDescList;
      let addDescCheck;
      let incidence = product.incidence;

      var items1= Object.assign({},additionalDesc[1])

    // var checkboxlist= [items1.items];
    // var checkbox= "";
    // for(var i= 0;i<checkboxlist[0].length; i++){
    //     checkbox.push(
    //     <div key={1} className="custom-control custom-checkbox">
    //         <input type="checkbox" className="custom-control-input" value={1} id={`customCheck${1}`}/>
    //         <label className="custom-control-label" htmlFor="customCheck1">{1}</label>
    //     </div>);
    // }
      
    

    // console.log(checkboxlist)

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
            <div className='row px-3' key={item.id}>
                <div className='col-sm-6'><p className='participants'>{item.maximum} Participants</p></div>
                <div className='col-sm-6'><p className='currency'>IDR {formatThousands(item.amount)}</p></div>
            </div>
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
        // console.log(additionalDesc);
    addDescText = (
        additionalDesc.map(item => 
            item.type === 'text' ? (
            <div key={item.heading}>
                <h5 className='Tempat px-4'>{item.heading}</h5>
                <p className='tempatText mx-4'>{item.items[0]}</p>
            </div>
            ) 
            : ''
        ));
    addDescList = (
        additionalDesc.map(item => 
            item.type === 'check_box' ? (
            <div key={item.heading}>
                <h5 className='Perlengkapan px-4'>{item.heading}</h5>
                <ul className='pelam mb-4'>
                {/* {checkbox} */}
                
                </ul>
            </div>
            ) : 
        ''
        ));

    addDescCheck = (
        additionalDesc.map(item => 
            item.type === 'check_box' ? (<li key={item.id}>{item.description}</li>) : 
        ''
        ));
    }
    return (
      <div className='container'>
            <div className='row'>
                <div className='col-sm-9 cols9-center mainOuterDiv'>
                    <div className='row mb-3'>
                        <div className='col-sm-12'>
                            <h2>{detail_product.name}</h2>
                            <div className='jumbotron' style={{ height:"240px" }}>
                                <h1 style={{ margin:"30px",color:"#a9a8a8",textAlign:"center" }}>Slider Images</h1>
                            </div>
                        </div> 
                    </div>
                    <div className='row px-5 mb-5'>
                        <div className='col-sm-6'>
                            <h5 className="Location mb-4">LOCATION</h5>
                            <p className='Ubud-Bali-Indonesi'>{mainCity}</p>
                            <ul className='locationList'>
                            {locs}
                            </ul>
                            <NavLink className='View-map px-4' to="#">view map</NavLink>
                        </div>
                        <div className='col-sm-6'>
                            <h5>Calendar</h5>
                        </div>
                    </div>         
                    <div className='row px-5 mb-5'>
                        <div className='col-sm-8'>
                            <h5 className='Rates mb-4'>Rates</h5>
                            {rates}
                            <hr />
                        </div>
                        <div className='col-sm-4'>
                            <h5>CALENDAR DATA</h5>
                        </div>
                    </div>   
                    {
                        incidence?
                        <div className='row px-5 mb-5'>
                        <div className='col-sm-8'>
                            <h5 className='incidents mb-2'>INCIDENTS</h5>
                            <div className='Rectangle-10'>
                                <p className='IncidenceText'>{incidence}</p>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            {/* <h5>Calendar</h5> */}
                        </div>
                    </div>
                    :''
                    }
                     
                    <div className='row px-5'>
                        <div className='col-sm-8'>
                            <h5 className='Description mb-4'>DESCRIPTION</h5>
                            <p className='DescriptionTexts'>{detail_product.brief_description}</p>
                        </div>
                        <div className='col-sm-4'>
                            {/* <h5>Calendar</h5> */}
                        </div>
                    </div> 
                    <div className='row mb-5'>
                        <div className='col-sm-8'>
                            <div className='row px-5'>
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
                        </div>
                        <div className='col-sm-4'>
                            {/* <h5>Calendar</h5> */}
                        </div>
                    </div>  
                    <div className='row px-5 mb-5'>
                        <div className='col-sm-8'>
                            <h5 className='ADDITIONAL-DESCRIPTI mb-3'>ADDITIONAL DESCRIPTION</h5>
                            {
                                addDescText?addDescText:''
                            }
                           {
                               addDescList
                           }
                            <h5 className='Kendaraan mx-4 mb-3'>Kendaraan</h5>
                            <div className='selectdiv'>
                                <select className='Text-Box mx-4'>
                                    <option className='Select-option'>Select Option</option>
                                    <option className='Select-option'>Select Option</option>
                                    <option className='Select-option'>Select Option</option>
                                    <option className='Select-option'>Select Option</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-sm-4'>
                            {/* <h5>Calendar</h5> */}
                        </div>
                    </div>   
                    <div className='row px-5'>
                        <div className='col-sm-8'>
                            <h5 className='Special-Notes'>SPECIAL NOTES</h5>
                            <p className='specialText'>{product.spesial_note}</p>
                        </div>
                        <div className='col-sm-4'>
                            {/* <h5>Calendar</h5> */}
                        </div>
                    </div>                   
                </div>
            </div>
      </div>
    )
  }
}

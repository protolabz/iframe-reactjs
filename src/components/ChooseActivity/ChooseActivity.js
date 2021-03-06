import React, { Component } from 'react'
import axios from 'axios';
import './ChooseActivity.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import { NavLink } from 'react-router-dom';
export default class ChooseActivity extends Component {

        state = {
            listProducts:[],
            firstProduct:[],
            secondProduct:[],
            thirdProduct:[],
            isLoading:true,
            token:this.props.match.params.token
            }
            
    componentWillMount(){
        // Get All List data using axios
        axios({
            method: 'get',
            url: `https://api.trabo.co/partner/activity/${this.props.match.params.token}`,
        })
            .then((res) => {
                var details = res.data.response,first=[],second=[],third=[],listPro = [];
                details.map(x=>{

                    if(x.order_frondend===1){
                        first.push(x)
                    }
                    if(x.order_frondend===2){
                        second.push(x)
                    }
                    if(x.order_frondend===3){
                        third.push(x)
                    }
                    if(x.order_frondend!==1 && x.order_frondend!==2 && x.order_frondend!==3){
                        listPro.push(x)
                    }
                })
                this.setState({
                    listProducts:listPro,
                    firstProduct:first,
                    secondProduct:second,
                    thirdProduct:third,
                    isLoading:false
                })

            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });

    }


  render() {
      var {listProducts,firstProduct,secondProduct,thirdProduct} = this.state;
    //   listProducts = listProducts.splice(3,listProducts.length);
      var secondAndThird,firstPro,lists;
      if(firstProduct.length>0){
          firstPro = (
              <div className='row mt-5 pt-5'>
            <div className='col-sm-12'>
                <div className='Overlay fullSection' style={{ backgroundImage: "url('https://res.cloudinary.com/trabo/"+firstProduct[0].resource+"')"}}>
                    <p className='titleText'>{ firstProduct[0].name }</p>
                    <p className='descriptionText'>{ firstProduct[0].brief_description }</p>
                    <NavLink className='bookNow' to={`product-detail/${firstProduct[0].code}/${this.state.token}`}>Book Now</NavLink>
                </div>
            </div>
        </div>
          )
        }
        if(secondProduct.length>0 && thirdProduct.length>0){
            secondAndThird =(
                <div className='row'>
                    <div className='col-sm-6 mb-4'>
                        <div className='OverlayTwoCols fullSection' style={{ backgroundImage: "url('https://res.cloudinary.com/trabo/"+secondProduct[0].resource+"')"}}>
                            <p className='titleTextTwoCols'>{ secondProduct[0].name }</p>
                            {/* <p className='descriptionTextTwoCols'>{ secondProduct[0].brief_description } Central to the Java’s heritage, the city is where the Island’s culture is at its purest</p> */}
                            <NavLink className='bookNow' to={`product-detail/${secondProduct[0].code}/${this.state.token}`}>Book Now</NavLink>
                        </div>
                    </div>
                    
                    <div className='col-sm-6'>
                        <div className='OverlayTwoCols fullSection' style={{ backgroundImage: "url('https://res.cloudinary.com/trabo/"+thirdProduct[0].resource+"')"}}>
                            <p className='titleTextTwoCols'>{ thirdProduct[0].name }</p>
                            {/* <p className='descriptionTextTwoCols'>{ thirdProduct[0].brief_description }</p> */}
                            <NavLink className='bookNow' to={`product-detail/${thirdProduct[0].code}/${this.state.token}`}>Book Now</NavLink>
                        </div>
                     </div>
                </div>
        )
    }
    if(listProducts.length>0){
        lists = (
            listProducts.map((item, index) =>(
                <div className='col-sm-4 mb-4' key={index}>
                    <div className='OverlayThreeCols fullSection' style={{ backgroundImage: "url('https://res.cloudinary.com/trabo/"+item.resource+"')"}}>
                        <p className='titleTextThreeCols mb-3'>{item.name}</p>
                        <br/>
                        {/* <p className='descriptionTextThreeCols'>{item.brief_description}</p> */}
                        {/* <br/> */}
                        <NavLink className='bookNow' to={`product-detail/${item.code}/${this.state.token}`}>Book Now</NavLink>
                    </div>
                </div>
                ))
        );
    }   
    return (
      <div>
      {this.state.isLoading?'':
      <Header />
    }
      <div className='container-fluid'>
       {this.state.isLoading?
            <div className='row'>
                <div className='col-md-1 offset-md-5 mt-5'>
                    <img className='loading' src='/images/loading.svg' alt='loading'/>
                </div>
            </div>
        :
        <div className='row' style={{ marginLeft:"0px",marginRight:"0px" }}>
            <div className='col-sm-8 offset-sm-2 noPadding'>
                {firstPro}
                <br/>
               {secondAndThird}
                <br/>
                <div className='row'>
                {lists}
                </div>
            {this.state.isLoading?
            '':
            <Footer />}
            </div>
        </div>
            
        }

      </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import axios from 'axios';
import './ChooseActivity.css';
import { NavLink } from 'react-router-dom';
export default class ChooseActivity extends Component {

        state = {
            listProducts:[],
            firstProduct:[],
            secondProduct:[],
            thirdProduct:[],
            isLoading:true
            }
            
    componentWillMount(){

        // Get All List data using axios
        axios({
            method: 'get',
            url: 'https://api.trabo.co//partner/activity/popo11',
        })
            .then((res) => {
                this.setState({
                    listProducts:res.data.response,
                    firstProduct:res.data.response[0],
                    secondProduct:res.data.response[1],
                    thirdProduct:res.data.response[2],
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
      listProducts = listProducts.splice(3,listProducts.length);
      const lists = (
                listProducts.map((item, index) =>(
                 <div className='col-sm-4 mb-4' key={index}>
                     <div className='OverlayThreeCols fullSection' style={{ backgroundImage: "url('https://res.cloudinary.com/trabo/"+item.resource+"')"}}>
                         <p className='titleTextThreeCols'>{item.name.replace(/\b\w/g, l => l.toUpperCase())}</p>
                         <br/>
                         <p className='descriptionTextThreeCols'>{item.brief_description}</p>
                         <br/>
                         <NavLink className='bookNow' to={`product-detail/${item.code}`}>Book Now</NavLink>
                     </div>
                 </div>
                 ))
      );
    return (
      <div className='container noPadding mainOuterDiv'>
       {this.state.isLoading?
            <img className='loading' src='/images/loading.svg' alt='loading'/>
        :
        <div className='row'>
            <div className='col-sm-8 offset-sm-2 noPadding'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='Overlay fullSection' style={{ backgroundImage: "url('https://res.cloudinary.com/trabo/"+firstProduct.resource+"')"}}>
                            <p className='titleText'>{ firstProduct.name }</p>
                            <p className='descriptionText'>{ firstProduct.brief_description }</p>
                            <NavLink className='bookNow' to={`product-detail/${firstProduct.code}`}>Book Now</NavLink>
                        </div>
                    </div>
                </div>    
                <br/>
                <div className='row'>
                    <div className='col-sm-6 mb-4'>
                        <div className='OverlayTwoCols fullSection' style={{ backgroundImage: "url('https://res.cloudinary.com/trabo/"+secondProduct.resource+"')"}}>
                            <p className='titleTextTwoCols'>{ secondProduct.name }</p>
                            <p className='descriptionTextTwoCols'>{ secondProduct.brief_description } Central to the Java’s heritage, the city is where the Island’s culture is at its purest</p>
                            <NavLink className='bookNow' to={`product-detail/${secondProduct.code}`}>Book Now</NavLink>
                        </div>
                    </div>
                    
                    <div className='col-sm-6'>
                        <div className='OverlayTwoCols fullSection' style={{ backgroundImage: "url('https://res.cloudinary.com/trabo/"+thirdProduct.resource+"')"}}>
                            <p className='titleTextTwoCols'>{ thirdProduct.name }</p>
                            <p className='descriptionTextTwoCols'>{ thirdProduct.brief_description }</p>
                            <NavLink className='bookNow' to={`product-detail/${thirdProduct.code}`}>Book Now</NavLink>
                        </div>
                     </div>
                </div>
                <br/>
                <div className='row'>
                {lists}
                </div>
            </div>
        </div>
        }
      </div>
    )
  }
}

import React, { Component } from 'react'
import  { BrowserRouter as Router,  Route, Switch} from 'react-router-dom';
import ChooseActivity from './components/ChooseActivity/ChooseActivity';
import ActivityDetail from './components/ChooseActivity/ActivityDetail';
import MultipleHours from './components/ChooseActivity/MultipleHours';
import Paxdetails from './components/PaxDetails/PaxDetails';
import Payment from './components/PaymentProcess/Payment';
import ListBooking from './components/ListBooking/ListBooking';
// import CardMain from './components/PaymentProcess/CardMain';
import Voucher from './components/Vouchers/vouchers';

export default class componentName extends Component {
  render( ){
    return (
        <Router>
            <Switch>
                <Route exact path="/:token" component={ChooseActivity}/>
                <Route path="/product-detail/:id/:token" component={ActivityDetail}/>
                <Route path="/select-hours/:params/:date" component={MultipleHours}/>
                <Route path="/pax-details/:time/:date/:checked/:selected/:id" component={Paxdetails}/>
                <Route path="/payment" component={Payment}/>
                <Route path="/voucher" component={Voucher}/>
                <Route path="/booking" component={ListBooking}/>
            </Switch>
        </Router>
     
    )
  }
}


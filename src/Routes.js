import React, { Component } from 'react'
import  { BrowserRouter as Router,  Route, Switch} from 'react-router-dom';
import ChooseActivity from './components/ChooseActivity/ChooseActivity';
import ActivityDetail from './components/ChooseActivity/ActivityDetail';
import MultipleHours from './components/ChooseActivity/MultipleHours';
export default class componentName extends Component {
  render() {
    return (
     
        <Router>
            <Switch>
                <Route exact path="/" component={ChooseActivity}/>
                <Route exact path="/product-detail/:id" component={ActivityDetail}/>
                <Route exact path="/select-hours/:params/:date" component={MultipleHours}/>
            </Switch>
        </Router>
     
    )
  }
}

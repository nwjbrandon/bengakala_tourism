import React from 'react';
import Checkout from './Checkout'
import './Accomodations.module.css'
import {MuiThemeProvider ,createMuiTheme} from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick utils
import MomentUtils from '@date-io/moment';

class Accomodations extends React.Component{


  constructor(props) {
    super(props);
    this.state = {
      personalDetails: {
        firstName: "",
        lastName:"",
        email: "",
        country: "",
      },
      tripDetails:{
        checkIn: null,
        checkOut: null,
        breakfast: false,
        lunch :false ,
        dinner :false,
        numberMales: 0,
        numberFemales: 0,
        numberVans: 0,
        numberCars: 0,
        numberBikes: 0
      }

    }
  }
  onFNChangeHandler = (val) => {
    const tempcpyPersonal = {...this.state.personalDetails};
    tempcpyPersonal.firstName = val;
    this.setState({personalDetails: tempcpyPersonal});
  }

  onLNChangeHandler = (val) => {
    const tempcpyPersonal = {...this.state.personalDetails};
    tempcpyPersonal.lastName = val;
    this.setState({personalDetails: tempcpyPersonal});
  }
  onEChangeHandler = (val) => {
    const tempcpyPersonal = {...this.state.personalDetails};
    tempcpyPersonal.email = val;
    this.setState({personalDetails: tempcpyPersonal});
  }
  onCChangeHandler = (val) => {
    const tempcpyPersonal = {...this.state.personalDetails};
    tempcpyPersonal.country = val;
    this.setState({personalDetails: tempcpyPersonal});
  }


  render(){
    return (
      <div className = "App">
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Checkout
            alldata = {{
              personalDetails: {
                ...this.state.personalDetails ,
                onFNChangeHandler:this.onFNChangeHandler,
                onLNChangeHandler:this.onLNChangeHandler,
                onEChangeHandler:this.onEChangeHandler,
                onCChangeHandler:this.onCChangeHandler
              } , tripDetails: {...this.state.tripDetails}}}
            />
        </MuiPickersUtilsProvider>

      </div>
    );
  }

}

export default Accomodations;

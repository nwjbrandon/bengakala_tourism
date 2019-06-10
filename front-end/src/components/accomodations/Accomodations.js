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
    // this.state = {
    //   personalDetails: {
    //     firstName: "",
    //     lastName:"",
    //     email: "",
    //     country: "",
    //   },
    //   tripDetails:{
    //     checkIn: null,
    //     checkOut: null,
    //     breakfast: false,
    //     lunch :false ,
    //     dinner :false,
    //     numberMales: 0,
    //     numberFemales: 0,
    //     numberVans: 0,
    //     numberCars: 0,
    //     numberBikes: 0
    //   }
    //
    // }
  }


  render(){
    return (
      <div className = "App">
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Checkout/>
        </MuiPickersUtilsProvider>

      </div>
    );
  }

}


export default (Accomodations);

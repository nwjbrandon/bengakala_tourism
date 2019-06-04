import React from 'react'
import Datepicker from './Datepicker'

const Datespicker = () =>{
  return(
    <React.Fragment>
      <Datepicker datelabel = "Check-In Date" />
      <Datepicker datelabel = "Check-Out Date" />
    </React.Fragment>
  );
}

export default Datespicker;

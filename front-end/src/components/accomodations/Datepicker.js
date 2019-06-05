import React from 'react'
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker} from '@material-ui/pickers'


const Datepicker = (props) =>{
  return(

    <Grid item xs={12} sm={6}>
      <KeyboardDatePicker
        label={props.datelabel}
        // disablePast = {true}
        placeholder="10/10/2018"
        value={new Date()}
        onChange={date =>{}}
        format="DD/MM/YYYY"
        shouldDisableDate = {(date) => {
          return (new Date()  >= date);
       }}
      />
    </Grid>

  );
}

export default Datepicker;

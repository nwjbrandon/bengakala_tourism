import React from 'react';
import Checkout from './Checkout'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick utils
import MomentUtils from '@date-io/moment';

class Accomodations extends React.Component {


  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Checkout />
        </MuiPickersUtilsProvider>

      </div>
    );
  }

}


export default (Accomodations);

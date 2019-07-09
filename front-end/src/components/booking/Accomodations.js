import React from 'react';
import Checkout from './Checkout'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick utils
import MomentUtils from '@date-io/moment';

class Accommodations extends React.Component {
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


export default (Accommodations);

import React from 'react'
import Calendar from 'react-calendar';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';

class ConfirmationScreen extends React.Component {

  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div>
        HEllo
      </div>
    );
  }
}

export default ConfirmationScreen

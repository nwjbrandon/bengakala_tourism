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
        <CalendarHeatmap
          showWeekdayLabels
          tooltipDataAttrs={value => {
            console.log(value)
            return {
              'data-tip': `${value.date}`,
            };
          }}
          startDate={new Date('2019-01-01')}
          endDate={new Date('2019-12-31')}
          values={[
            { date: '2019-01-01' },
            { date: '2019-01-22' },
            { date: '2019-01-30' },
            // ...and so on
          ]}
          onClick={value => alert(`Clicked on value with count: ${value}`)}
        />
        <ReactTooltip />
      </div>
    );
  }
}

export default ConfirmationScreen

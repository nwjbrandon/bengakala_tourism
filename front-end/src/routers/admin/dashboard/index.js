import React from 'react';
import API from '../../../api';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    }
  }
  componentDidMount() {
    API.get('/admin/dashboard').then(res => {
      this.setState({ data: res });
    })
  }
  render() {
    return (
      <div>
        <h1>{ this.state.data }</h1>
      </div>
    )
  }
}

export default Dashboard;

import React from 'react';
import API from '../../api';
import AccomodationsForm from './Components/Accomodations'

class Accomodation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    }
  }
  componentDidMount() {
    API.get('/accommodation').then(res => {
      this.setState({ data: res });
    })
  }
  render() {
    return (
      <AccomodationsForm />
    )
  }
}

export default Accomodation

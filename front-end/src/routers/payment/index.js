import React from 'react'
import axios from 'axios'

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page_name: '',
    }
  } 
  componentDidMount() {
    axios.get('http://localhost:3001/payment/hello')
      .then(res => {
        this.setState({ page_name: res.data.info });
      })
      .catch(res => {
        if (res instanceof Error) {
          console.log(res.message);
        } else {
          console.log(res.data);
        }
      });
  }
  render() {
    return (
      <div>
      <h1>{ this.state.page_name }</h1>
      </div>
    )
  }
}

export default Payment

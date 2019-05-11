import React from 'react'
import axios from 'axios'

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    }
  } 
  componentDidMount() {
    axios.get('http://localhost:3001/api/about')
      .then(res => {
        this.setState({ data: res.data });
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
      <h1>{ this.state.data }</h1>
      </div>
    )
  }
}

export default About

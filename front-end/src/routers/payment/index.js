import React from 'react';
import API from '../../api';


const getData = async(req, res) => {
  return req.body
}

class Payment extends React.Component {
   
  componentDidMount() {
    const transaction_data = getData();

    console.log(transaction_data)
    // API.post('/notification/post') {
      
    }
  }

}

export default Payment

import React from 'react';
import API from '../../api';
//import './css/test.css';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //data: '',
      address:'National University of Singapore, Kent Ridge',
      mycontact:'(+65) Brandon',
      name: '',
      email:'',
      contact:'',
      subject:'',
      message:'',
      mailSent: false,
      error: null
    }
  }

  handleFormSubmit( event ) {
    event.preventDefault();
    console.log(this.state);
  }

  componentDidMount() {
    API.get('/contact').then(res => {
      this.setState({ data: res });
    })
  }

  render() {
    return (
      //<div>
      //<h1>{ this.state.data }</h1>
      <div className="App">

      <h2>Address</h2>
      <h3>{this.state.address}</h3>
      <h2>Contact Us</h2>
      <h3>{this.state.mycontact}</h3>

      <div>
      <form action = "#">

      <label>Your name: </label>
      <input type="text" id="name" name="name" placeholder="Name"
        value = {this.state.name}
        onChange = {event => this.setState({ name: event.target.value })}
       />

      <label>Your email: </label>
      <input type="email" id="email" name="email" placeholder="Email"
        value = {this.state.email}
        onChange={event => this.setState({ email: event.target.value })}
      />

      <label>Contact No.: </label>
      <input type="number" id="contact" name="contact" placeholder="Phone Number"
        value = {this.state.contact}
        onChange={event => this.setState({ contact: event.target.value })}
      />

      <label>Subject of the Message: </label>
      <input type="text" id="subject" name="subject" placeholder="Subject"
        value = {this.state.subject}
        onChange={event => this.setState({ subject: event.target.value })}
      />
      <textarea id="message" name="message" placeholder="Your Message"
        value = {this.state.message}
        onChange={event => this.setState({ message: event.target.value })}
      ></textarea>
      <input type="submit" value="Submit" />

      </form>
      </div>
      </div>
      //</div>
    );
  }
}

export default Contact

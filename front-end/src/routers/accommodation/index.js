import React from 'react';
import API from '../../api';
import AccomodationsForm from '../../components/accomodations/Accomodations'
import Slideshow from '../../components/accomodations/Slideshow'
import bg from '../../components/accomodations/images/balivillage.jpg'
import Tutorial from '../../components/accomodations/TutorialPage'
import Navbar from '../../components/navbar'

import { createStore } from 'redux'
import reducer from '../../reducers/accomodation'
import { Provider } from 'react-redux'

const store = createStore(reducer);

class Accomodation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      textArray : [
        {title : "This is title 1 " , text: "This is anulrejrfbksbdkcjaksjcbkasckjabsck long description 1. It is long so that i can see whether it still looks good on the website."},
        {title : "This is title 2", text: "This is description 2"},
        {title :"This is title 3" , text: "This is description 3"},
        {title : "This is title 4", text: "This is description 4"},
        {title : "This is title 5" , text: "This is description 5"},
        {title : "This is title 6" , text: "This is description 6"},
      ]
    }
  }
  componentDidMount() {
    API.get('/accommodation').then(res => {
      console.log("RES");
      console.log(res);
      dispatch({type:"EXCLUDE_DATES" , payload:res})
      // this.setState({ data: res });
    })
  }
  render() {



    var divStyle = {
      padding: 50 ,
      backgroundPosition: "top",
      backgroundRepeat: "initial",
      backgroundSize: "cover",
      // height:"250vh",
      width:"100%",
      backgroundImage: `url(${bg})`,
      textAlign:"left"

  };
    return (
      <Provider store = {store}>
        <div style = {divStyle}>
          <AccomodationsForm  />
          <Slideshow textArr = {this.state.textArray} />
        </div>
      </Provider>

    )
  }
}

export default Accomodation

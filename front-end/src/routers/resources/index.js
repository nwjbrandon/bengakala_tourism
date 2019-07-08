import React from 'react';
import Tutorial from '../../components/resources/VideoTutorials'
import Navbar from "../../components/navBar/navbar";

class TutorialPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    }
  }

  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }

  render() {

    const divStyle = {
      padding: "2%",
      width: "auto",
      height: "150vh",
      textAlign: "left",
      justifyContent: "center"
    };

    const { data } = this.props;
    console.log('insde resource');
    console.log(data);
    console.log('insde resources');

    return (
      <div>
        <Navbar />
        <div style={divStyle}>
          <Tutorial data={data} />
        </div>
      </div>
    )
  }
}

export default TutorialPage

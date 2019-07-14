import React from 'react';
import Tutorial from '../../components/explore/VideoTutorials'
import Navbar from "../../components/navBar/navbar";
import SuccessToast from "../../components/snackBar/successSnackBar.container";
import ErrorToast from "../../components/snackBar/errorSnackBar.container";

class TutorialPage extends React.Component {
  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }

  render() {
    const divStyle = {
      padding: "0%",
      width: "auto",
      minHeight: "100vh",
      textAlign: "left",
      justifyContent: "center",

    };

    const { data } = this.props;
    return (
      <div style={{ background: "#ffffff", height: "auto" }}>
        <Navbar />
        <div style={divStyle}>
          <Tutorial data={data} />
        </div>
        <SuccessToast />
        <ErrorToast />
      </div>
    )
  }
}

export default TutorialPage

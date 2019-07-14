import React, { Component } from 'react';
import Background from '../../components/home/background'
import Content from '../../components/home/content.container'
import SuccessToast from "../../components/snackBar/successSnackBar.container";
import ErrorToast from "../../components/snackBar/errorSnackBar.container";

class App extends Component {
  render() {
    return(
      <div>
          <Background />
          <Content />
          <SuccessToast />
          <ErrorToast />
      </div>
    );
  }
}

export default App

import React, { Component } from 'react';
import Background from '../../components/home/background.container'
import Content from '../../components/home/content.container'
import SuccessToast from "../../components/snackBar/successSnackBar.container";
import ErrorToast from "../../components/snackBar/errorSnackBar.container";

class App extends Component {

  isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);


  render() {
    return (
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

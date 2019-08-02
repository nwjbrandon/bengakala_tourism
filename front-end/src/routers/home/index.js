import React, { Component } from 'react';
import Background from '../../components/home/background.container'
import Content from '../../components/home/content.container'
import SuccessToast from "../../components/snackBar/successSnackBar.container";
import ErrorToast from "../../components/snackBar/errorSnackBar.container";
import ImageCarousell from '../../components/home/ImageCarousell/ImageCarousell'
class App extends Component {



  render() {
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    const isFirefox = typeof InstallTrigger !== 'undefined';

    if (!isChrome && !isFirefox) {
      window.confirm('Some Features of this website only work on Chrome or Firefox web browsers. Please Consider switching for a better experience.');
    }

    return (
      <div>
        <Background />
        <Content />
        <ImageCarousell />
        <SuccessToast />
        <ErrorToast />
      </div>
    );
  }
}

export default App

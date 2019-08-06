import React, { Component } from 'react';
import { isChrome, isFirefox } from 'react-device-detect';
import SEO from '../../components/seo';
import Background from '../../components/home/background.container'
import Content from '../../components/home/content.container'
import SuccessToast from "../../components/snackBar/successSnackBar.container";
import ErrorToast from "../../components/snackBar/errorSnackBar.container";
import ImageCarousell from '../../components/home/ImageCarousell/ImageCarousell'
import { seoTags } from '../../assets/data/seo';


class App extends Component {



  render() {
    if (!isChrome && !isFirefox) {
      window.confirm('Some Features of this website only work on Chrome or Firefox web browsers. Please Consider switching for a better experience.');
    }

    return (
      <div>
        <SEO
          title={seoTags.home.title}
          description={seoTags.home.description}
          keywords={seoTags.home.keywords}
        />
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

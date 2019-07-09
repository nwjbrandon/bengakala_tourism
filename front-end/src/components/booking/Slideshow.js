import React from 'react';
import { Slide } from 'react-slideshow-image';
import Eachslide from './EachSlide'

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true
}

const Slideshow = (props) => {

  var req = require.context("./slideshowimages", true, /.*\.jpg$/);
  const jpgs = req.keys().map( path => req ( path ) )
  // console.log(img1);
  let i = -1;
  const AllSlides = jpgs.map((imgurl) => {
    console.log(imgurl);
    i++;
    i = i%6;
    return (<Eachslide key = {props.textArr[i].title} title = {props.textArr[i].title} text = {props.textArr[i].text} img = {imgurl}/>);
  });

    var divStyle = {
        height:"70%",
        width:"70%",
        textAlign: "centre",
        marginLeft : "auto",
        marginRight : "auto",
        marginTop: "150px",
        paddingTop: "10px",
        paddingRight: "50px",
        paddingLeft: "50px",
        paddingBottom: "30px",
        background: "#21212170",
        borderRadius: "40px"
          // paddingTop: "66%",

    };

    var title =  {
        color: "",
        textAlign: "centre",
        marginBottom: "40px",
        fontSize: "40px"
    }

    var h1titletag = {
      textAlign: "center",
      /* font-size: 1em; */
      marginBottom: "10px",
      font: "30px arial, sans-serif",
      fontWeight: "bold",
      color: "white",
      textShadow: "0 1px 2px rgba(black,.15)",
    }
    return (
      <div style = {divStyle}>
        <div style = {title}><h1 style= {h1titletag}>Here are some things to see!</h1></div>
        <Slide {...properties}>
          {AllSlides}
        </Slide>
      </div>

    )
}

export default Slideshow

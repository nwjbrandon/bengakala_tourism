import React from 'react';

const Eachslide = (props) => {

  var container = {
    backgroundColor: "green",
    position: "relative",
    width: "100%",
    paddingTop: "56.25%" /* 16:9 Aspect Ratio */,
    backgroundImage: `url(${props.img})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }

  var textContainer = {
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    textAlign: "center",
    fontSize: "25px",
    color: "white",
    paddingTop: "2%"
  }
  var title = {
    background: "#21212180",
    color: "#69F0AE",

    paddingBottom: "2%",
  }

  var description = {
    background: "#21212180",
    color: "white",

  }

  return (
    <div
      // className="each-slide"
      style={container}
    >

      <div style={textContainer}>
        <div style={title} >{props.title}</div>
        <div style={description} ><p style={description}>{props.text}</p></div>

      </div>

    </div>


  )
}

export default Eachslide

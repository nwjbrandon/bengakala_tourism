import React from 'react'

export default (props) => {

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);


  React.useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    setWindowWidth(window.innerWidth);
  }, []);

  const videoHeight = windowWidth > 1000 ? 40 : (windowWidth > 600 ? 55 : 65);

  return (

    <iframe
      style={{
        position: "center",
        width: "100%",
        height: `${videoHeight}vw`
      }}
      title={props.youtubeId}
      src={'https://www.youtube.com/embed/' + props.youtubeId}
      frameBorder="0"
    />

  );
};

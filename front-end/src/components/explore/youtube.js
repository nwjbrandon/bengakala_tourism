import React from 'react'

export default (props) => {
  return (
    <div>
      <iframe
        style={{
          width: "100%",
          height: '50vh',
        }}
        title={props.youtubeId}
        src={'https://www.youtube.com/embed/' + props.youtubeId}
        frameBorder="0"
      />
    </div>
  );
};

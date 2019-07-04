import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Youtube from './youtube'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  rootVal: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: "#21212180",
    padding: "0px",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  root: {
    width: '100%',
    flexGrow: 1
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "white"
  },
  expansion: {
    background: "#11111170",
  },
  buttonFull: {
    width: '100%',
    height: '100%',
    flexGrow: 1,
    color: "white",
    background: "#00000090"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    textAlign: "center",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px",
    paddingBottom: "56.25%" /* 16:9 */,
    paddingTop: 0,
    height: 0,
  },
  videoDescription: {
    background: "#111111",
    color: "white",
    width: "auto",
    height: "auto",
    textAlign: "center",
    fontSize: "30px",
    fontStyle: "bold",
    padding: "10px",
  }
}));


function SimpleExpansionPanel() {
  const classes = useStyles();

  const [videoId, setVideoId] = useState(0);

  const videoDetails = [
    {
      title: "Tutorial 1",
      videoLink: "SzHo_DP4-8Q",
      videoDescription: "Rick and Morty go on a fun Journey"
    },
    {
      title: "Tutorial 2",
      videoLink: "TyCWscXbBvA",
      videoDescription: "Rick and Morty get Shwifty"
    },
    {
      title: "Tutorial 3",
      videoLink: "qn_TimF_J8Y",
      videoDescription: "Morty is going on an adventuree"
    },
    {
      title: "Tutorial 4",
      videoLink: "SzHo_DP4-8Q",
      videoDescription: "An Awesome Video about an old man"
    },
    {
      title: "Tutorial 5",
      videoLink: "TyCWscXbBvA",
      videoDescription: "Get Swifty. I am MR BULL DOg"
    }

  ];


  const title = {
    color: "white",
    textAlign: "centre",
    marginBottom: "40px",
    fontSize: "50px",
    background: "#00000099",
    borderRadius: "5px",
    padding: "10px"
  };

  const h1titletag = {
    textAlign: "center",
    /* font-size: 1em; */
    marginBottom: "10px",
    font: "20px arial, sans-serif",
    color: "white",
    textShadow: "0 1px 2px rgba(black,.15)",
  };

  const videoTitleList = videoDetails.map((item, index) => {
    return (
      <Button key={index} onClick={() => setVideoId(index)} className={classes.buttonFull}>{item.title}</Button>
    );
  });

  return (
    <div className={classes.root}>
      <div style={title}><h1 style={h1titletag}>Browse through our video series to learn our very own Sign Language : The Kolok Kolok!!</h1></div>

      <div className={classes.videoDescription}>{videoDetails[videoId].videoDescription}</div>
      <div className={classes.container}>
        <Grid style={{ height: "100%" }} container spacing={0}>
          <Grid item xs={12} sm={12} md={9}>
            <div className={classes.demo}>
              <Youtube youtubeId={videoDetails[videoId].videoLink} />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <div className={classes.demo}>
              {videoTitleList}
            </div>
          </Grid>
        </Grid>
      </div>

    </div>
  );
}

export default SimpleExpansionPanel;

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
    marginBottom: "2%",
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
    fontStyle: "bold",
  }
}));


function SimpleExpansionPanel({ data }) {
  const classes = useStyles();

  const [videoId, setVideoId] = useState(0);

  const title = {
    color: "white",
    textAlign: "center",
    background: "#00000099",
    padding: "5px",
    height: "auto",
    fontSize: '2.5vw',
  };

  const videoTitleList = data.map((item, index) => {
    return (
      <Button key={index} onClick={() => setVideoId(index)} className={classes.buttonFull}>{item.title}</Button>
    );
  });

  return (
    <div className={classes.root}>
      {
        data.length === 0
          ? <div />
          :
          <div>
            <Typography variant="h4" style={title}>Learn more about our very own culture, history, and sign language : The Kata Kolok!!</Typography>
            <Typography variant="h5" className={classes.videoDescription}>{data[videoId].videoDescription}</Typography>
            <div className={classes.container}>
              <Grid style={{ height: "100%" }} container spacing={0}>
                <Grid item xs={12} sm={12} md={9}>
                  <div className={classes.demo}>
                    <Youtube youtubeId={data[videoId].videoLink} />
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
      }
    </div>
  );
}

export default SimpleExpansionPanel;

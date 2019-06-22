import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Youtube from './youtube'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'

  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "white"
  },
  expansion: {
    background: "#11111170",
  }
}));


function SimpleExpansionPanel() {
  const classes = useStyles();

  const videoDetails = [
    {
      title: "Tutorial 1",
      videoLink: "SzHo_DP4-8Q"
    },
    {
      title: "Tutorial 2",
      videoLink: "TyCWscXbBvA"
    },
    {
      title: "Tutorial 3",
      videoLink: "qn_TimF_J8Y"
    },
    {
      title: "Tutorial 4",
      videoLink: "GJfsbhJY8gk"
    },
    {
      title: "Tutorial 5",
      videoLink: "ZsBz_Q62hHk"
    },
    {
      title: "Tutorial 6",
      videoLink: "NV7bXzZIR3k"
    }
  ]


  var title = {
    color: "",
    textAlign: "centre",
    marginBottom: "40px",
    fontSize: "50px",
    background: "#21212190",
    borderRadius: "5px"
  }

  var h1titletag = {
    textAlign: "center",
    /* font-size: 1em; */
    marginBottom: "10px",
    font: "20px arial, sans-serif",
    color: "white",
    textShadow: "0 1px 2px rgba(black,.15)",
  }



  const videos = videoDetails.map((eachVideo) => {
    return (
      <ExpansionPanel key={eachVideo.title} className={classes.expansion}>
        <ExpansionPanelSummary
          className={classes.expansion}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{eachVideo.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{
            paddingBottom: "56.25%" /* 16:9 */,
            paddingTop: 25,
            height: 0, textAlign: "center", width: "100%", marginLeft: "auto", marginRight: "auto", marginBottom: "20px"
          }}>
            <Youtube youtubeId={eachVideo.videoLink} />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  });

  return (
    <div className={classes.root}>
      <div style={title}><h1 style={h1titletag}>Browse through our video series to learn our very own Sign Language : The Kolok Kolok!!</h1></div>
      {videos}
    </div>
  );
}

export default SimpleExpansionPanel;

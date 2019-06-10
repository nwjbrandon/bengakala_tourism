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
    background:"#11111170",
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
  const videos = videoDetails.map((eachVideo)=>{
    return (
      <ExpansionPanel key = {eachVideo.title} className={classes.expansion}>
        <ExpansionPanelSummary
          className={classes.expansion}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{eachVideo.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style = {{height: "400px" ,textAlign:"center", width: "100vh" , marginLeft: "auto", marginRight: "auto" ,marginBottom:"50px"}}>
            <Youtube youtubeId = {eachVideo.videoLink}/>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  });

  return (
    <div className={classes.root}>
      {videos}
    </div>
  );
}

export default SimpleExpansionPanel;

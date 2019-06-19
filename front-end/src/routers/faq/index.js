import React from 'react';
import API from '../../api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { typography } from '@material-ui/system';
import bg from './pics/faqbackground.jpg';
import bigbrandon from './pics/thebeast.jpg';
import Navbar from '../../components/navbar'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    height: "100%",
    backgroundImage: `url(${bg})`,
    backgroundPosition: "top",
    backgroundRepeat: "initial",
    backgroundSize: "cover",
    width:"100%",
    textAlign:"left",
    paddingTop: 40
  },
  inline: {
    display: 'inline',
  },
  paper: {
    padding: theme.spacing(3),
    height: '100%',
    [theme.breakpoints.up(500 + theme.spacing(6))]: {
    width: '45%',
    margin: 'auto',
    background: 'rgba(255, 255, 255, 0.9)',
    boxShadow: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    },
  },
});

class Faq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      gq1: 'How do I get to Bengkala Village?',
      ga1: 'Please call +65 Brandon',
      gq2: 'How is Bengkala unique from other villages?',
      ga2: 'Its population has one of the largest deaf count.',
      gq3: 'Why is Brandon so cool?',
      ga3: 'Its Brandon, the Dr, Boss Ng',
      sq1: 'Will the transactions be secured?',
      sa1: 'Yes, it is all handled by Brandon!',
      sq2: 'Will my belongings be safe will staying over there?',
      sa2: 'Yes, under Big Brother Brandon watch',
      sq3: 'How do I verify the authenticity of Brandon',
      sa3: 'There is no need to, you will know it once you meet him',
      oq1: 'How is Brandon so smart?',
      oa1: 'He uses vim in his spare time',
      oq2: 'How do I arrange an appointment with Brandon?',
      oa2: 'You dont, in our world, Brandon arranges appointments with you',
      oq3: 'This website is so cool, thank you developers!',
      oa3: 'help, were dying here... (brandon is oppressing us...)',
    };
  }

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
      <Navbar />
      <div className={classes.root}>
        <Grid
            container spacing={10}
            direction="column"
            alignItems="center"
            justify="center"
        >
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h4" style={{ paddingTop: 10, padding: 17 }}>
                Frequently Asked Questions
              </Typography>
              <List
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    <h1>General FAQ</h1>
                  </ListSubheader>
                }>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary = {this.state.gq1}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          to Tendou Kane
                        </Typography>
                        {" — " + this.state.ga1}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://material-ui.com/static/images/avatar/2.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary = {this.state.gq2}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          to Sumeet Jose
                        </Typography>
                        {" — " + this.state.ga2}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://cdn180.picsart.com/232191442018212.png?r1024x1024" />
                  </ListItemAvatar>
                  <ListItemText
                    primary = {this.state.gq3}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          to Takagi Nanako
                        </Typography>
                        {" — " + this.state.ga3}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>



              <List
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    <h1>Security FAQ</h1>
                  </ListSubheader>
                }>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://material-ui.com/static/images/avatar/3.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary = {this.state.sq1}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          to Ruo Qing
                        </Typography>
                        {" — " + this.state.sa1}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://material-ui.com/static/images/avatar/4.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary = {this.state.sq2}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          to Dan Ming
                        </Typography>
                        {" — " + this.state.sa2}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://material-ui.com/static/images/avatar/5.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary = {this.state.sq3}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          to Abhi Pradeep
                        </Typography>
                        {" — " + this.state.sa3}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>



              <List
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    <h1>Other FAQ</h1>
                  </ListSubheader>
                }>

                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://material-ui.com/static/images/avatar/6.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary = {this.state.oq1}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          to Alex Vincent
                        </Typography>
                        {" — " + this.state.oa1}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://material-ui.com/static/images/avatar/7.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary = {this.state.oq2}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          to Celine Yan
                        </Typography>
                        {" — " + this.state.oa2}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={bigbrandon} />
                  </ListItemAvatar>
                  <ListItemText
                    primary = {this.state.oq3}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          to Devansh Jagtap
                        </Typography>
                        {" — " + this.state.oa3}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Faq);

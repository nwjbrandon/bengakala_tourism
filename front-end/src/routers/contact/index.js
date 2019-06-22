import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import LocationIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/PermPhoneMsg';
import bg from './bgpic/roadtovillage.jpg';
import PropTypes from "prop-types";
import uuid from 'uuid/v1';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  bgImage: {
    padding: 50,
    backgroundPosition: "top",
    backgroundRepeat: "initial",
    backgroundSize: "cover",
    width: "100%",
    backgroundImage: `url(${bg})`,
    textAlign: "left"
  },
  paper: {
    padding: theme.spacing(3),
    width: 450,
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    [theme.breakpoints.up(500 + theme.spacing(6))]: {
      width: 500,
    },
  },
  button: {
    margin: theme.spacing(1),
  },
});

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      contact:'',
      subject:'',
      message:'',
      mailSent: false,
      email: '',
    };
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    const { onMount } = this.props;
    onMount();
  }

  submit() {
    const {
      contact,
      name,
      subject,
      message,
      email,
    } = this.state;
    const id = uuid();
    const data = {
      uuid: id, contact, name, subject, message, email
    };
    const { contactSubmit } = this.props;
    contactSubmit(data);
  }

  render() {
    const { classes, data, errorMsg, successMsg } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <div className={classes.bgImage}>
            <Grid
                container
                alignItems="center"
                justify="center"
            >
              <Grid item>
                <Paper className={classes.paper}>
                  <Grid item xs={12}>
                    <Typography variant="h4" style={{ paddingTop: 10, padding: 17 }}>
                      Contact Us!
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <LocationIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Address" secondary={ data['Address'] } />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <PhoneIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Call Us" secondary={ data['Phone'] } />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </List>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        label="Name"
                        fullWidth
                        autoComplete="name"
                        margin="normal"
                        variant="outlined"
                        value={this.state.name}
                        onChange={e => this.setState({name: e.target.value})}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                        label="Phone number"
                        fullWidth
                        autoComplete="Phone"
                        margin="normal"
                        variant="outlined"
                        value={this.state.contact}
                        onChange={e => this.setState({contact: e.target.value})}
                    />
                  </Grid>

                  <TextField
                      required
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      margin="normal"
                      variant="outlined"
                      value={this.state.email}
                      onChange={e => this.setState({email: e.target.value})}
                  />

                  <Typography variant="h6" style={{ paddingTop: 30 }}>
                    Your message:
                  </Typography>

                  <TextField
                      required
                      label="Subject"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={this.state.subject}
                      onChange={e => this.setState({subject: e.target.value})}
                  />

                  <TextField
                      required
                      label="Message"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      multiline
                      rows="7"
                      value={this.state.message}
                      onChange={e => this.setState({message: e.target.value})}
                  />

                  <Grid container justify="center" style={{ paddingTop: 20 }}>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={this.submit}
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid container justify="center">
                    <Typography variant="body2" color="primary">
                      { successMsg }
                    </Typography>
                    <Typography variant="body2" color="error">
                      { errorMsg }
                    </Typography>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);

import React from 'react';
import API from '../../api';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import bg from './bgpic/Homepageimg.jpg'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    height: '100%',
    [theme.breakpoints.up(500 + theme.spacing(6))]: {
      width: 600,
      margin: 'auto',
      background: 'rgba(255, 255, 255, 0.9)',
      boxShadow: 'none',
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
      //data: '',
      address:'National University of Singapore, Kent Ridge',
      mycontact:'(+65) Brandon',
      name: '',
      //email:'',
      contact:'',
      subject:'',
      message:'',
      mailSent: false,
      //error: null,

      showPassword: false,
      password: '',
      email: '',
      error: '',
    }
    this.submit = this.submit.bind(this);
  }

  handleFormSubmit( event ) {
    event.preventDefault();
    console.log(this.state);
  }


  componentWillMount() {
    console.log(this.props.auth);
    this.setState({error: this.props.auth});
  }

  submit() {
    console.log(this.state);
    const { email, password } = this.state;
    const data = { email, password };
    API.post('/admin/login', data)
        .then(() => {
          this.props.signIn();
          this.props.history.push('/dashboard');
        })
        .catch(err =>{
          this.setState({ error: err.data});
        });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid
            container spacing={10}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '105vh',
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "inital",
            backgroundSize: "cover",
            width:"104%",
            textAlign:"left"}}
        >
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h4" align="center" style={{ paddingTop: 30 }}>
                Contact Us!
              </Typography>

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

              <TextField
                  label="Phone number"
                  fullWidth
                  autoComplete="Phone"
                  margin="normal"
                  variant="outlined"
                  value={this.state.contact}
                  onChange={e => this.setState({contact: e.target.value})}
              />

              <Typography variant="h6" style={{ paddingTop: 20 }}>
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
                    component={Link}
                    to="/"
                >
                  Submit
                </Button>
              </Grid>
              <Grid container justify="center">
                <Typography variant="body2" color="error">
                  { this.state.error }
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Contact);

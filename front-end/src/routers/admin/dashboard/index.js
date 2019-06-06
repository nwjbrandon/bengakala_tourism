import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Chart from "react-google-charts";
import NavBar from '../../../components/dashboard/navBar';
import {connect} from 'react-redux';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Main',
      data: [
        [
          {
            type: "date",
            id: "Date"
          },
          {
            type: "number",
            id: "Won/Loss"
          }
        ],
        [new Date(2018, 3, 13), 1],
        [new Date(2018, 3, 14), 24],
        [new Date(2018, 3, 15), 38],
        [new Date(2018, 3, 16), 10],
        [new Date(2018, 3, 17), 2],
        // Many rows omitted for brevity.
        [new Date(2018, 9, 4), 1],
        [new Date(2018, 9, 5), 5],
        [new Date(2018, 9, 12), 10],
        [new Date(2018, 9, 13), 29],
        [new Date(2018, 9, 19), 23],
        [new Date(2018, 9, 23), 45],
        [new Date(2018, 9, 24), 10],
        [new Date(2019, 9, 30), 7]
      ]
    }
  }

  componentWillMount() {
    if (this.props.auth) {
    } else {
      this.props.history.push('/admin');
    }
  }

  render() {
    const { classes } = this.props
    const { title, data } = this.state
    return (
        <div className={classes.root}>
          <CssBaseline />
          <NavBar title={title} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography variant='h4'>
              Number of Customers
            </Typography>
            <Chart chartType="Calendar" align="center" width="100%" height="400px" data={data} />
            <Typography variant='h4'>
              Account Statements
            </Typography>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
              facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
              donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
              adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
              imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
              arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
              donec massa sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
              facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
              tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
              consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
              vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
              hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
              tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
              nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
              accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
            </Typography>
          </main>
        </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}


export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
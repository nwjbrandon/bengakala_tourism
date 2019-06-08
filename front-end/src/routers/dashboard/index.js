import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Chart from "react-google-charts";
import NavBar from '../../components/dashboard/navBar';
import {connect} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root1: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
            <Paper className={classes.root1}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
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
    auth: state.admin.auth
  };
}


export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
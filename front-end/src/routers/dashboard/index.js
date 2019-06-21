import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Chart from "react-google-charts";
import NavBar from '../../components/dashboard/navBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import format from 'date-fns/format';
import Button from '@material-ui/core/Button';

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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Main',
    };
    this.confirmedCheckIn = this.confirmedCheckIn.bind(this);
  }

  confirmedCheckIn(event) {
    const { checkIn } = this.props;
    checkIn(event.currentTarget.value);
  }

  componentWillMount() {
    const { onMount, } = this.props;
    onMount();
  }

  render() {
    const { classes, heatmap, transactions, } = this.props;
    const { title } = this.state;
    const heatMapData = [
      [
        {
          type: "date",
          id: "Date"
        },
        {
          type: "number",
          id: "Number of Customers"
        }
      ],
      ...heatmap,
    ];
    return (
        <div className={classes.root}>
          <CssBaseline />
          <NavBar title={title} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography variant='h4'>
              Number of Customers
            </Typography>
            <Chart chartType="Calendar" align="center" width="100%" height="400px" data={heatMapData} />
            <Typography variant='h4'>
              Account Statements
            </Typography>
            <Paper className={classes.root1}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Contact</TableCell>
                    <TableCell align="right">From</TableCell>
                    <TableCell align="right">To</TableCell>
                    <TableCell align="right">Females</TableCell>
                    <TableCell align="right">Males</TableCell>
                    <TableCell align="right">Breakfast</TableCell>
                    <TableCell align="right">Lunch</TableCell>
                    <TableCell align="right">Dinner</TableCell>
                    <TableCell align="right">Cars</TableCell>
                    <TableCell align="right">Van</TableCell>
                    <TableCell align="right">MotorCycle</TableCell>
                    <TableCell align="right">CheckIn</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map(row => (
                      <TableRow key={row.uuid}>
                        <TableCell align="right">{row.firstName}</TableCell>
                        <TableCell align="right">{row.lastName}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.phone}</TableCell>
                        <TableCell align="right">{format(row.dateFrom, 'MM/DD/YYYY')}</TableCell>
                        <TableCell align="right">{format(row.dateTo, 'MM/DD/YYYY')}</TableCell>
                        <TableCell align="right">{row.females}</TableCell>
                        <TableCell align="right">{row.males}</TableCell>
                        <TableCell align="right">{row.breakfast}</TableCell>
                        <TableCell align="right">{row.lunch}</TableCell>
                        <TableCell align="right">{row.dinner}</TableCell>
                        <TableCell align="right">{row.cars}</TableCell>
                        <TableCell align="right">{row.van}</TableCell>
                        <TableCell align="right">{row.motorbikes}</TableCell>
                        {row.checkedIn ? (
                          <TableCell align="right">
                            <Button variant="contained" color="secondary" disabled>
                              Yes
                            </Button>
                          </TableCell>
                        )
                        : (
                          <TableCell align="right">
                            <Button variant="contained" value={row.uuid} onClick={this.confirmedCheckIn}>No</Button>
                          </TableCell>
                        )}
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
};

export default withStyles(styles)(Dashboard);
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
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
import Modal from "../../components/dashboard/Modal";
import SuccessToast from "../../components/snackBar/successSnackBar.container";
import ErrorToast from "../../components/snackBar/errorSnackBar.container";
import API from '../../api'

const styles = theme => ({
  root: {
    display: 'flex',
    overflowX: 'auto',
    width: '100%'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
  tableWrapper: {
    marginTop: theme.spacing(3),
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      openModel: false,
      rowsPerPage: 5,
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      dateFrom: '',
      dateTo: '',
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      males: '0',
      females: '0',
      cars: '0',
      van: '0',
      motorbikes: '0',
      checkedIn: 0,
      uuid: '',
      cash: 0,
    };
    this.confirmedCheckIn = this.confirmedCheckIn.bind(this);
    this.deleteCheckIn = this.deleteCheckIn.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.updateTransactionState = this.updateTransactionState.bind(this);
  }

  updateTransactionState() {
    const { uuid } = this.state;
    const { verify } = this.props;
    verify({ uuid });
  }

  confirmedCheckIn(event) {
    const { checkIn } = this.props;
    checkIn(event.currentTarget.value);
  }

  deleteCheckIn(event) {
    this.setState({ openModal: false });
    const { delCheckIn } = this.props;
    delCheckIn(event.currentTarget.value);
  }

  handleChangePage(event, newPage) {
    this.setState({ page: newPage });
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: +event.target.value });
  }

  handleOpenModal = ({
    firstName,
    lastName,
    email,
    country,
    dateFrom,
    dateTo,
    breakfast,
    lunch,
    dinner,
    males,
    females,
    cars,
    van,
    motorbikes,
    checkedIn,
    cash,
    uuid,
  }) => {
    this.setState({
      firstName,
      openModal: true,
      lastName,
      email,
      country,
      dateFrom,
      dateTo,
      breakfast,
      lunch,
      dinner,
      males,
      females,
      cars,
      van,
      motorbikes,
      checkedIn,
      uuid,
      cash,
    });
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  componentDidMount() {
    const { onMount, } = this.props;
    onMount();
  }

  render() {
    const { classes, heatmap, transactions, } = this.props;
    const { page, rowsPerPage } = this.state;
    const title = 'Main';
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
          <Chart
            chartType="Calendar"
            data={heatMapData}
            width="100%"
            height="400px"
          />
          <Typography variant='h4'>
            Account Statements
          </Typography>
          <Paper className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Expand</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                  <TableRow key={row.uuid}>
                    <TableCell align="right">{row.firstName}</TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        value={row}
                        variant="contained"
                        color={row.checkedIn ? "primary" : "secondary"}
                        onClick={() => this.handleOpenModal({ ...row })}
                      >
                        Expand
                          </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={transactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </main>
        <Modal {...this.state}
          onCloseModal={this.handleCloseModal}
          confirmedCheckIn={this.confirmedCheckIn}
          deleteCheckIn={this.deleteCheckIn}
          updateTransactionState={
            this.updateTransactionState
          }
        />
        <SuccessToast />
        <ErrorToast />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
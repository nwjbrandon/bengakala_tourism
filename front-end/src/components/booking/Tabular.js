import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    color: "black",
  },
  table: {
    minWidth: 500,
  },
}));

const MasterTable = (props) => {

  const classes = useStyles()
  const { tripDetails, costData, calcData } = props

  console.log("COST", costData)

  const groupSize = tripDetails.numberMales + tripDetails.numberFemales;

  const date_diff_indays = (date1, date2) => {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
  }

  const numOfDays = date_diff_indays(tripDetails.checkIn, tripDetails.checkOut)


  const createRow = (desc, qty, unit, price) => {
    return { desc, qty, unit, price };
  }

  const createMealRow = () => {

    let arr = [];

    if (tripDetails.breakfast) {
      arr[0] = createRow('Breakfast', groupSize, costData.breakfast, calcData.breakfast)
    }
    if (tripDetails.lunch) {
      arr[1] = createRow('Lunch', groupSize, costData.lunch, calcData.lunch)
    }
    if (tripDetails.dinner) {
      arr[2] = createRow('Dinner', groupSize, costData.dinner, calcData.dinner)
    }
    return arr;
  }

  /* Creating the rows */
  const mealRow = createMealRow()
  const homeRow = [createRow('HomeStay', groupSize, costData.accommodation, calcData.accommodation)]

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: "20px", color: 'olive' }}>Number of days of stay: </TableCell>
            <TableCell style={{ fontSize: "20px", color: 'olive' }}>{numOfDays}</TableCell>
            <TableCell style={{ fontSize: "20px", color: 'olive' }}></TableCell>
            <TableCell style={{ fontSize: "20px", color: 'olive' }}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontSize: "20px", color: 'green' }}>Type</TableCell>
            <TableCell style={{ fontSize: "20px", color: 'green' }}>No. of people</TableCell>
            <TableCell style={{ fontSize: "20px", color: 'green' }}>Unit Price per day(IDR)</TableCell>
            <TableCell style={{ fontSize: "20px", color: 'green' }}>Price (IDR)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {homeRow.map((row, index) => (
            <TableRow key={index}>
              <TableCell style={{ color: 'black' }}>{row.desc}</TableCell>
              <TableCell style={{ color: 'black' }}>{row.qty}</TableCell>
              <TableCell style={{ color: 'black' }}>{row.unit}</TableCell>
              <TableCell style={{ color: 'black' }}>{row.price}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell style={{ color: 'blue' }}>Accommodation total</TableCell>
            <TableCell style={{ color: 'blue' }}>{homeRow[0].price}</TableCell>
          </TableRow>
          <TableRow style={{ backgroundColor: '' }}>
            <TableCell style={{ color: 'black' }}>Meals</TableCell>
            <TableCell style={{ color: 'black' }}></TableCell>
            <TableCell style={{ color: 'black' }}></TableCell>
            <TableCell style={{ color: 'black' }}></TableCell>
          </TableRow>
          {mealRow.map((row, index) => (
            <TableRow key={index} style={{ color: 'black' }}>
              <TableCell style={{ color: 'black' }} align="center">{row.desc}</TableCell>
              <TableCell style={{ color: 'black' }}>{row.qty}</TableCell>
              <TableCell style={{ color: 'black' }}>{row.unit}</TableCell>
              <TableCell style={{ color: 'black' }}>{row.price}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell style={{ color: 'blue' }}>Meals total</TableCell>
            <TableCell style={{ color: 'blue' }}>{calcData.mealPlan}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell style={{ color: 'blue' }}>Total</TableCell>
            <TableCell style={{ color: 'blue' }}>{calcData.subTotal}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default MasterTable;
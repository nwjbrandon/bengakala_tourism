import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
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
  const { tripDetails, cost } = props
  const groupSize = parseInt(tripDetails.numberFemales) + parseInt(tripDetails.numberMales)

  console.log("COST", cost)


  const date_diff_indays = (date1, date2) => {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
  }

  const numOfDays = date_diff_indays(tripDetails.checkIn, tripDetails.checkOut)


  /* Calculate the price of each service */
  const priceRow = (qty, unit, duration) => {
    return qty * unit * duration;
  }

  const createRow = (desc, qty, unit) => {
    const duration = date_diff_indays(tripDetails.checkIn, tripDetails.checkOut)
    const price = priceRow(qty, unit, duration)
    return { desc, qty, unit, price };
  }

  const createMealRow = (b, l, d, bCost, lCost, dCost, groupSize) => {

    let arr = []

    if (b) {
      arr[0] = createRow('Breakfast', groupSize, bCost)
    }
    if (l) {
      arr[1] = createRow('Lunch', groupSize, lCost)
    }
    if (d) {
      arr[2] = createRow('Dinner', groupSize, dCost)
    }
    return arr;
  }

  /*
  const transportRow = [
    createRow('Vans', tripDetails.numberVans, prices.van),
    createRow('Cars', tripDetails.numberCars, prices.car),
    createRow('Bikes', tripDetails.numberBikes, prices.bike),
  ]
  */

  // const mealSub = subtotal(mealRow())
  // const total = totalCost([mealSub, homeRow[0].price])

  /* Calculations functions */
  const subtotal = (items) => {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const totalCost = (arr) => {
    return arr.reduce((total, num) => num + total, 0);
  }

  /* Creating the rows */
  const mealRow = createMealRow(tripDetails.breakfast, tripDetails.lunch, tripDetails.dinner,
    cost.breakfast, cost.lunch, cost.dinner, groupSize)
  const homeRow = [createRow('HomeStay', groupSize, cost.accomodation)]


  /* Cost values */
  const mealCost = subtotal(mealRow);

  const calcTotal = () => {
    const finalCost = totalCost([mealCost, homeRow[0].price]);

    if (props.grossAmount !== finalCost)
      props.onAmountChange(finalCost)

    return finalCost
  }

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
          <TableRow>
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
            <TableCell style={{ color: 'blue' }}>{mealCost}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell style={{ color: 'blue' }}>Total</TableCell>
            <TableCell style={{ color: 'blue' }}>{calcTotal()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onAmountChange: (val) => dispatch({ type: "GROSS_AMOUNT", payload: val }),
  }

}


export default connect(null, mapDispatchToProps)(MasterTable)
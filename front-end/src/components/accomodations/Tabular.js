import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

/*
const tripDetails = {
  checkIn: "18/04/2020",
  checkOut: "28/04/2020",
  breakfast: true,
  lunch: true,
  dinner: false,
  numberMales: 7,
  numberFemales: 3,
  numberVans: 3,
  numberCars: 4,
  numberBikes: 2
};

const duration = 10

const groupSize = 20

const prices = {
  home: 10,
  breakfast: 1,
  lunch: 3,
  dinner: 2,
  van: 15,
  car: 10,
  bike: 5
}
*/
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    color: "black",
  },
  table: {
    minWidth: 500,
  },
}));

export default function MasterTable(props) {
  /*
  constructor(props) {
    super(props)

    this.priceRow = this.priceRow.bind(this)
    this.createRow = this.createRow.bind(this)
    this.mealRow = this.mealRow.bind(this)
    this.subtotal = this.subtotal.bind(this)
    this.totalCost = this.totalCost.bind(this)
    this.date_diff_indays = this.date_diff_indays.bind(this)
  }
  */
  const classes = useStyles()
  const { tripDetails, cost } = props
  const groupSize = parseInt(tripDetails.numberFemales) + parseInt(tripDetails.numberMales)

  const date_diff_indays = (date1, date2) => {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
  }

  /* Calculate the price of each service */
  const priceRow = (qty, unit, duration) => {
    return qty * unit * duration;
  }

  const createRow = (desc, qty, unit) => {
    const duration = date_diff_indays(tripDetails.checkIn, tripDetails.checkOut)
    const price = priceRow(qty, unit, duration)
    return { desc, qty, price };
  }

  /*
  renderHomeRow = (groupSize, homePrice) => {

    const homeRow = this.createRow('Homestay', groupSize / 4, homePrice)

    return (
      homeRow.map(row => (
        <TableRow>
          <TableCell style={{ color: 'black' }}>{row.desc}</TableCell>
          <TableCell style={{ color: 'black' }}>{row.qty}</TableCell>
          <TableCell style={{ color: 'black' }}>{row.price}</TableCell>
        </TableRow>
      ))
    )
  }
  */

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

  /* Final Calculations */
  const subtotal = (items) => {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const totalCost = (arr) => {
    return arr.reduce((total, num) => num + total, 0);
  }


  /* Creating the rows */
  const mealRow = createMealRow(tripDetails.breakfast, tripDetails.lunch, tripDetails.dinner,
    cost.breakfast, cost.lunch, cost.dinner, groupSize)
  const homeRow = [createRow('HomeStay', Math.floor(groupSize / 4), cost.accomodation)]

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: "20px", color: 'cyan' }}>Type</TableCell>
            <TableCell style={{ fontSize: "20px", color: 'cyan' }}>Qty</TableCell>
            <TableCell style={{ fontSize: "20px", color: 'cyan' }}>Price (IDR)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {homeRow.map(row => (
            <TableRow>
              <TableCell style={{ color: 'black' }}>{row.desc}</TableCell>
              <TableCell style={{ color: 'black' }}>{row.qty}</TableCell>
              <TableCell style={{ color: 'black' }}>{row.price}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell style={{ color: 'black' }}>Meals</TableCell>
            <TableCell style={{ color: 'black' }}></TableCell>
            <TableCell style={{ color: 'black' }}></TableCell>
          </TableRow>
          {mealRow.map(row => (
            <TableRow style={{ color: 'black' }}>
              <TableCell style={{ color: 'black' }} align="center"> {row.desc}</TableCell>
              <TableCell style={{ color: 'black' }}>{row.qty}</TableCell>
              <TableCell style={{ color: 'black' }}>{row.price}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell style={{ color: 'blue' }} align="center">Meals total</TableCell>
            <TableCell style={{ color: 'blue' }}>{subtotal(mealRow)}</TableCell>
          </TableRow>
          {/* <TableRow>
              <TableCell style={{ color: 'black' }}>Transport</TableCell>
              <TableCell style={{ color: 'black' }}></TableCell>
              <TableCell style={{ color: 'black' }}></TableCell>
            </TableRow> 
            <TableRow>
              <TableCell style={{ color: 'black' }}></TableCell>
              <TableCell style={{ color: 'black' }}> Subtotal </TableCell>
              <TableCell style={{ color: 'black' }}>{subcost}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell style={{ color: 'black' }}> Taxes </TableCell>
              <TableCell style={{ color: 'black' }}>{taxes}</TableCell>
            </TableRow> */}
          <TableRow>
            <TableCell></TableCell>
            <TableCell style={{ color: 'blue' }}> Total </TableCell>
            <TableCell style={{ color: 'blue' }}>{totalCost([subtotal(mealRow), homeRow[0].price])}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}
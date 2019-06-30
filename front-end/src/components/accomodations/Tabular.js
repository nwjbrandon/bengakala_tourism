import React from 'react';
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

export default class MasterTable extends React.Component {
  constructor(props) {
    super(props)

    this.priceRow = priceRow.bind(this)
    this.createRow = createRow.bind(this)
    this.mealRow = mealRow.bind(this)
    this.subtotal = subtotal.bind(this)
    this.totalCost = totalCost.bind(this)
    this.date_diff_indays = date_diff_indays.bind(this)
  }

  date_diff_indays = (date1, date2) => {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
  }

  priceRow = (qty, unit, duration) => {
    return qty * unit * duration;
  }

  createRow = (desc, qty, unit) => {
    const duration = this.date_diff_indays(this.props.tripDetails.checkIn, this.props.tripDetails.checkOut)
    const price = priceRow(qty, unit, duration)
    return { desc, qty, price };
  }

  /*
  renderHomeRow = (groupSize, homePrice) => {

    const homeRow = this.createRow('Homestay', groupSize / 4, homePrice)

    return (
      homeRow.map(row => (
        <TableRow>
          <TableCell style={{ color: 'white' }}>{row.desc}</TableCell>
          <TableCell style={{ color: 'white' }}>{row.qty}</TableCell>
          <TableCell style={{ color: 'white' }}>{row.price}</TableCell>
        </TableRow>
      ))
    )
  }
  */

  mealRow = (b, l, d, bCost, lCost, dCost, groupSize) => {

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

  subtotal = (items) => {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  totalCost = (arr) => {
    return arr.reduce((total, num) => num + total, 0);
  }

  render() {
    const { tripDetails, cost } = this.props
    const groupSize = tripDetails.numberFemales + tripDetails.numberMales
    const mealRow = this.mealRow(tripDetails.breakfast, tripDetails.lunch, tripDetails.dinner,
      cost.breakfast, cost.lunch, cost.dinner, groupSize)
    const homeRow = this.createRow('HomeStay', groupSize / 4, cost.accommodation)
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: "20px", color: 'cyan' }}>Type</TableCell>
            <TableCell style={{ fontSize: "20px", color: 'cyan' }}>Qty</TableCell>
            <TableCell style={{ fontSize: "20px", color: 'cyan' }}>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {homeRow.map(row => (
            <TableRow>
              <TableCell style={{ color: 'white' }}>{row.desc}</TableCell>
              <TableCell style={{ color: 'white' }}>{row.qty}</TableCell>
              <TableCell style={{ color: 'white' }}>{row.price}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell style={{ color: 'white' }}>Meals</TableCell>
            <TableCell style={{ color: 'white' }}></TableCell>
            <TableCell style={{ color: 'white' }}></TableCell>
          </TableRow>
          {mealRow.map(row => (
            <TableRow style={{ color: 'white' }}>
              <TableCell style={{ color: 'white' }} align="center"> {row.desc}</TableCell>
              <TableCell style={{ color: 'white' }}>{row.qty}</TableCell>
              <TableCell style={{ color: 'white' }}>{row.price}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell style={{ color: 'white' }} align="center">Meals total</TableCell>
            <TableCell style={{ color: 'white' }}>{this.subtotal(mealRow)}</TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell style={{ color: 'white' }}>Transport</TableCell>
            <TableCell style={{ color: 'white' }}></TableCell>
            <TableCell style={{ color: 'white' }}></TableCell>
          </TableRow> 
          <TableRow>
            <TableCell style={{ color: 'white' }}></TableCell>
            <TableCell style={{ color: 'white' }}> Subtotal </TableCell>
            <TableCell style={{ color: 'white' }}>{subcost}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell style={{ color: 'white' }}> Taxes </TableCell>
            <TableCell style={{ color: 'white' }}>{taxes}</TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell></TableCell>
            <TableCell style={{ color: 'white' }}> Total </TableCell>
            <TableCell style={{ color: 'white' }}>{this.totalCost([this.subtotal(mealRow), homeRow.price])}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const tripDetails = {
  checkIn: "18/04/2020",
  checkOut: "28/04/2020",
  breakfast: true,
  lunch :true ,
  dinner :false,
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
  lunch :3 ,
  dinner :2,
  van: 15,
  car: 10,
  bike: 5
}

function priceRow(qty, unit) {
  return qty * unit * duration;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit)
  return { desc, qty, price };
}

const homeRow = [
  createRow('Homestay', groupSize / 4, prices.home),
]

function mealRow() {
  let arr = []
  if (tripDetails.breakfast) {
    arr[0] = createRow('Breakfast', groupSize, prices.breakfast)
  }
  if (tripDetails.lunch) {
    arr[1] = createRow('Lunch', groupSize, prices.lunch)
  }
  if (tripDetails.dinner) {
    arr[2] = createRow('Dinner', groupSize, prices.lunch)
  }
  return arr;
}

const transportRow = [
  createRow('Vans', tripDetails.numberVans, prices.van),
  createRow('Cars', tripDetails.numberCars, prices.car),
  createRow('Bikes', tripDetails.numberBikes, prices.bike),
]

const transportSub = subtotal(transportRow)
const mealSub = subtotal(mealRow())
const subcost = totalCost([mealSub, transportSub, homeRow[0].price])
const taxes = 0.029 * subcost
const total = taxes + subcost

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function totalCost(arr) {
  return arr.reduce((total, num) => num + total, 0);
}

export default function MasterTable() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Qty</TableCell>
          <TableCell>Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {homeRow.map(row => (
          <TableRow>
            <TableCell>{ row.desc }</TableCell>
            <TableCell>{ row.qty }</TableCell>
            <TableCell>{ row.price }</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>Meals</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        {mealRow().map(row => (
          <TableRow>
            <TableCell align="center"> { row.desc }</TableCell>
            <TableCell>{ row.qty }</TableCell>
            <TableCell>{ row.price }</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell></TableCell>
          <TableCell align="center">Meals total</TableCell>
          <TableCell>{mealSub}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Transport</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        {transportRow.map(row => (
          <TableRow>
            <TableCell align="center">{ row.desc }</TableCell>
            <TableCell>{ row.qty }</TableCell>
            <TableCell>{ row.price }</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell></TableCell>
          <TableCell align="center">Transport total</TableCell>
          <TableCell>{transportSub}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell> Subtotal </TableCell>
          <TableCell>{subcost}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell> Taxes </TableCell>
          <TableCell>{taxes}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell> Total </TableCell>
          <TableCell>{total}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

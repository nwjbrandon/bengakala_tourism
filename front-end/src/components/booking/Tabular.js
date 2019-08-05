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

  const formatter = new Intl.NumberFormat({
    style: 'decimal',
    minimumFractionDigits: 0,
  })

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}>Airport Transfer</TableCell>
            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}></TableCell>
            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}></TableCell>
            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}></TableCell>
          </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell style={{color: 'black'}}>Airport Cars</TableCell>
              <TableCell style={{color: 'black'}}>{tripDetails.numberAirportCars}</TableCell>
            </TableRow>
          <TableRow>
            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}>Transportation within village</TableCell>
            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}></TableCell>
            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}></TableCell>
            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>Cars</TableCell>
            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>Vans</TableCell>
            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>Motorbikes</TableCell>
            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>Total Vehicles:</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ color: 'black' }}>{tripDetails.numberCars}</TableCell>
            <TableCell style={{ color: 'black' }}>{tripDetails.numberVans}</TableCell>
            <TableCell style={{ color: 'black' }}>{tripDetails.numberBikes}</TableCell>
            <TableCell style={{ color: 'black' }}>{tripDetails.numberBikes + tripDetails.numberCars + tripDetails.numberVans}</TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}>Number of days of stay: </TableCell>
            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}>{formatter.format(numOfDays)}</TableCell>
            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}></TableCell>
            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>Type</TableCell>
            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>No. of people</TableCell>
            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>Unit Price per day (IDR)</TableCell>
            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>Price (IDR)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {homeRow.map((row, index) => (
            <TableRow key={index}>
              <TableCell style={{ color: 'black' }}>{row.desc}</TableCell>
              <TableCell style={{ color: 'black' }}>{formatter.format(row.qty)}</TableCell>
              <TableCell style={{ color: 'black' }}>{formatter.format(row.unit)}</TableCell>
              <TableCell style={{ color: 'black' }}>{formatter.format(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell style={{ color: 'blue' }}>Accommodation total</TableCell>
            <TableCell style={{ color: 'blue' }}>{formatter.format(homeRow[0].price)}</TableCell>
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
              <TableCell style={{ color: 'black' }}>{formatter.format(row.qty)}</TableCell>
              <TableCell style={{ color: 'black' }}>{formatter.format(row.unit)}</TableCell>
              <TableCell style={{ color: 'black' }}>{formatter.format(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell style={{ color: 'blue' }}>Meals total</TableCell>
            <TableCell style={{ color: 'blue' }}>{formatter.format(calcData.mealPlan)}</TableCell>
          </TableRow>
          <TableRow style={{ backgroundColor: '' }}>
            <TableCell style={{ color: 'black' }}>Transport to Airport</TableCell>
            <TableCell style={{ color: 'black' }}></TableCell>
            <TableCell style={{ color: 'black' }}></TableCell>
            <TableCell style={{ color: 'black' }}></TableCell>
          </TableRow> 
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell style={{ color: 'blue' }}>Airport Car Total</TableCell>
              <TableCell style={{ color: 'blue' }}>{formatter.format(calcData.airportCarCost)}</TableCell>
            </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell style={{ color: 'blue' }}>Total</TableCell>
            <TableCell style={{ color: 'blue' }}>{formatter.format(calcData.subTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default MasterTable;

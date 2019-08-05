import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3),
        color: "black",
    },
    table: {
        // minWidth: 500,
    },
}));

const MasterTable = (props) => {

    const classes = useStyles()
    const { tripDetails, costData, calcData } = props;
    const groupSize = tripDetails.numberFemales + tripDetails.numberMales;

    console.log("COST", costData)


    const date_diff_indays = (date1, date2) => {
        const dt1 = new Date(date1);
        const dt2 = new Date(date2);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    }

    const numOfDays = date_diff_indays(tripDetails.checkIn, tripDetails.checkOut)

    const createRow = (desc, price) => {
        return { desc, price };
    }

    const createMealRow = () => {

        let arr = [];

        if (tripDetails.breakfast) {
            arr[0] = createRow('Breakfast', calcData.breakfast);
        }
        if (tripDetails.lunch) {
            arr[1] = createRow('Lunch', calcData.lunch);
        }
        if (tripDetails.dinner) {
            arr[2] = createRow('Dinner', calcData.dinner);
        }
        return arr;
    }

    /* Creating the rows */
    const mealRow = createMealRow();
    const homeRow = [createRow('HomeStay', calcData.accommodation)]

    const formatterNum = new Intl.NumberFormat({
      style: 'decimal',
      minimumFractionDigits: 0,
    })

    const formatter = new Intl.NumberFormat('IDR', {
      style: 'currency',
      currency: 'IDR',
      currencyDisplay: "symbol",
      minimumFractionDigits: 0,
    })

    return (
        <React.Fragment>
            <Paper className={classes.root}>
                <Typography style={{ paddingTop: 10, minHeight: 50, backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }} >Unit Prices</Typography>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>Accommodation</TableCell>
                            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}></TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={{ color: 'black' }} align="center">HomeStay</TableCell>
                            <TableCell style={{ color: 'black' }}>{formatter.format(costData.accommodation)}</TableCell>
                        </TableRow>

                        <TableRow style={{ color: 'black' }}>
                            <TableCell style={{ color: 'black' }} align="center">Breakfast</TableCell>
                            <TableCell style={{ color: 'black' }}>{formatter.format(costData.breakfast)}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>Meals</TableCell>
                            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}></TableCell>
                        </TableRow>

                        <TableRow style={{ color: 'black' }}>
                            <TableCell style={{ color: 'black' }} align="center">Breakfast</TableCell>
                            <TableCell style={{ color: 'black' }}>{formatter.format(costData.breakfast)}</TableCell>
                        </TableRow>
                        <TableRow style={{ color: 'black' }}>
                            <TableCell style={{ color: 'black' }} align="center">Lunch</TableCell>
                            <TableCell style={{ color: 'black' }}>{formatter.format(costData.lunch)}</TableCell>
                        </TableRow>
                        <TableRow style={{ color: 'black' }}>
                            <TableCell style={{ color: 'black' }} align="center">Dinner</TableCell>
                            <TableCell style={{ color: 'black' }}>{formatter.format(costData.dinner)}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>Transportation (Bengkala from Airport)</TableCell>
                            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}></TableCell>
                        </TableRow>
                        <TableRow style={{ color: 'black' }}>
                            <TableCell style={{ color: 'black' }} align="center">Airport Car cost</TableCell>
                            <TableCell style={{ color: 'black' }}>{costData.aiportCarCost}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </Paper>

            <Paper className={classes.root}>
                <Typography style={{ paddingTop: 10, minHeight: 50, backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }} >Transportation from Airport to Bengkala:</Typography>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>Total Vehicles:</TableCell>
                            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>{tripDetails.numberBikes + tripDetails.numberCars + tripDetails.numberVans}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={{ color: 'black' }} align="center">Airport Car</TableCell>
                            <TableCell style={{ color: 'black' }}>{tripDetails.numberCars}</TableCell>
                        </TableRow>

                        {/* <TableRow style={{ color: 'black' }}>
                            <TableCell style={{ color: 'black' }} align="center">Vans</TableCell>
                            <TableCell style={{ color: 'black' }}>{tripDetails.numberVans}</TableCell>
                        </TableRow>
                        <TableRow style={{ color: 'black' }}>
                            <TableCell style={{ color: 'black' }} align="center">Motorbikes</TableCell>
                            <TableCell style={{ color: 'black' }}>{tripDetails.numberBikes}</TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>

            </Paper>

            <Paper className={classes.root}>
                <Typography style={{ paddingTop: 10, minHeight: 50, backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }} >Transportation within village:</Typography>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>Total Vehicles:</TableCell>
                            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>{formatterNum.format(tripDetails.numberBikes + tripDetails.numberCars + tripDetails.numberVans)}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={{ color: 'black' }} align="center">Cars</TableCell>
                            <TableCell style={{ color: 'black' }}>{formatterNum.format(tripDetails.numberCars)}</TableCell>
                        </TableRow>

                        <TableRow style={{ color: 'black' }}>
                            <TableCell style={{ color: 'black' }} align="center">Vans</TableCell>
                            <TableCell style={{ color: 'black' }}>{formatterNum.format(tripDetails.numberVans)}</TableCell>
                        </TableRow>
                        <TableRow style={{ color: 'black' }}>
                            <TableCell style={{ color: 'black' }} align="center">Motorbikes</TableCell>
                            <TableCell style={{ color: 'black' }}>{formatterNum.format(tripDetails.numberBikes)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </Paper>


            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}>Number of days of stay: </TableCell>
                            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}>{formatterNum.format(numOfDays)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}>Number of people: </TableCell>
                            <TableCell style={{ backgroundColor: "#212121", fontSize: "15px", color: '#ffc107' }}>{formatterNum.format(groupSize)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>Type</TableCell>
                            <TableCell style={{ backgroundColor: "#616161", fontSize: "15px", color: 'white' }}>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {homeRow.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell style={{ color: 'black' }}>{row.desc}</TableCell>
                                <TableCell style={{ color: 'black' }}>{formatter.format(row.price)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow >
                            <TableCell style={{ color: 'blue' }}>Accommodation total</TableCell>
                            <TableCell style={{ color: 'blue' }}>{formatter.format(homeRow[0].price)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ color: 'black' }}>Meals</TableCell>
                            <TableCell style={{ color: 'black' }}></TableCell>
                        </TableRow>
                        {mealRow.map((row, index) => (
                            <TableRow key={index} style={{ color: 'black' }}>
                                <TableCell style={{ color: 'black' }} align="center">{row.desc}</TableCell>
                                <TableCell style={{ color: 'black' }}>{formatter.format(row.price)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell style={{ color: 'blue' }}>Meals total</TableCell>
                            <TableCell style={{ color: 'blue' }}>{formatter.format(calcData.mealPlan)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ color: 'blue' }}>Total</TableCell>
                            <TableCell style={{ color: 'blue' }}>{formatter.format(calcData.subTotal)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </React.Fragment>
    )
}

export default MasterTable;

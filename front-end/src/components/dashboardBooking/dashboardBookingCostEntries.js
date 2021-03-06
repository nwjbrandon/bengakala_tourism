import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    button: {
        margin: theme.spacing(1),
    },
    buttonsLocation: {
        alignSelf: 'flex-end'
    }
});

const formatter = new Intl.NumberFormat('IDR', {
  style: 'currency',
  currency: 'IDR',
  currencyDisplay: "symbol",
  minimumFractionDigits: 0,
})

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                        id: other.id,
                    },
                });
            }}
            thousandSeparator
            prefix="IDR "
        />
    );
}

// function toCurrency() {
//   return
// }

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

class DashboardContactDetails extends Component {
    constructor(props) {
        super(props);
        this.watchPricesString = this.watchPricesString.bind(this);
        this.editEntry = this.editEntry.bind(this);
    }

    watchPricesString(event) {
        const value = event.target.value;
        const uuid = event.target.id;
        const { watch } = this.props;
        watch({
            value,
            uuid,
            field: 'pricesString',
            type: 'costs'
        })
    }

    editEntry(event) {
        const value = event.currentTarget.value;
        const uuid = event.currentTarget.id;
        const { watch } = this.props;
        watch({
            value: value === 'true' ? 1 : 0,
            uuid,
            field: 'edit',
            type: 'costs'
        })
    }


    render() {
        const { classes, displayedData: data } = this.props;
        return (
            <div>
                {Object.keys(data).map((item) => (
                    <ExpansionPanel key={item}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Item: { data[item].title }</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {data[item].edit ?
                                <Grid container alignItems="flex-start" justify="flex-start" direction="row">
                                    <TextField
                                        multiline={true}
                                        variant="outlined"
                                        fullWidth
                                        value={data[item].pricesString}
                                        placeholder="Eg. 5000000"
                                        label="Cost"
                                        className={classes.button}
                                        onChange={this.watchPricesString}
                                        id={item}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </Grid>
                                :
                                <Typography>
                                    Cost: { formatter.format( data[item].pricesString ) }
                                </Typography>
                            }
                        </ExpansionPanelDetails>
                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                            {data[item].edit ?
                                <Button variant="contained" color="secondary" value={false} id={item} onClick={this.editEntry} className={classes.button}>
                                    Update
                                </Button>
                                :
                                <Button variant="contained" color="secondary" value={true} id={item} onClick={this.editEntry} className={classes.button}>
                                    Edit
                                </Button>
                            }
                        </Grid>
                    </ExpansionPanel>
                ))}
            </div>
        );
    }
}

DashboardContactDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardContactDetails);

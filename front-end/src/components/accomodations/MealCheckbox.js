import React from 'react'
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const MealCheckbox = (props) =>{

  return(
    <React.Fragment>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                // checked={state.checkedB}
                // onChange={handleChange('checkedB')}
                value="checkedB"
                color="primary"
              />
            }
            label={props.mealType}
          />
        </Grid>
    </React.Fragment>
  );
}

export default MealCheckbox

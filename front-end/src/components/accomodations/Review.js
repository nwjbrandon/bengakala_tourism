import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Youtube from './youtube'
import {connect} from 'react-redux'


const Review = (props) => {

  return (
    <React.Fragment>
      <div>{props.personalDetails.firstName} {props.personalDetails.lastName}</div>
      <div>{props.personalDetails.country}</div>
      <div>{props.personalDetails.email}</div>

      <div>{props.tripDetails.numberMales}</div>
      <div>{props.tripDetails.numberFemales}</div>
    </React.Fragment>

  );
}

const mapStateToProps = state => {
  return{
    personalDetails: state.personalDetails,
    tripDetails:state.tripDetails,
  };
};


export default connect(mapStateToProps)(Review)

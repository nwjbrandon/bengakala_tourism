import { connect } from "react-redux";
import DashboardBooking from './index';
import {
    DASHBOARD_BOOKING_ONMOUNT_REQUEST,
    DASHBOARD_BOOKING_RESET,
    DASHBOARD_BOOKING_SUBMIT_REQUEST,
} from "../../../actions/dashboardBooking";

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(DASHBOARD_BOOKING_ONMOUNT_REQUEST()),
        resetEntries: () => dispatch(DASHBOARD_BOOKING_RESET()),
        submit: () => dispatch(DASHBOARD_BOOKING_SUBMIT_REQUEST()),
    }
}

export default connect(null, matchDispatchToProps)(DashboardBooking);
import { connect } from "react-redux";
import DashboardBooking from './index';
import {
    DASHBOARD_BOOKING_ONMOUNT_REQUEST,
    DASHBOARD_BOOKING_RESET,
    DASHBOARD_BOOKING_SUBMIT_REQUEST,
    DASHBOARD_BOOKING_DATE_WATCH,
    DASHBOARD_BOOKING_DELETE,
    DASHBOARD_BOOKING_NEW,
} from "../../../actions/dashboardBooking";

function mapStateToProps(state) {
    return {
        excludedDates: state.dashboardBooking.excludedDates,
    };
}

function matchDispatchToProps(dispatch) {
    return {
        onMount: () => dispatch(DASHBOARD_BOOKING_ONMOUNT_REQUEST()),
        resetEntries: () => dispatch(DASHBOARD_BOOKING_RESET()),
        submit: () => dispatch(DASHBOARD_BOOKING_SUBMIT_REQUEST()),
        watch: (date) => dispatch(DASHBOARD_BOOKING_DATE_WATCH(date)),
        deleteEntry: (payload) => dispatch(DASHBOARD_BOOKING_DELETE(payload)),
        saveEntry: (payload) => dispatch(DASHBOARD_BOOKING_NEW(payload)),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardBooking);
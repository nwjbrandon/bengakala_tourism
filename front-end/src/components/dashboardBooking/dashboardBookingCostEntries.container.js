import { connect } from "react-redux";
import DashboardBooking from './dashboardBookingCostEntries';
import {
    DASHBOARD_BOOKING_WATCH,
} from "../../actions/dashboardBooking";

function mapStateToProps(state) {
    return {
        displayedData: state.dashboardBooking.displayedData.costs,
    };
}

function matchDispatchToProps(dispatch){
    return {
        watch: (payload) => dispatch(DASHBOARD_BOOKING_WATCH(payload)),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardBooking);
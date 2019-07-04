import { connect } from "react-redux";
import DashboardAccommodation from './dashboardBookingEntries';
import {
    DASHBOARD_ACCOMMODATION_WATCH,
} from "../../actions/dashboardAccommodation";

function mapStateToProps(state) {
    return {
        displayedData: state.dashboardAccommodation.displayedData,
    };
}

function matchDispatchToProps(dispatch){
    return {
        watch: (payload) => dispatch(DASHBOARD_ACCOMMODATION_WATCH(payload)),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardAccommodation);
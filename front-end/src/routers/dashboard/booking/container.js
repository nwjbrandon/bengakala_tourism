import { connect } from "react-redux";
import DashboardAccommodation from './index';
import {
    DASHBOARD_ACCOMMODATION_ONMOUNT_REQUEST,
    DASHBOARD_ACCOMMODATION_RESET,
    DASHBOARD_ACCOMMODATION_SUBMIT_REQUEST,
} from "../../../actions/dashboardAccommodation";

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(DASHBOARD_ACCOMMODATION_ONMOUNT_REQUEST()),
        resetEntries: () => dispatch(DASHBOARD_ACCOMMODATION_RESET()),
        submit: () => dispatch(DASHBOARD_ACCOMMODATION_SUBMIT_REQUEST()),
    }
}

export default connect(null, matchDispatchToProps)(DashboardAccommodation);
import { connect } from "react-redux";
import DashboardAttraction from './index';
import {
    DASHBOARD_ATTRACTION_ONMOUNT_REQUEST,
    DASHBOARD_ATTRACTION_DELETE,
    DASHBOARD_ATTRACTION_RESET,
    DASHBOARD_ATTRACTION_NEW,
    DASHBOARD_ATTRACTION_SUBMIT_REQUEST,
} from "../../../actions/dashboardBulletin";

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(DASHBOARD_ATTRACTION_ONMOUNT_REQUEST()),
        deleteEntry: (payload) => dispatch(DASHBOARD_ATTRACTION_DELETE(payload)),
        resetEntries: () => dispatch(DASHBOARD_ATTRACTION_RESET()),
        saveEntry: (payload) => dispatch(DASHBOARD_ATTRACTION_NEW(payload)),
        submit: () => dispatch(DASHBOARD_ATTRACTION_SUBMIT_REQUEST()),
    }
}

export default connect(null, matchDispatchToProps)(DashboardAttraction);
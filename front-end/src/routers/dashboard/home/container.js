import { connect } from "react-redux";
import DashboardHome from './index';
import {
    DASHBOARD_HOME_ONMOUNT_REQUEST,
    DASHBOARD_HOME_DELETE,
    DASHBOARD_HOME_RESET,
    DASHBOARD_HOME_NEW,
    DASHBOARD_HOME_SUBMIT_REQUEST,
} from "../../../actions/dashboardHome";


function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(DASHBOARD_HOME_ONMOUNT_REQUEST()),
        deleteEntry: (payload) => dispatch(DASHBOARD_HOME_DELETE(payload)),
        resetEntries: () => dispatch(DASHBOARD_HOME_RESET()),
        saveEntry: (payload) => dispatch(DASHBOARD_HOME_NEW(payload)),
        submit: () => dispatch(DASHBOARD_HOME_SUBMIT_REQUEST()),
    }
}

export default connect(null, matchDispatchToProps)(DashboardHome);
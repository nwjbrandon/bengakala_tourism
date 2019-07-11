import { connect } from "react-redux";
import DashboardResources from './index';
import {
    DASHBOARD_EXPLORE_ONMOUNT_REQUEST,
    DASHBOARD_EXPLORE_DELETE,
    DASHBOARD_EXPLORE_RESET,
    DASHBOARD_EXPLORE_NEW,
    DASHBOARD_EXPLORE_SUBMIT_REQUEST,
} from "../../../actions/dashboardExplore";

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(DASHBOARD_EXPLORE_ONMOUNT_REQUEST()),
        deleteEntry: (payload) => dispatch(DASHBOARD_EXPLORE_DELETE(payload)),
        resetEntries: () => dispatch(DASHBOARD_EXPLORE_RESET()),
        saveEntry: (payload) => dispatch(DASHBOARD_EXPLORE_NEW(payload)),
        submit: () => dispatch(DASHBOARD_EXPLORE_SUBMIT_REQUEST()),
    }
}

export default connect(null, matchDispatchToProps)(DashboardResources);
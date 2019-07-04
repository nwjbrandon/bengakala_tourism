import { connect } from "react-redux";
import DashboardResources from './index';
import {
    DASHBOARD_RESOURCES_ONMOUNT_REQUEST,
    DASHBOARD_RESOURCES_DELETE,
    DASHBOARD_RESOURCES_RESET,
    DASHBOARD_RESOURCES_NEW,
    DASHBOARD_RESOURCES_SUBMIT_REQUEST,
} from "../../../actions/dashboardResources";

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(DASHBOARD_RESOURCES_ONMOUNT_REQUEST()),
        deleteEntry: (payload) => dispatch(DASHBOARD_RESOURCES_DELETE(payload)),
        resetEntries: () => dispatch(DASHBOARD_RESOURCES_RESET()),
        saveEntry: (payload) => dispatch(DASHBOARD_RESOURCES_NEW(payload)),
        submit: () => dispatch(DASHBOARD_RESOURCES_SUBMIT_REQUEST()),
    }
}

export default connect(null, matchDispatchToProps)(DashboardResources);
import { connect } from "react-redux";
import DashboardSettings from './index';
import {
    DASHBOARD_SETTINGS_ONMOUNT_REQUEST,
    DASHBOARD_SETTINGS_DELETE,
    DASHBOARD_SETTINGS_SUBMIT_REQUEST,
} from "../../../actions/dashboardSettings";


function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(DASHBOARD_SETTINGS_ONMOUNT_REQUEST()),
        deleteEntry: (payload) => dispatch(DASHBOARD_SETTINGS_DELETE(payload)),
        submit: () => dispatch(DASHBOARD_SETTINGS_SUBMIT_REQUEST()),
    }
}

export default connect(null, matchDispatchToProps)(DashboardSettings);
import { connect } from "react-redux";
import DashboardSettings from './index';
import {
    DASHBOARD_SETTINGS_ONMOUNT_REQUEST,
    DASHBOARD_SETTINGS_DELETE_REQUEST,
    DASHBOARD_SETTINGS_CREATE_REQUEST,
    DASHBOARD_SETTINGS_CHANGE_REQUEST,
} from "../../../actions/dashboardSettings";


function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(DASHBOARD_SETTINGS_ONMOUNT_REQUEST()),
        del: (payload) => dispatch(DASHBOARD_SETTINGS_DELETE_REQUEST(payload)),
        change: (payload) => dispatch(DASHBOARD_SETTINGS_CHANGE_REQUEST(payload)),
        create: (payload) => dispatch(DASHBOARD_SETTINGS_CREATE_REQUEST(payload)),
    }
}

export default connect(null, matchDispatchToProps)(DashboardSettings);
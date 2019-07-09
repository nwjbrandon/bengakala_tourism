import { connect } from "react-redux";
import DashboardAttraction from './index';
import {
    DASHBOARD_BULLETIN_ONMOUNT_REQUEST,
    DASHBOARD_BULLETIN_DELETE,
    DASHBOARD_BULLETIN_RESET,
    DASHBOARD_BULLETIN_NEW,
    DASHBOARD_BULLETIN_SUBMIT_REQUEST,
} from "../../../actions/dashboardBulletin";

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(DASHBOARD_BULLETIN_ONMOUNT_REQUEST()),
        deleteEntry: (payload) => dispatch(DASHBOARD_BULLETIN_DELETE(payload)),
        resetEntries: () => dispatch(DASHBOARD_BULLETIN_RESET()),
        saveEntry: (payload) => dispatch(DASHBOARD_BULLETIN_NEW(payload)),
        submit: () => dispatch(DASHBOARD_BULLETIN_SUBMIT_REQUEST()),
    }
}

export default connect(null, matchDispatchToProps)(DashboardAttraction);
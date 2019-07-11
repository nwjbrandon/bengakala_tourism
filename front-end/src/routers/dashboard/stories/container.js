import { connect } from "react-redux";
import DashboardAttraction from './index';
import {
    DASHBOARD_STORIES_ONMOUNT_REQUEST,
    DASHBOARD_STORIES_DELETE,
    DASHBOARD_STORIES_RESET,
    DASHBOARD_STORIES_NEW,
    DASHBOARD_STORIES_SUBMIT_REQUEST,
} from "../../../actions/dashboardStories";

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(DASHBOARD_STORIES_ONMOUNT_REQUEST()),
        deleteEntry: (payload) => dispatch(DASHBOARD_STORIES_DELETE(payload)),
        resetEntries: () => dispatch(DASHBOARD_STORIES_RESET()),
        saveEntry: (payload) => dispatch(DASHBOARD_STORIES_NEW(payload)),
        submit: () => dispatch(DASHBOARD_STORIES_SUBMIT_REQUEST()),
    }
}

export default connect(null, matchDispatchToProps)(DashboardAttraction);
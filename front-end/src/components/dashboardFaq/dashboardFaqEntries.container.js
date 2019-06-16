import { connect } from "react-redux";
import DashboardFaqEntries from './dashboardFaqEntries';
import {
    DASHBOARD_FAQ_WATCH,
    DASHBOARD_FAQ_EDIT
} from "../../actions/dashboardFaq";

function matchDispatchToProps(dispatch){
    return {
        watch: (payload) => dispatch(DASHBOARD_FAQ_WATCH(payload)),
        edit: (payload) => dispatch(DASHBOARD_FAQ_EDIT(payload)),

    }
}

export default connect(null, matchDispatchToProps)(DashboardFaqEntries);
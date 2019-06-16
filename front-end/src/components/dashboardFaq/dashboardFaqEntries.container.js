import { connect } from "react-redux";
import DashboardFaqEntries from './dashboardFaqEntries';
import {
    DASHBOARD_FAQ_WATCH,
} from "../../actions/dashboardFaq";

function matchDispatchToProps(dispatch){
    return {
        watch: (payload) => dispatch(DASHBOARD_FAQ_WATCH(payload)),
    }
}

export default connect(null, matchDispatchToProps)(DashboardFaqEntries);
import { connect } from "react-redux";
import DashboardHomeEntries from './dashboardHomeMission';
import {
    DASHBOARD_HOME_WATCH,
} from "../../actions/dashboardHome";

function mapStateToProps(state) {
    return {
        displayedData: state.dashboardHome.displayedData.objective,
    };
}

function matchDispatchToProps(dispatch){
    return {
        watch: (payload) => dispatch(DASHBOARD_HOME_WATCH(payload)),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardHomeEntries);
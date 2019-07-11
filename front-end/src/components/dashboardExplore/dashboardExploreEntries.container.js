import { connect } from "react-redux";
import DashboardExploreEntries from './dashboardExploreEntries';
import {
    DASHBOARD_EXPLORE_WATCH,
} from "../../actions/dashboardExplore";

function mapStateToProps(state) {
    return {
        displayedData: state.dashboardExplore.displayedData,
    };
}

function matchDispatchToProps(dispatch){
    return {
        watch: (payload) => dispatch(DASHBOARD_EXPLORE_WATCH(payload)),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardExploreEntries);
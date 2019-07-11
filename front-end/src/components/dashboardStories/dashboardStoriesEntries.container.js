import { connect } from "react-redux";
import DashboardStoriesEntries from './dashboardStoriesEntries';
import {
    DASHBOARD_STORIES_WATCH,
} from "../../actions/dashboardStories";

function mapStateToProps(state) {
    return {
        displayedData: state.dashboardStories.displayedData,
    };
}

function matchDispatchToProps(dispatch){
    return {
        watch: (payload) => dispatch(DASHBOARD_STORIES_WATCH(payload)),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardStoriesEntries);
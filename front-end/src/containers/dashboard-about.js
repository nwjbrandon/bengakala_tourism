import {connect} from "react-redux";
import DashboardFAQ from '../routers/dashboard/about';
import {
    DASHBOARD_ABOUT_INSERT,
    DASHBOARD_ABOUT_RESET,
    DASHBOARD_ABOUT_UPDATE,
    DASHBOARD_ABOUT_ONMOUNT
} from "../actions/dashboard-about";

function mapStateToProps(state) {
    return {
        data: state.dashboardAbout.displayedData,
        origin: state.dashboardAbout.originalData
    };
}

function matchDispatchToProps(dispatch){
    return {
        insert: (payload) => dispatch(DASHBOARD_ABOUT_INSERT(payload)),
        update: (payload) => dispatch(DASHBOARD_ABOUT_UPDATE(payload)),
        reset: () => dispatch(DASHBOARD_ABOUT_RESET()),
        onMount: () => dispatch(DASHBOARD_ABOUT_ONMOUNT()),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardFAQ);
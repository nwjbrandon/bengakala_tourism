import { connect } from "react-redux";
import DashboardFaq from '../routers/dashboard/faq';
import {
    DASHBOARD_FAQ_ONMOUNT_REQUEST,
    DASHBOARD_FAQ_DELETE,
    DASHBOARD_FAQ_RESET,
    DASHBOARD_FAQ_NEW,
    DASHBOARD_FAQ_SUBMIT_REQUEST,
} from "../actions/dashboardFaq";

function mapStateToProps(state) {
    return {
        displayedData: state.dashboardFaq.displayedData,
    };
}

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(DASHBOARD_FAQ_ONMOUNT_REQUEST()),
        deleteEntry: (payload) => dispatch(DASHBOARD_FAQ_DELETE(payload)),
        resetEntries: () => dispatch(DASHBOARD_FAQ_RESET()),
        saveEntry: (payload) => dispatch(DASHBOARD_FAQ_NEW(payload)),
        submit: () => dispatch(DASHBOARD_FAQ_SUBMIT_REQUEST()),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardFaq);
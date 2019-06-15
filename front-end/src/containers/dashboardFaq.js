import { connect } from "react-redux";
import DashboardFaq from '../routers/dashboard/faq';
import { DASHBOARD_FAQ_ONMOUNT_REQUEST } from "../actions/dashboard-faq-onmount";

function mapStateToProps(state) {
    return {
        displayedData: state.dashboardFaq.displayedData,
    };
}

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(DASHBOARD_FAQ_ONMOUNT_REQUEST()),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardFaq);
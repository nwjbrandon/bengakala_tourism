import { connect } from "react-redux";
import DashboardContact from './index';
import {
    DASHBOARD_CONTACT_ONMOUNT_REQUEST,
    DASHBOARD_CONTACT_RESET,
    DASHBOARD_CONTACT_SUBMIT_REQUEST,
} from "../../../actions/dashboardContact";

function mapStateToProps(state) {
    return {
        displayedData: state.dashboardContact.displayedData,
    };
}

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(DASHBOARD_CONTACT_ONMOUNT_REQUEST()),
        resetEntries: () => dispatch(DASHBOARD_CONTACT_RESET()),
        submit: () => dispatch(DASHBOARD_CONTACT_SUBMIT_REQUEST()),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardContact);
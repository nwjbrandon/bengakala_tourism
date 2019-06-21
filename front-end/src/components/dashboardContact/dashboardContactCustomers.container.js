import { connect } from "react-redux";
import DashboardContactCustomers from './dashboardContactCustomers';
import {
    DASHBOARD_CONTACT_WATCH,
    DASHBOARD_CONTACT_DELETE_REQUEST,
} from "../../actions/dashboardContact";

function mapStateToProps(state) {
    return {
        displayedData: state.dashboardContact.displayedData.customer,
    };
}

function matchDispatchToProps(dispatch){
    return {
        watch: (payload) => dispatch(DASHBOARD_CONTACT_WATCH(payload)),
        del: (payload) => dispatch(DASHBOARD_CONTACT_DELETE_REQUEST(payload)),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardContactCustomers);
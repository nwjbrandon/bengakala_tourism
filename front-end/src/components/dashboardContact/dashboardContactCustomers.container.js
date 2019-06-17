import { connect } from "react-redux";
import DashboardContactCustomers from './dashboardContactCustomers';
import {
    DASHBOARD_CONTACT_WATCH,
} from "../../actions/dashboardContact";

function mapStateToProps(state) {
    return {
        displayedData: state.dashboardContact.displayedData.customer,
    };
}

function matchDispatchToProps(dispatch){
    return {
        watch: (payload) => dispatch(DASHBOARD_CONTACT_WATCH(payload)),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardContactCustomers);
import { connect } from "react-redux";
import DashboardContactDetails from './dashboardContactDetails';
import {
    DASHBOARD_CONTACT_WATCH,
} from "../../actions/dashboardContact";

function mapStateToProps(state) {
    return {
        displayedData: state.dashboardContact.displayedData.contact,
    };
}

function matchDispatchToProps(dispatch){
    return {
        watch: (payload) => dispatch(DASHBOARD_CONTACT_WATCH(payload)),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardContactDetails);
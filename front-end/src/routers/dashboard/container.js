import { connect } from "react-redux";
import Dashboard from './index';
import {
    DASHBOARD_ONMOUNT_REQUEST,
    DASHBOARD_CHECKIN_REQUEST,
    DASHBOARD_DELETE_CHECKIN_REQUEST,
    DASHBOARD_VERIFY_REQUEST
} from "../../actions/dashboard";

function mapStateToProps(state) {
    return {
        heatmap: state.dashboard.heatmap,
        transactions: state.dashboard.transactions,
        auth: state.admin.auth,
    };
}



function matchDispatchToProps(dispatch) {
    return {
        onMount: () => dispatch(DASHBOARD_ONMOUNT_REQUEST()),
        checkIn: (payload) => dispatch(DASHBOARD_CHECKIN_REQUEST(payload)),
        delCheckIn: (payload) => dispatch(DASHBOARD_DELETE_CHECKIN_REQUEST(payload)),
        verify: (payload) => dispatch(DASHBOARD_VERIFY_REQUEST(payload)),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);
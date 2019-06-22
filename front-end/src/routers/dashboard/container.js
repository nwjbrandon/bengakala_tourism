import { connect } from "react-redux";
import Dashboard from './index';
import { DASHBOARD_ONMOUNT_REQUEST, DASHBOARD_CHECKIN_REQUEST } from "../../actions/dashboard";

function mapStateToProps(state) {
    return {
        heatmap: state.dashboard.heatmap,
        transactions: state.dashboard.transactions,
    };
}

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(DASHBOARD_ONMOUNT_REQUEST()),
        checkIn: (payload) => dispatch(DASHBOARD_CHECKIN_REQUEST(payload)),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);
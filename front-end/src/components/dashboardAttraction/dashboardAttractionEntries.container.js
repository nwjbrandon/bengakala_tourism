import { connect } from "react-redux";
import DashboardAttractionEntries from './dashboardAttractionEntries';
import {
    DASHBOARD_ATTRACTION_WATCH,
} from "../../actions/dashboardAttraction";

function mapStateToProps(state) {
    return {
        displayedData: state.dashboardAttraction.displayedData,
    };
}

function matchDispatchToProps(dispatch){
    return {
        watch: (payload) => dispatch(DASHBOARD_ATTRACTION_WATCH(payload)),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardAttractionEntries);
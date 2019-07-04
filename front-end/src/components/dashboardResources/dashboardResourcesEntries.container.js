import { connect } from "react-redux";
import DashboardAttractionEntries from './dashboardResourcesEntries';
import {
    DASHBOARD_RESOURCES_WATCH,
} from "../../actions/dashboardResources";

function mapStateToProps(state) {
    return {
        displayedData: state.dashboardResources.displayedData,
    };
}

function matchDispatchToProps(dispatch){
    return {
        watch: (payload) => dispatch(DASHBOARD_RESOURCES_WATCH(payload)),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardAttractionEntries);
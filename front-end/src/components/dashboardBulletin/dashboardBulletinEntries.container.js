import { connect } from "react-redux";
import DashboardAttractionEntries from './dashboardBulletinEntries';
import {
    DASHBOARD_ATTRACTION_WATCH,
} from "../../actions/dashboardBulletin";

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
import { connect } from "react-redux";
import DashboardAttractionEntries from './dashboardBulletinEntries';
import {
    DASHBOARD_BULLETIN_WATCH,
} from "../../actions/dashboardBulletin";

function mapStateToProps(state) {
    return {
        displayedData: state.dashboardBulletin.displayedData,
    };
}

function matchDispatchToProps(dispatch){
    return {
        watch: (payload) => dispatch(DASHBOARD_BULLETIN_WATCH(payload)),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(DashboardAttractionEntries);
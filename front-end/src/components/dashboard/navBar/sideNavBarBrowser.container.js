import { connect } from "react-redux";
import SideBar from './sideNavBarBrowser';
import {
    ADMIN_LOGOUT_REQUEST
} from "../../../actions/admin";

function matchDispatchToProps(dispatch){
    return {
        logout: () => dispatch(ADMIN_LOGOUT_REQUEST()),
    }
}

export default connect(null, matchDispatchToProps)(SideBar);
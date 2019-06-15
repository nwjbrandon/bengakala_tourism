import { connect } from "react-redux";
import Admin from '../routers/admin';
import { ADMIN_LOGIN_REQUEST } from "../actions/admin-login";

function mapStateToProps(state) {
    return {
    };
}

function matchDispatchToProps(dispatch){
    return {
        login: (payload) => dispatch(ADMIN_LOGIN_REQUEST(payload)),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Admin);
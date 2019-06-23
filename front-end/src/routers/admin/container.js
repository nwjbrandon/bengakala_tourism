import { connect } from "react-redux";
import Admin from './index';
import { ADMIN_LOGIN_REQUEST } from "../../actions/admin";

function matchDispatchToProps(dispatch){
    return {
        login: (payload) => dispatch(ADMIN_LOGIN_REQUEST(payload)),
    }
}

export default connect(null, matchDispatchToProps)(Admin);
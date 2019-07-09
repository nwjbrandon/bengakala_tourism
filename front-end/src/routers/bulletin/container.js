import { connect } from "react-redux";
import Media from './index';
import {
    BULLETIN_ONMOUNT_REQUEST,
} from "../../actions/bulletin";

function matchStateToProps(state) {
    return {
        data: state.bulletin.data,
    }
}

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(BULLETIN_ONMOUNT_REQUEST()),
    }
}

export default connect(matchStateToProps, matchDispatchToProps)(Media);
import { connect } from "react-redux";
import Resources from './index';
import {
    RESOURCES_ONMOUNT_REQUEST,
} from "../../actions/resources";

function matchStateToProps(state) {
    return {
        data: state.resources.data,
    }
}

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(RESOURCES_ONMOUNT_REQUEST()),
    }
}

export default connect(matchStateToProps, matchDispatchToProps)(Resources);
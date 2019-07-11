import { connect } from "react-redux";
import Resources from './index';
import {
    EXPLORE_ONMOUNT_REQUEST,
} from "../../actions/explore";

function matchStateToProps(state) {
    return {
        data: state.explore.data,
    }
}

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(EXPLORE_ONMOUNT_REQUEST()),
    }
}

export default connect(matchStateToProps, matchDispatchToProps)(Resources);
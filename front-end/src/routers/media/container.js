import { connect } from "react-redux";
import Media from './index';
import {
    ATTRACTION_ONMOUNT_REQUEST,
} from "../../actions/attraction";

function matchStateToProps(state) {
    return {
        data: state.attraction.data,
    }
}

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(ATTRACTION_ONMOUNT_REQUEST()),
    }
}

export default connect(matchStateToProps, matchDispatchToProps)(Media);
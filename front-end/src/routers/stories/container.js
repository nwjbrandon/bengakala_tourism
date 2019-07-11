import { connect } from "react-redux";
import Media from './index';
import {
    STORIES_ONMOUNT_REQUEST,
} from "../../actions/stories";

function matchStateToProps(state) {
    return {
        data: state.stories.data,
    }
}

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(STORIES_ONMOUNT_REQUEST()),
    }
}

export default connect(matchStateToProps, matchDispatchToProps)(Media);
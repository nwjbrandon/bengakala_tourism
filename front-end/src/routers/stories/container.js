import { connect } from "react-redux";
import Media from './index';
import {
    STORIES_ONMOUNT_REQUEST,
} from "../../actions/stories";

function matchStateToProps(state) {
    return {
        pageStories: state.stories.data.pageStories,
        latestStories: state.stories.data.latestStories,
    }
}

function matchDispatchToProps(dispatch){
    return {
        onMount: (payload) => dispatch(STORIES_ONMOUNT_REQUEST(payload)),
    }
}

export default connect(matchStateToProps, matchDispatchToProps)(Media);
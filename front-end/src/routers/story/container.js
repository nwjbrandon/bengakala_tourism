import { connect } from "react-redux";
import Story from './index';
import {
    STORY_ONMOUNT_REQUEST,
} from "../../actions/story";

function matchStateToProps(state) {
    return {
        latestStories: state.story.latestStories,
        story: state.story.story,
    }
}

function matchDispatchToProps(dispatch){
    return {
        onMount: (payload) => dispatch(STORY_ONMOUNT_REQUEST(payload)),
    }
}

export default connect(matchStateToProps, matchDispatchToProps)(Story);
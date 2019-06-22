import { connect } from "react-redux";
import Content from './content';
import {
    HOME_ONMOUNT_REQUEST,
} from "../../actions/home";

function mapStateToProps(state) {
    return {
        stories: state.home.data.stories,
        mission: state.home.data.mission,
    };
}

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(HOME_ONMOUNT_REQUEST()),
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Content);
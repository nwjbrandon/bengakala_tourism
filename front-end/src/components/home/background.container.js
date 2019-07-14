import { connect } from "react-redux";
import Background from './background';
function mapStateToProps(state) {
    return {
        mission: state.home.data.mission,
    };
}

export default connect(mapStateToProps)(Background);
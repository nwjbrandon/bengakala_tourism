import { connect } from "react-redux";
import FAQ from './index';
import {
    FAQ_ONMOUNT_REQUEST,
} from "../../actions/faq";

function matchStateToProps(state) {
    return {
        data: state.faq.data.groupedFaqs,
        searchData: state.faq.data.ungroupedFaqs,
    }
}

function matchDispatchToProps(dispatch){
    return {
        onMount: () => dispatch(FAQ_ONMOUNT_REQUEST()),
    }
}

export default connect(matchStateToProps, matchDispatchToProps)(FAQ);
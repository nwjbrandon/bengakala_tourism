import { connect } from "react-redux";
import SuccessSnackBar from './successSnackBar';
import { TOAST_SUCCESS_CLEAR } from '../../actions/toast'

function mapStateToProps(state) {
    return {
        open: state.toast.success_open,
        message: state.toast.success_msg
    };
}

function matchDispatchToProps(dispatch){
    return {
        close: () => dispatch(TOAST_SUCCESS_CLEAR()),
    }
}


export default connect(mapStateToProps, matchDispatchToProps)(SuccessSnackBar);
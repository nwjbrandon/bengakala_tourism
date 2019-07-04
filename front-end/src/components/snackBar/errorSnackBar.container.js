import { connect } from "react-redux";
import ErrorSnackBar from './errorSnackBar';
import { TOAST_ERROR_CLEAR } from '../../actions/toast'

function mapStateToProps(state) {
    return {
        open: state.toast.error_open,
        message: state.toast.error_msg
    };
}

function matchDispatchToProps(dispatch){
    return {
        close: () => dispatch(TOAST_ERROR_CLEAR()),
    }
}


export default connect(mapStateToProps, matchDispatchToProps)(ErrorSnackBar);
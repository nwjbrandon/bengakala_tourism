const authUser = (state = false, action) => {
    switch (action.type) {
        case 'USER_AUTH':
            return true;
        case 'USER_SIGN_OUT':
            return false;
        default:
            return state
    }
}

export default authUser

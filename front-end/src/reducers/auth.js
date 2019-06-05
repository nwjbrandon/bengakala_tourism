const authUser = (state = false, action) => {
    switch (action.type) {
        case 'USER_AUTH':
            return true
        default:
            return state
    }
}

export default authUser

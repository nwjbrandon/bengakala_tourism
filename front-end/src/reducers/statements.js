const initialState = {
    user: null,
    organisation: null,
    token: null,
    cypher: null,
    someKey: null,
}

const auth = (state = false, action) => {
    switch (action.type) {
        case 'USER_AUTH':
            return true;
        case 'USER_SIGN_OUT':
            return false;
        default:
            return { initialState, token: ['hihji']}
    }
}

export default auth

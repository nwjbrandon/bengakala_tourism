import API from '../api';

export const signIn = () => {
    console.log('You are logging in');
    return {
        type: 'USER_AUTH',
        payload: true
    }
};

export const signOut = () => {
    console.log('You are logging out');
    return {
        type: 'USER_SIGN_OUT',
        payload: false
    }
};
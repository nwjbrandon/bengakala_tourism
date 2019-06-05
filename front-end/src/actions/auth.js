export const signIn = () => {
    console.log('You are logging in');
    return {
        type: 'USER_AUTH',
        payload: true
    }
};
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, secret, to, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        secret && !auth ?
            <Redirect to={{ pathname: '/admin', state: { from: props.location }}} /> : <Component {...props} />
    )} />
);

function mapStateToProps(state) {
    return {
        auth: state.admin.auth,
    };
}

export default connect(mapStateToProps)(ProtectedRoute);

import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class AdminRoute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            authenticated: false,
        }
    }

    render() {
        const { component:Components, ...rest } = this.props;
        return (
            this.state.isLoading ? <div></div> :
            this.state.authenticated ? <Route {...rest} render={(props) => <Components {...props} />} /> : 
            <Redirect to="/" />
        )
    }
}

export default AdminRoute;
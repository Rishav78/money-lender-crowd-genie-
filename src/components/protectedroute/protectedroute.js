import React, { useState, useEffect, Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { render } from '@testing-library/react';
import { fire } from '../../config/firebase';



class ProtectedRoute extends Component{
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            isLoading: true,
        }
    }

    componentDidMount() {
        const unsubscribe = fire.auth().onAuthStateChanged( user => {
            if (user) {
                return this.setState({ isLoading: false, authenticated: true });
            }
            return this.setState({ isLoading: false, authenticated: false });
            unsubscribe();
        });
    }

    render(){
        const { component:Components, ...rest } = this.props;
        return (
            this.state.isLoading ? <div></div> :
            this.state.authenticated ? <Route {...rest} render={(props) => <Components {...props} />} /> : 
            <Redirect to="/" />
        )
    }
}

export default ProtectedRoute;
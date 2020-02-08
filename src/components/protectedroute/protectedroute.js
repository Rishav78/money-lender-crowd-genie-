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
        fire.auth().onAuthStateChanged( async user => {
            if (user) {
                await this.setState({ authenticated: true});
            }
            await this.setState({ isLoading: false });
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
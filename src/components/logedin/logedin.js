import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { fire } from '../../config/firebase';

class Logedin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            isLoading: true,
        }
    }

    componentDidMount() {
        fire.auth().onAuthStateChanged( async user => {
            const isLoading = false;
            let authenticated = false;
            if (user) {
                authenticated = true
            }
            await this.setState({ authenticated, isLoading });
        });
    }

    render(){
        const { component:Components, ...rest } = this.props;
        return (
            this.state.isLoading ? <div></div> :
            this.state.authenticated ? <Redirect to="/home" />:
            <Route {...rest} render={(props) => <Components {...props} />} />
        )
    }
}

export default Logedin;
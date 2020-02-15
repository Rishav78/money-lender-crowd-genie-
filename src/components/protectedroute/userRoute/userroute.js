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
        fire.auth().onAuthStateChanged( user => {
            if ( user ) {
                const ref = fire.database().ref().child('user').orderByChild('email').equalTo(1);
                ref.on('value', userinformation => {
                    const { active, role } = userinformation;
                    if ( !active ) {
                        return this.setState({ isLoading: false, authenticated: false });
                    } else {
                        if ( role === 0 ) {
                            
                        }
                    }
                });

            } else {
                return this.setState({ isLoading: false, authenticated: false });
            }
            
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
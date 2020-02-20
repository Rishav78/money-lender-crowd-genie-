import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { fire } from '../../../config/firebase';

class MoneylenderRoute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            authenticated: false,
            redirect: '',
        };
    }

    componentDidMount() {
        const user = fire.auth().currentUser;
        if ( user ) {
            const { email } = user;
            const ref = fire.database().ref().child('user').orderByChild('email').equalTo(email);
            ref.on('value', async userdata => {
                const [data] = Object.values(userdata);
            });
        } else {

        }
        return this.setState({ isLoading: false, authenticated: false });
    }

    render() {
        const { component:Components, ...rest } = this.props;
        return (
            this.state.isLoading ? <div></div> :
            this.state.authenticated ? <Route {...rest} render={(props) => <Components {...props} />} /> : 
            <Redirect to="/" />
        );
    }
}
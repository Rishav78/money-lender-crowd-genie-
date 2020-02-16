import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { fire } from '../../config/firebase';

class Logedin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            isLoading: true,
            redirect: ''
        }
    }

    authenticate = async user => {
        const isLoading = false;
        let authenticated = false;
        if (user) {
            authenticated = true
        }
        await this.setState({ authenticated, isLoading });
    }

    componentDidMount() {
        const unsubscribe = fire.auth().onAuthStateChanged(async user => {
            if ( user ) {
                const { email } = user;
                const ref = fire.database().ref().child('user').orderByChild('email').equalTo(email);
                ref.on('value', async userinformation => {
                    const [data] = Object.values(userinformation.val());
                    const { role } = data;
                    if ( role === 0) {
                        await this.setState({ redirect: '/admin/moneylenders'});
                    } else if ( role === 1 ) {
                        await this.setState({ redirect: '/user/moneylenders' });
                    } else {
                        await this.setState({ redirect: '/moneylender/users'});
                    }
                    await this.setState({ isLoading: false, authenticated: true });
                    ref.off('value');
                });
            } else {
                await this.setState({ isLoading: false, authenticated: false });
            }
            unsubscribe();
        });
    }

    render(){
        const { component:Components, ...rest } = this.props;
        return (
            this.state.isLoading ? <div></div> :
            this.state.authenticated ? <Redirect to={this.state.redirect} />:
            <Route {...rest} render={(props) => <Components {...props} />} />
        )
    }
}

export default Logedin;
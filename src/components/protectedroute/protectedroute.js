import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { fire } from '../../config/firebase';

class ProtectedRoute extends Component{
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            isLoading: true,
        }
    }

    authenticate = () => {
        const user = fire.auth().currentUser;
        if ( !user ) {
            return this.setState({ 'authenticated': false, 'isLoading': false });
        }
        const { email } = user;
        const ref = fire.database().ref().child('user').orderByChild('email').equalTo(email);
        ref.on('value', userinformation => {
            const [ data ] = Object.values(userinformation.val());
            const { role } = data;
            if ( role === this.props.role ) {
                return this.setState({ 'authenticated': true, 'isLoading': false });
            } 
            else {
                return this.setState({ 'authenticated': false, 'isLoading': false });
            }
        });
    }

    componentDidMount() {
        this.authenticate();
    }

    render(){
        const { component:Components, role, ...rest } = this.props;
        return (
            this.state.isLoading ? <div></div> :
            this.state.authenticated ? <Route {...rest} render={(props) => <Components {...props} />} /> : 
            <Redirect to="/" />
        )
    }
}

export default ProtectedRoute;
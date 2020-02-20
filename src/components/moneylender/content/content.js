import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChangePassword from '../../changepassword/changepassword';
import Users from './loans/loans';
import LoanRequests from './loanrequests/loanrequests';


function Content(props) {
    return (
        <Switch>
            <Route path="/moneylender/changepassword" component={ChangePassword} />
            <Route path="/moneylender/users" component={Users} />
            <Route path="/moneylender/loanrequests" component={LoanRequests} />
        </Switch>
    );
}

export default Content;
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Moneylender from './moneylenders/moneylenders';
import Changepassword from '../../changepassword/changepassword';
import Loans from './loans/loans';

function Content(props) {
    return (
        <Switch>
            <Route path="/user/moneylenders" component={Moneylender} />
            <Route path="/user/loans" component={Loans} />
            <Route path="/user/changepassword" component={Changepassword} />
        </Switch>
    );
}

export default Content;
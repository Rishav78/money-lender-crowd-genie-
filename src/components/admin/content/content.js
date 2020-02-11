import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChangePassword from '../../changepassword/changepassword';
import Moneylender from './moneylender/moneylender';
import Users from './user/users';

function Content(props) {
    return (
        <Switch>
            <Route path="/admin/changepassword" component={ChangePassword} />
            <Route path="/admin/users" component={Users} />
            <Route path="/admin/moneylenders" component={Moneylender} />
        </Switch>
    );
}

export default Content;
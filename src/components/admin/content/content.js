import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChangePassword from '../../changepassword/changepassword';
import Moneylender from '../../moneylender/moneylender';
import Users from '../../user/users';

function Content(props) {
    return (
        <Switch>
            <Route path="/home/changepassword" component={ChangePassword} />
            <Route path="/home/users" component={Users} />
            <Route path="/home/moneylenders" component={Moneylender} />
        </Switch>
    );
}

export default Content;
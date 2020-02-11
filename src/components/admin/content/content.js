import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChangePassword from '../../changepassword/changepassword';

function Content(props) {
    return (
        // <Router>
            <Switch>
                <Route path="/home/changepassword" component={ChangePassword} />
                <Route path="/home/users" component={ChangePassword} />
                <Route path="/home/moneylenders" component={ChangePassword} />
            </Switch>
        // </Router>
    );
}

export default Content;
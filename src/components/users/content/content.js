import React from 'react';
import { Switch, Route } from 'react-router-dom';

function Content(props) {
    return (
        <Switch>
            <Route path="/user/moneylenders" />
            <Route path="" />
        </Switch>
    );
}

export default Content;
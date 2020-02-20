import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import ProtectedRoute from './components/protectedroute/protectedroute';
import './App.css';
import Logedin from './components/logedin/logedin';
import Admin from './components/admin/admin';
import Users from './components/users/users';
import Moneylender from './components/moneylender/moneylender';

function App() {
  return (
    <div className="container" style={{ width: '100%', height: '100vh'}}>
      <Router>
        <Switch>
          <Logedin exact path="/" component={Login} />
          <Logedin path="/signup" component={Signup} />
          <ProtectedRoute path="/admin" role={0} component={Admin} />
          <ProtectedRoute path="/user" role={1} component={Users} />
          <ProtectedRoute path="/moneylender" role={2} component={Moneylender} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

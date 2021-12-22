import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/navBar';
import Login from './layouts/login';
import Main from './layouts/main';
import Users from './layouts/users';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
      </Switch>
    </>
  );
}

export default App;

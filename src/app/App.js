import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Login from './layouts/login';
import Main from './layouts/main';
import Users from './layouts/users';
import NotFound from './layouts/notFound';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/users/:userId?" component={Users} />
        <Route exact path="/" component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </>
  );
}

export default App;

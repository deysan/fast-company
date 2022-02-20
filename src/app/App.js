import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Login from './layouts/login';
import Main from './layouts/main';
import Users from './layouts/users';
import NotFound from './layouts/notFound';
import { ToastContainer } from 'react-toastify';

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <NavBar />
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route path="/users/:userId?/:edit?" component={Users} />
        <Route exact path="/" component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;

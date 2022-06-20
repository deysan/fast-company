import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Login from './layouts/login';
import Main from './layouts/main';
import Users from './layouts/users';
import NotFound from './layouts/notFound';
import { ToastContainer } from 'react-toastify';
import { ProfessionProvider } from './hooks/useProfession';
// import { QualitiesProvider } from './hooks/useQualities';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logOut';
import { useDispatch } from 'react-redux';
import { loadQualitiesList } from './store/qualities';

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  return (
    <>
      <AuthProvider>
        <NavBar />
        {/* <QualitiesProvider> */}
        <ProfessionProvider>
          <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route exact path="/" component={Main} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </ProfessionProvider>
        {/* </QualitiesProvider> */}
      </AuthProvider>

      <ToastContainer />
    </>
  );
}

export default App;

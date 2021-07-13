import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getAuth as listAuth } from "./redux/actions/authActions"

import {
  Switch,
  Route,
  useLocation
} from 'react-router-dom';


// Styles
import './css/style.scss';

import { focusHandling } from 'cruip-js-toolkit';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Users from "./pages/Users"
import Login from "./pages/Login";
import Signup from "./pages/Signup"

function App() {

  const dispatch = useDispatch();

  const getAuth = useSelector((state) => state.getAuth);
  const { auth } = getAuth;

  useEffect(() => {
    dispatch(listAuth());
  }, [dispatch]);



  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change



  let home = "/dashboard"
  let login = "/login"
  let users = "/users"
  let signup = "/signup"


  console.log(auth)

  return (
    <>
      <Switch>
        <Route exact path={home}>
          {auth._id && (<Dashboard />)}
        </Route>
        <Route exact path={login}><Login /></Route>
        <Route exact path="/"><Login /></Route>
        <Route exact path={users}><Users /></Route>
        <Route exact path={signup}><Signup /></Route>

      </Switch>
    </>
  );
}

export default App;

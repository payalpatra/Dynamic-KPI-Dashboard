import React, { useEffect } from 'react';


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
import Messages from "./pages/Messages"

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
    focusHandling('outline');
  }, [location.pathname]); 

  let Data = [
    { ActualSales: [1600, 900, 1300, 2450, 3700, 4000] },
    { TargetSales: [2600, 5350, 4800, 5200, 4800, 5000] },
    {
      MLabels: [
        "01-01-2021",
        "02-01-2021",
        "03-01-2021",
        "04-01-2021",
        "05-01-2021",
        "06-01-2021",
      ],
    },
    { CapexData: [9200, 6600, 8800, 5200, 9200, 6600] },
    { DividendsData: [2600, 5350, 4000, 7500, 2000, 1700] },
    {
      Clabels: [
        "01-01-2021",
        "02-01-2021",
        "03-01-2021",
        "04-01-2021",
        "05-01-2021",
        "06-01-2021",
      ],
    },
    { customerSatisfaction: ["60", "30", "20"] },
  ];

  if (!JSON.parse(localStorage.getItem("graphs"))) {
    let Graphs = localStorage.setItem("graphs", JSON.stringify(Data));
  }


  let home = "/dashboard"
  let login = "/login"
  let users = "/users"
  let signup = "/signup"
  let messages = "/messages"


  return (
    <>
      <Switch>
        <Route exact path={home}>
          <Dashboard />
        </Route>
        <Route exact path={login}><Login /></Route>
        <Route exact path="/"><Login /></Route>
        <Route exact path={users}><Users /></Route>
        <Route exact path={signup}><Signup /></Route>
        <Route exact path={messages}><Messages /></Route>

      </Switch>
    </>
  );
}

export default App;

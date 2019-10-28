import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import QueryPage from './pages/QueryPage/QueryPage';
import Navbar from './components/Navbar/Navbar';

const Router = () => (
  <div style={{ height: '100vh', minWidth: '100vw' }}>
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route
          exact
          path='/'
          component={App}
        />
        <Route
          path='/query'
          component={QueryPage}
        />
      </Switch>
    </BrowserRouter>
  </div>
);

export default Router;

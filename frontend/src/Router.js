import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import QueryPage from './pages/QueryPage/QueryPage';

const Router = () => (
  <BrowserRouter>
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
);

export default Router;

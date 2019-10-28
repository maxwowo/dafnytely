import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FullSizeLayout from './components/FullSizeLayout/FullSizeLayout';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import QueryPage from './pages/QueryPage/QueryPage';

const Router = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <BrowserRouter>
      <FullSizeLayout>
        <Navbar/>
        <Switch>
          <Route
            exact
            path='/'
            component={LandingPage}
          />
          <Route
            path='/query'
            component={QueryPage}
          />
        </Switch>
      </FullSizeLayout>
    </BrowserRouter>
  </div>
);

export default Router;

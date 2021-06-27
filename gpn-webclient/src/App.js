import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { FilterProvider } from './context';
import MainPage from './components/MainPage';

const App = () => (
  <BrowserRouter>
    <FilterProvider>
      <Switch>
        <Route path="/" exact>
          <Layout>
            <MainPage />
          </Layout>
        </Route>
      </Switch>
    </FilterProvider>
  </BrowserRouter>
);

export default App;

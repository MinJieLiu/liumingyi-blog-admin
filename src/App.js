import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import BasicLayout from './layouts/BasicLayout';
import { AsyncComponent } from './common/dynamic';

const App = () => (
  <LocaleProvider locale={zhCN}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" render={props => <AsyncComponent component={() => import('./routes/Login')} {...props} />} />
        <Route path="/" render={props => <BasicLayout {...props} />} />
      </Switch>
    </BrowserRouter>
  </LocaleProvider>
);

export default App;

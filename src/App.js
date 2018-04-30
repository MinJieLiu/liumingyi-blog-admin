import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import BasicLayout from './layouts/BasicLayout';
import { AuthorizedRoute } from './components/Authorized';
import dynamic from './common/dynamic';

const App = () => (
  <LocaleProvider locale={zhCN}>
    <BrowserRouter>
      <Fragment>
        <Route path="/login" render={dynamic({ component: import('./routes/Login') })} />
        <AuthorizedRoute
          path="/"
          render={props => <BasicLayout {...props} />}
          authority="SYS_INDEX"
          redirectPath="/login"
        />
      </Fragment>
    </BrowserRouter>
  </LocaleProvider>
);

export default App;

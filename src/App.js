import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ThemeProvider } from 'styled-components';
import BasicLayout from './layouts/BasicLayout';
import { AsyncComponent } from './common/dynamic';
import { themeConfig } from './theme';

const App = () => (
  <ThemeProvider theme={themeConfig}>
    <LocaleProvider locale={zhCN}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={props => <AsyncComponent component={() => import('./routes/Login')} {...props} />}
          />
          <Route render={props => <BasicLayout {...props} />} />
        </Switch>
      </BrowserRouter>
    </LocaleProvider>
  </ThemeProvider>
);

export default App;

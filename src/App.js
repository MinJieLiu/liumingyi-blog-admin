import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Authorized from './components/Authorized';

const App = () => {
  return (
    <LocaleProvider locale={zhCN}>
      <BrowserRouter>
        <Route path="/about" render={() => <Authorized authority="admin">hello world</Authorized>} />
      </BrowserRouter>
    </LocaleProvider>
  );
};

export default App;

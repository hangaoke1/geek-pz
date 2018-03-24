import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { Provider } from 'react-redux';
import Store from '@model';

import App from './App';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <Provider store={Store}><App /></Provider>
  </LocaleProvider>, 
  document.getElementById('root'));
// registerServiceWorker();

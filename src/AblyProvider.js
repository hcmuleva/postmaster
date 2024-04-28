import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Authentication from './Authentication';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
// Supported in React 18+
const option = {
  key: process.env.REACT_APP_ABLY_KEY,
  clientId: process.env.REACT_APP_ABLY_CLIENTID,
};
const client = new Ably.Realtime(option);
  return (<AblyProvider client={client}>
      
  </AblyProvider>)

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from "./redux/store";

import axios from "axios";
import { baseURL } from './shared/baseUrl';

axios.defaults.baseURL = baseURL;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

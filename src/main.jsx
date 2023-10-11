import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router} from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';

import store from './redux/store'
import { Provider } from 'react-redux';

import App from './App.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <React.StrictMode>
         <Router>
            <PersistGate loading={null} persistor={persistor}>
               <App />
            </PersistGate>
         </Router>
      </React.StrictMode>
   </Provider>
)

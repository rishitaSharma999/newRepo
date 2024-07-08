import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './App.css'; // import App.css here
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./redux/Store.js";
import { Toaster } from "react-hot-toast";
import { configureStore } from '@reduxjs/toolkit';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Create a root
const store = configureStore({
  reducer:rootReducer,

});


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
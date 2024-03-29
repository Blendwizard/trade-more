import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import GlobalCSS from './ui_components/global.css.js';
import './ui_components/coolicons.css';

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GlobalCSS />
    <App />
  </BrowserRouter>
);
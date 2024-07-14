import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { app } from "./firebaseConfig";
import './fonts.css';
import {NextUIProvider} from "@nextui-org/react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <NextUIProvider>
    <App />
  </NextUIProvider>
);
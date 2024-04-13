import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { ShowAddUserModalContextProvider } from './Context/ShowModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShowAddUserModalContextProvider>
      <RouterProvider router={router} />
    </ShowAddUserModalContextProvider>
  </React.StrictMode>
);
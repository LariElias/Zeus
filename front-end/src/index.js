import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import "./index.css";
import Home from './pages/Home';
import Erro from './pages/Erro';
import { createBrowserRouter , RouterProvider , Route} from 'react-router-dom';
import Historico from './pages/Historico/index.js'

const router = createBrowserRouter([
  {
    element: <App/>,
    children : [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "*",
        element:<Erro/>
      },
      {
        path: "/historico",
        element:<Historico/>
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router ={router}/>
  </React.StrictMode>
);


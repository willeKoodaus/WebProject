import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { RecipesContextProvider } from './context/RecipeContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={"/client"}>
    <AuthContextProvider>
      <RecipesContextProvider>
        <App />
      </RecipesContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
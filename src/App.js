import React, { useState, createContext } from 'react';
import { Routes, Route } from "react-router-dom";
import useScrollbarSize from 'react-scrollbar-size';

import './assets/styles/app.sass';
import { Main } from './pages/Main';
import { ErrorPage } from './pages/ErrorPage';
import { Header, Cart } from './components';
import MainLayout from './layouts/MainLayout';

export const Context = createContext({});

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Main />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;

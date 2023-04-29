import React from "react";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import Main from './pages/Main';
// import ErrorPage from './pages/ErrorPage';
import MainLayout from './layouts/MainLayout';

import './assets/styles/app.sass';

const ErrorPage = React.lazy(() => import(/*webpackChunkName: "ErrorPage"*/ './pages/ErrorPage'))

function App() {

  return (
    // <Suspense>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Main />} />
          {/* В действительности нет смысла выносить такой простой компонент в отдельный чанк, но тут для примера */}
          <Route path="*" element={
            <Suspense fallback="Загрузка...">
              <ErrorPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    /* </Suspense> */
  );
}

export default App;

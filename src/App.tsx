import { Routes, Route } from "react-router-dom";

import './assets/styles/app.sass';
import Main from './pages/Main';
import ErrorPage from './pages/ErrorPage';
import MainLayout from './layouts/MainLayout';

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

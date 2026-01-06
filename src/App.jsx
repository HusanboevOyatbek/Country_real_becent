import { Layout } from 'antd'
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './page/login/LoginPage';
import Layoutadmin from './components/Layout';
import CountrisePage from './page/countrise/CountrisePage';
import CitysPage from './page/citys/CitysPage';
import ToursPaje from './page/tours/ToursPaje';
import HotelsPage from './page/hotels/HotelsPage';
import DestPage from './page/destinations/DestPage';

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route element={token ? <Layoutadmin/> : <Navigate to={"/"}/>}>
          <Route path='countries' element={<CountrisePage/>} />
          <Route path='citys' element={<CitysPage />} />
          <Route path='tours' element={<ToursPaje />} />
          <Route path='hotels' element={<HotelsPage />} />
          <Route path='dest' element={<DestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
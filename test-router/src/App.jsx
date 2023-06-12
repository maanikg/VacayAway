// import React from 'react';
// import MapView from './pages/map/MapView';
import Map, { MapWithRouter } from './pages/map/MapView';
import HomeScreen from './pages/HomeScreen';
import NoPage from './pages/NoPage';
import NavigationBar from './pages/NavigationBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import './css/App.css'
import Trips from './pages/Trips';
import Plan from './pages/Plan';
// import AuthPage from './pages/AuthPage';

export default function App() {
  return (
    // <div style={{ backgroundColor: "blue" }}>
    <div>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          {/* <Route index */}
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/" element={<Layout />}>

            {/* <Route path="/" element={<HomeScreen />}> */}
            <Route index element={<HomeScreen />} />
            {/* <Route path="auth" element={<AuthPage />} /> */}
            <Route path="map" caseSensitive={true} element={<MapWithRouter />} />
            <Route path="plan" caseSensitive={true} element={<Plan />} />
            <Route path="trips" caseSensitive={true} element={<Trips />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* </div> */}
    </div >
  );
}
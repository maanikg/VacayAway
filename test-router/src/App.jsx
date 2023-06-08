// import React from 'react';
import MapView from './pages/map/MapView';
import HomeScreen from './pages/HomeScreen';
import NoPage from './pages/NoPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import './App.css'

export default function App() {
  return (
    // <div style={{ backgroundColor: "blue" }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen />} />
          <Route path="map" element={<MapView />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </div>
    // {/* <MapView />
    // <HomeScreen />
    // <BaseLayout /> */}
  );
}
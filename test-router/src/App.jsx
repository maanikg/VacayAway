// import React from 'react';
import MapView from './pages/map/MapView';
import HomeScreen from './pages/HomeScreen';
import NoPage from './pages/NoPage';
import NavigationBar from './pages/NavigationBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import './css/App.css'
import Trips from './pages/Trips';

export default function App() {
  return (
    // <div style={{ backgroundColor: "blue" }}>
    <div>
      <NavigationBar />
      {/* <div> */}
      <BrowserRouter>
        <Routes>
          {/* <Route index */}
          {/* <Route path="/" element={<Layout />}> */}
          <Route path="/" element={<Layout />}>

            {/* <Route path="/" element={<HomeScreen />}> */}
            <Route index element={<HomeScreen />} />
            <Route path="map" caseSensitive={true} element={<MapView />} />
            <Route path="trips" caseSensitive={true} element={<Trips />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* </div> */}
    </div >
    // </div>
    // {/* <MapView />
    // <HomeScreen />
    // <BaseLayout /> */}
  );
}
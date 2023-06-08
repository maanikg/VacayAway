// import React from 'react';
// import MapView from './MapView';
// import HomeScreen from './HomeScreen';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          {/* <Route index element={<HomeScreen />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>

    // {/* <MapView />
    // <HomeScreen />
    // <BaseLayout /> */}
  );
}
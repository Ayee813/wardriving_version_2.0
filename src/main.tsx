import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import NavBar from "./components/NavBar";
import MapPage from "./pages/MapPage";
import AboutUsPage from "./pages/AboutUsPage";
import AnalysisPage from "./pages/AnalysisPage";
import ContactUs from "./pages/ContactUs";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

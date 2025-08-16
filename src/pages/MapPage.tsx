import React from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapAside from "@/layouts/map_layout/MapAside";
import MapNav from "@/layouts/map_layout/MapNav";

export default function MapPage() {
  return (
    <div className="relative h-[calc(100vh-3rem)] w-full">
      {/* Top navigation bar */}
      <div className="absolute top-0 left-0 right-0 z-[1000] flex justify-center items-center">
        <MapNav />
      </div>

      {/* Right sidebar */}
      <div className="absolute top-12 right-0 z-[1000] h-[calc(100%-3rem)] w-64 bg-white shadow-lg">
        <MapAside />
      </div>

      {/* Map content with padding for nav + aside */}
      <MapContainer
        center={[17.9757, 102.6369]}
        zoom={7}
        minZoom={5}
        maxZoom={18}
        zoomControl={false} // disable default top-left zoom
        className="h-full w-full "
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Add zoom control at bottom-left */}
        <ZoomControl position="bottomleft" />
      </MapContainer>
    </div>
  );
}

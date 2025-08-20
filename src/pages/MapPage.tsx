import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MapAside from "@/layouts/map_layout/MapAside";
import MapNav from "@/layouts/map_layout/MapNav";
import LocationButton from "@/components/map/LocationButton";
//function
import { getCurrentPosition, LocationPosition } from "@/utils/locationUtils";

export default function MapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userLocation, setUserLocation] = useState<LocationPosition | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  //get position
  const handleLocationDetection = async () => {
    try {
      const position = await getCurrentPosition();
      setUserLocation(position);
      console.log("User location:", position);
    } catch (error) {
      console.error("Location detection failed:", error);
      alert(error instanceof Error ? error.message : "Failed to get location");
    }
  };

  // Effect to handle location updates
  useEffect(() => {
    if (userLocation && mapRef.current) {
      // Remove existing marker if any
      if (userMarkerRef.current) {
        mapRef.current.removeLayer(userMarkerRef.current);
      }

      // Zoom to user location
      mapRef.current.setView([userLocation.latitude, userLocation.longitude], 15);

      // Create custom user location icon
      const userLocationIcon = L.divIcon({
        className: 'user-location-marker',
        html: `
          <div style="
            width: 20px;
            height: 20px;
            background: #3b82f6;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
            animation: pulse 2s infinite;
          "></div>
          <style>
            @keyframes pulse {
              0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
              70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
              100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
            }
          </style>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      // Add marker to map
      userMarkerRef.current = L.marker([userLocation.latitude, userLocation.longitude], { 
        icon: userLocationIcon 
      })
      .addTo(mapRef.current)
      .bindPopup(`
        <div>
          <strong>You are here!</strong><br/>
          <small>Lat: ${userLocation.latitude.toFixed(6)}<br/>
          Lng: ${userLocation.longitude.toFixed(6)}</small>
        </div>
      `)
      .openPopup();
    }
  }, [userLocation]);

  //debug
  console.log("user location:", userLocation);

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* Top navigation bar */}
      <div className="absolute top-0 left-0 right-0 z-[1000] flex justify-center items-center">
        <MapNav />
      </div>

      {/* Right sidebar */}
      <div className="absolute top-12 right-0 z-[1000] h-[calc(100%-3rem)] w-84 shadow-lg">
        <MapAside isOpen={sidebarOpen} onToggle={toggleSidebar} />
      </div>

      {/* Map content */}
      <MapContainer
        center={[17.9757, 102.6369]}
        zoom={7}
        minZoom={5}
        maxZoom={18}
        zoomControl={false}
        className="h-full w-full"
        ref={(mapInstance) => {
          if (mapInstance) {
            mapRef.current = mapInstance;
          }
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <ZoomControl position="bottomleft" />
      </MapContainer>

      {/* Location button */}
      <LocationButton
        position="bottomleft"
        onClick={() => handleLocationDetection()}
      />
    </div>
  );
}
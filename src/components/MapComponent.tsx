import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocationButton from "@/components/map/LocationButton";
import { getCurrentPosition, LocationPosition } from "@/utils/locationUtils";

interface MapComponentProps {
  userLocation: LocationPosition | null;
  onLocationUpdate: (location: LocationPosition | null) => void;
  center?: [number, number];
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  className?: string;
  showLocationButton?: boolean;
  locationButtonPosition?: "topleft" | "topright" | "bottomleft" | "bottomright";
  zoomControlPosition?: "topleft" | "topright" | "bottomleft" | "bottomright";
}

export default function MapComponent({
  userLocation,
  onLocationUpdate,
  center = [17.9757, 102.6369],
  zoom = 7,
  minZoom = 5,
  maxZoom = 18,
  className = "h-full w-full",
  showLocationButton = true,
  locationButtonPosition = "bottomleft",
  zoomControlPosition = "bottomleft"
}: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Handle location detection
  const handleLocationDetection = async () => {
    try {
      const position = await getCurrentPosition();
      onLocationUpdate(position);
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

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        zoomControl={false}
        className={className}
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

        <ZoomControl position={zoomControlPosition} />
      </MapContainer>

      {/* Location button */}
      {showLocationButton && (
        <LocationButton
          position={locationButtonPosition}
          onClick={handleLocationDetection}
        />
      )}
    </div>
  );
}
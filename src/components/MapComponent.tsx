import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocationButton from "@/components/map/LocationButton";
import { getCurrentPosition, LocationPosition } from "@/utils/locationUtils";
import { WiFiData } from "@/type/wifi";
import { WiFiMarkers } from "@/components/map/WiFiMarkers";
import { loadCSVFromPath } from "@/utils/csvParser";

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
  
  // WiFi data state
  const [wifiData, setWifiData] = useState<WiFiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load WiFi data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to load from the public folder
        const data = await loadCSVFromPath('/CSV_FILE/Chanthabuly merge all zone.csv');
        
        setWifiData(data);
        console.log(`Successfully loaded ${data.length} WiFi access points`);
      } catch (err) {
        console.error('Error loading WiFi data:', err);
        setError('Failed to load WiFi data. Please check the CSV file path.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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

  // Effect to handle user location updates
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
      {/* Loading indicator */}
      {loading && (
        <div className="absolute top-15 left-1/2 transform -translate-x-1/2 z-[1000] bg-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            <span className="text-sm font-medium">Loading WiFi data...</span>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute top-15 left-1/2 transform -translate-x-1/2 z-[1000] bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg max-w-md">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* WiFi data counter */}
      {!loading && !error && wifiData.length > 0 && (
        <div className="absolute top-15 left-4 z-[1000] bg-white px-4 py-2 rounded-lg shadow-lg">
          <div className="text-sm">
            <span className="font-semibold">Access Points:</span> {wifiData.length}
          </div>
        </div>
      )}

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

        {/* Render WiFi markers when data is loaded */}
        {!loading && !error && wifiData.length > 0 && <WiFiMarkers data={wifiData} />}
      </MapContainer>

      {/* Location button */}
      {showLocationButton && (
        <LocationButton
          position={locationButtonPosition}
          onClick={handleLocationDetection}
        />
      )}

      {/* Signal Strength Legend */}
      {!loading && !error && wifiData.length > 0 && (
        <div className="absolute bottom-20 left-4 z-[1000] bg-white p-3 rounded-lg shadow-lg">
          <div className="text-sm font-semibold mb-2">Signal Strength</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
              <span>Excellent (≥ -50 dBm)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#84cc16' }}></div>
              <span>Good (-50 to -60 dBm)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#eab308' }}></div>
              <span>Fair (-60 to -70 dBm)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f97316' }}></div>
              <span>Poor (-70 to -80 dBm)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ef4444' }}></div>
              <span>Very Poor (&lt; -80 dBm)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
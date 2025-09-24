import React, { useState } from "react";
import MapAside from "@/layouts/map_layout/MapAside";
import MapNav from "@/layouts/map_layout/MapNav";
import MapComponent from "@/components/MapComponent"; // Adjust path as needed
import { LocationPosition } from "@/utils/locationUtils";

export default function MapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userLocation, setUserLocation] = useState<LocationPosition | null>(
    null
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLocationUpdate = (location: LocationPosition | null) => {
    setUserLocation(location);
  };

  // Debug
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
      <MapComponent
        userLocation={userLocation}
        onLocationUpdate={handleLocationUpdate}
        center={[17.9757, 102.6369]}
        zoom={7}
        minZoom={5}
        maxZoom={18}
        className="h-full w-full"
        showLocationButton={true}
        locationButtonPosition="bottomleft"
        zoomControlPosition="bottomleft"
      />
    </div>
  );
}

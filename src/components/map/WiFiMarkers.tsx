import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { WiFiData, getSignalColor, getSignalStrength, getSecurityLevel } from '@/type/wifi';

interface WiFiMarkersProps {
  data: WiFiData[];
}

const createCustomIcon = (signal: number) => {
  const color = getSignalColor(signal);
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
      "></div>
    `,
    className: 'custom-marker',
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

export const WiFiMarkers: React.FC<WiFiMarkersProps> = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !data || data.length === 0) return;

    // Create marker cluster group
    const markerClusterGroup = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        let size = 40;
        
        if (count > 100) {
          size = 60;
        } else if (count > 50) {
          size = 50;
        }
        
        return L.divIcon({
          html: `
            <div style="
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border-radius: 50%;
              width: ${size}px;
              height: ${size}px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: ${size / 3}px;
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            ">
              ${count}
            </div>
          `,
          className: 'marker-cluster',
          iconSize: L.point(size, size),
        });
      },
    });

    // Add markers to cluster group
    data.forEach((wifi) => {
      const security = getSecurityLevel(wifi.AUTHENTICATION);
      
      const marker = L.marker([wifi.latitude, wifi.longitude], {
        icon: createCustomIcon(wifi.signal),
      });

      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif;">
          <div style="font-weight: bold; font-size: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 8px; color: #1f2937;">
            ${wifi.SSID || 'Hidden Network'}
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px;">
            <div>
              <span style="font-weight: 600; color: #4b5563;">Signal:</span>
              <div style="display: inline-block; margin-left: 8px; padding: 2px 8px; border-radius: 4px; background-color: ${getSignalColor(wifi.signal)}; color: white; font-size: 11px;">
                ${wifi.signal} dBm (${getSignalStrength(wifi.signal)})
              </div>
            </div>
            
            <div>
              <span style="font-weight: 600; color: #4b5563;">Security:</span>
              <div style="display: inline-block; margin-left: 8px; padding: 2px 8px; border-radius: 4px; background-color: ${security.color}; color: white; font-size: 11px;">
                ${wifi.AUTHENTICATION}
              </div>
            </div>
            
            <div style="grid-column: span 2;">
              <span style="font-weight: 600; color: #4b5563;">MAC:</span>
              <span style="margin-left: 8px; font-family: monospace; font-size: 11px;">${wifi.BSSID}</span>
            </div>
            
            <div>
              <span style="font-weight: 600; color: #4b5563;">Channel:</span>
              <span style="margin-left: 8px;">${wifi.CHANNEL}</span>
            </div>
            
            <div>
              <span style="font-weight: 600; color: #4b5563;">Frequency:</span>
              <span style="margin-left: 8px;">${wifi.frequency} MHz</span>
            </div>
            
            <div style="grid-column: span 2;">
              <span style="font-weight: 600; color: #4b5563;">Type:</span>
              <span style="margin-left: 8px;">${wifi['RADIO TYPE']}</span>
            </div>
            
            ${wifi.ENCRYPTION ? `
              <div style="grid-column: span 2;">
                <span style="font-weight: 600; color: #4b5563;">Encryption:</span>
                <span style="margin-left: 8px;">${wifi.ENCRYPTION}</span>
              </div>
            ` : ''}
            
            ${wifi.MANUFACTURER ? `
              <div style="grid-column: span 2;">
                <span style="font-weight: 600; color: #4b5563;">Vendor:</span>
                <span style="margin-left: 8px; font-size: 11px;">${wifi.MANUFACTURER}</span>
              </div>
            ` : ''}
            
            <div style="grid-column: span 2; margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #6b7280;">
              <div>Lat: ${wifi.latitude.toFixed(6)}</div>
              <div>Lon: ${wifi.longitude.toFixed(6)}</div>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 300 });
      markerClusterGroup.addLayer(marker);
    });

    // Add cluster group to map
    map.addLayer(markerClusterGroup);

    // Cleanup function
    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, data]);

  return null;
};
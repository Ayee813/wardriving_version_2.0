import React, { useEffect, useMemo } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { WiFiData, getSignalColor, getSignalStrength, getSecurityLevel } from '@/type/wifi';
import { LOCATION_ICONS } from '@/constants/location_icon';

interface WiFiMarkersProps {
  data: WiFiData[];
}

// Cache for custom icons to avoid recreating them
const iconCache = new Map<string, L.Icon>();

const getLocationIcon = (signal: number): string => {
  console.log('Signal value:', signal); // Debug log
  
  // Ensure signal is a number
  const signalValue = typeof signal === 'number' ? signal : parseFloat(signal);
  
  if (isNaN(signalValue)) {
    console.warn('Invalid signal value:', signal);
    return LOCATION_ICONS.red; // Default to red for invalid values
  }
  
  // WiFi signal strength ranges (in dBm - negative values)
  if (signalValue >= -50) {
    console.log('Using green icon for signal:', signalValue);
    return LOCATION_ICONS.green;
  } else if (signalValue >= -70) {
    console.log('Using yellow icon for signal:', signalValue);
    return LOCATION_ICONS.yellow;
  } else {
    console.log('Using red icon for signal:', signalValue);
    return LOCATION_ICONS.red;
  }
};

const createCustomIcon = (signal: number): L.Icon => {
  const iconUrl = getLocationIcon(signal);
  const cacheKey = `${iconUrl}-${signal}`;
  
  if (iconCache.has(cacheKey)) {
    return iconCache.get(cacheKey)!;
  }
  
  console.log('Creating icon with URL:', iconUrl); // Debug log
  
  const icon = L.icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowUrl: undefined,
    className: 'wifi-location-marker',
  });
  
  iconCache.set(cacheKey, icon);
  return icon;
};

// Optimized popup content generator
const createPopupContent = (wifi: WiFiData): string => {
  const security = getSecurityLevel(wifi.AUTHENTICATION);
  const signalStrength = getSignalStrength(wifi.signal);
  const signalColor = getSignalColor(wifi.signal);
  
  return `
    <div style="font-family:system-ui;background:#fff;color:#333;border-radius:8px;overflow:hidden;min-width:320px">
      <div style="background:linear-gradient(135deg,#3b82f6 0%,#2563eb 100%);padding:16px;border-bottom:1px solid #e5e7eb">
        <div style="font-weight:700;font-size:18px;color:#fff;margin-bottom:4px;display:flex;align-items:center;gap:8px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
            <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <line x1="12" y1="20" x2="12.01" y2="20"></line>
          </svg>
          <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${wifi.SSID || '🔒 Hidden Network'}</span>
        </div>
        <div style="font-size:12px;color:#fff;opacity:0.9;font-family:monospace">${wifi.BSSID}</div>
      </div>
      <div style="padding:16px">
        <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
          <div style="flex:1;min-width:140px;padding:10px 12px;border-radius:6px;background:${signalColor}15;border:1.5px solid ${signalColor}">
            <div style="font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Signal Strength</div>
            <div style="font-size:16px;font-weight:700;color:${signalColor};display:flex;align-items:baseline;gap:6px">
              <span>${wifi.signal}</span>
              <span style="font-size:12px;opacity:0.8">dBm</span>
            </div>
            <div style="font-size:11px;font-weight:600;color:${signalColor};margin-top:2px;text-transform:capitalize">${signalStrength}</div>
          </div>
          <div style="flex:1;min-width:140px;padding:10px 12px;border-radius:6px;background:${security.color}15;border:1.5px solid ${security.color}">
            <div style="font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Security</div>
            <div style="font-size:14px;font-weight:700;color:${security.color};display:flex;align-items:center;gap:6px">
              ${security.level === 'high' ? '🔒' : security.level === 'medium' ? '🔓' : '⚠️'}
              <span>${wifi.AUTHENTICATION}</span>
            </div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;padding:12px;background:#f9fafb;border-radius:6px;border:1px solid #e5e7eb">
          <div style="grid-column:span 2">
            <div style="font-size:10px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Radio Type</div>
            <div style="font-size:13px;font-weight:600;color:#333">${wifi['RADIO TYPE']}</div>
          </div>
          <div>
            <div style="font-size:10px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Channel</div>
            <div style="font-size:14px;font-weight:700;color:#3b82f6">${wifi.CHANNEL}</div>
          </div>
          <div>
            <div style="font-size:10px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Frequency</div>
            <div style="font-size:13px;font-weight:600;color:#333">${wifi.frequency} <span style="font-size:11px;opacity:0.7">MHz</span></div>
          </div>
          ${wifi.ENCRYPTION ? `<div style="grid-column:span 2"><div style="font-size:10px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Encryption</div><div style="font-size:13px;font-weight:600;color:#333">${wifi.ENCRYPTION}</div></div>` : ''}
          ${wifi.MANUFACTURER ? `<div style="grid-column:span 2"><div style="font-size:10px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Vendor</div><div style="font-size:13px;font-weight:600;color:#333">${wifi.MANUFACTURER}</div></div>` : ''}
        </div>
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid #e5e7eb;display:flex;gap:16px;font-size:11px;font-family:monospace;color:#6b7280">
          <div style="flex:1"><span style="opacity:0.7">LAT:</span><span style="margin-left:4px;font-weight:600">${wifi.latitude.toFixed(6)}</span></div>
          <div style="flex:1"><span style="opacity:0.7">LON:</span><span style="margin-left:4px;font-weight:600">${wifi.longitude.toFixed(6)}</span></div>
        </div>
      </div>
    </div>
  `;
};

export const WiFiMarkers: React.FC<WiFiMarkersProps> = ({ data }) => {
  const map = useMap();

  // Log icon paths on mount to verify they're loaded correctly
  useEffect(() => {
    console.log('Location Icons:', {
      green: LOCATION_ICONS.green,
      yellow: LOCATION_ICONS.yellow,
      red: LOCATION_ICONS.red
    });
  }, []);

  // Memoize cluster options
  const clusterOptions = useMemo(() => ({
    chunkedLoading: true,
    chunkInterval: 200,
    chunkDelay: 50,
    maxClusterRadius: 50,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    disableClusteringAtZoom: 18,
    spiderfyDistanceMultiplier: 2,
    iconCreateFunction: (cluster: L.MarkerCluster) => {
      const count = cluster.getChildCount();
      let size = 44;
      
      if (count > 100) size = 64;
      else if (count > 50) size = 54;
      
      return L.divIcon({
        html: `<div style="background:linear-gradient(135deg,#3b82f6 0%,#2563eb 50%,#1d4ed8 100%);color:#fff;border-radius:50%;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:${size/2.8}px;border:3px solid #fff;box-shadow:0 4px 12px rgba(59,130,246,0.4),0 2px 4px rgba(0,0,0,0.2)"><span>${count}</span></div>`,
        className: 'marker-cluster',
        iconSize: L.point(size, size),
      });
    },
  }), []);

  useEffect(() => {
    if (!map || !data || data.length === 0) return;

    // Create marker cluster group
    const markerClusterGroup = L.markerClusterGroup(clusterOptions);

    // Batch process markers
    const batchSize = 100;
    let currentIndex = 0;

    const processBatch = () => {
      const endIndex = Math.min(currentIndex + batchSize, data.length);
      const batch: L.Marker[] = [];

      for (let i = currentIndex; i < endIndex; i++) {
        const wifi = data[i];
        
        // Log first few signal values for debugging
        if (i < 5) {
          console.log(`WiFi ${i} - SSID: ${wifi.SSID}, Signal: ${wifi.signal}`);
        }
        
        // Create marker
        const marker = L.marker([wifi.latitude, wifi.longitude], {
          icon: createCustomIcon(wifi.signal),
        });

        // Lazy load popup
        marker.on('click', () => {
          if (!marker.getPopup()) {
            marker.bindPopup(createPopupContent(wifi), { 
              maxWidth: 360,
              className: 'wifi-custom-popup',
              autoPan: true,
              autoPanPadding: [50, 50],
            });
          }
        });

        batch.push(marker);
      }

      markerClusterGroup.addLayers(batch);
      currentIndex = endIndex;

      if (currentIndex < data.length) {
        requestAnimationFrame(processBatch);
      }
    };

    processBatch();
    map.addLayer(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
      markerClusterGroup.clearLayers();
    };
  }, [map, data, clusterOptions]);

  return null;
};
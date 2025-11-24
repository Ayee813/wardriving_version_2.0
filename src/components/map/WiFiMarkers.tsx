import React, { useEffect, useMemo, useRef } from 'react';
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

// Shared icon instances
const iconInstances = {
  green: null as L.Icon | null,
  yellow: null as L.Icon | null,
  red: null as L.Icon | null,
};

const getOrCreateIcon = (color: 'green' | 'yellow' | 'red'): L.Icon => {
  if (!iconInstances[color]) {
    iconInstances[color] = L.icon({
      iconUrl: LOCATION_ICONS[color],
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
      className: 'wifi-location-marker',
    });
  }
  return iconInstances[color]!;
};

const getIconForSignal = (signal: number): L.Icon => {
  const signalValue = typeof signal === 'number' ? signal : parseFloat(signal);
  
  if (isNaN(signalValue) || signalValue < -70) {
    return getOrCreateIcon('red');
  } else if (signalValue >= -50) {
    return getOrCreateIcon('green');
  } else {
    return getOrCreateIcon('yellow');
  }
};

const createSingleWiFiPopup = (wifi: WiFiData): string => {
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
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
  const expandedLayerRef = useRef<L.LayerGroup | null>(null);
  const activeClusterRef = useRef<L.MarkerCluster | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cluster options - always keep clustering, never show all markers
  const clusterOptions = useMemo(() => ({
    chunkedLoading: true,
    chunkInterval: 100,
    chunkDelay: 25,
    maxClusterRadius: (zoom: number) => {
      // Smaller radius at higher zoom for more precise groups
      if (zoom <= 10) return 120;
      if (zoom <= 13) return 80;
      if (zoom <= 15) return 60;
      if (zoom <= 17) return 40;
      return 25;
    },
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: false, // We handle clicks manually
    disableClusteringAtZoom: 25, // Never auto-expand (25 is beyond max zoom)
    removeOutsideVisibleBounds: true,
    animate: true,
    animateAddingMarkers: false,
    iconCreateFunction: (cluster: L.MarkerCluster) => {
      const count = cluster.getChildCount();
      let size = 40;
      let color = '#3b82f6';
      
      if (count > 1000) {
        size = 70;
        color = '#dc2626';
      } else if (count > 500) {
        size = 60;
        color = '#ea580c';
      } else if (count > 100) {
        size = 50;
        color = '#f59e0b';
      } else if (count > 50) {
        size = 45;
        color = '#10b981';
      }
      
      return L.divIcon({
        html: `<div style="background:linear-gradient(135deg,${color},${color}dd);color:#fff;border-radius:50%;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:${Math.floor(size/2.5)}px;border:3px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,0.3);cursor:pointer">${count}</div>`,
        className: 'marker-cluster-wifi',
        iconSize: L.point(size, size),
      });
    },
  }), []);

  useEffect(() => {
    if (!map || !data || data.length === 0) return;

    // Debounce
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      // Clean up existing layers
      if (expandedLayerRef.current) {
        map.removeLayer(expandedLayerRef.current);
        expandedLayerRef.current = null;
        activeClusterRef.current = null;
      }
      
      if (clusterGroupRef.current) {
        map.removeLayer(clusterGroupRef.current);
        clusterGroupRef.current.clearLayers();
      }

      // Create new cluster group
      const clusterGroup = L.markerClusterGroup(clusterOptions);
      clusterGroupRef.current = clusterGroup;

      // Handle cluster click - expand THIS cluster only
      clusterGroup.on('clusterclick', (event: any) => {
        event.originalEvent.stopPropagation();
        
        const cluster = event.layer;
        
        // If clicking the same cluster, collapse it
        if (activeClusterRef.current === cluster && expandedLayerRef.current) {
          map.removeLayer(expandedLayerRef.current);
          expandedLayerRef.current = null;
          activeClusterRef.current = null;
          
          // Show the cluster icon again
          const clusterIcon = cluster.getElement();
          if (clusterIcon) {
            clusterIcon.style.display = '';
          }
          return;
        }
        
        // Remove previous expanded layer and show previous cluster
        if (expandedLayerRef.current) {
          map.removeLayer(expandedLayerRef.current);
          
          // Show the previous cluster icon
          if (activeClusterRef.current) {
            const prevClusterIcon = activeClusterRef.current.getElement();
            if (prevClusterIcon) {
              prevClusterIcon.style.display = '';
            }
          }
        }
        
        // Hide the clicked cluster icon
        const clusterIcon = cluster.getElement();
        if (clusterIcon) {
          clusterIcon.style.display = 'none';
        }
        
        // Get all markers in this cluster
        const childMarkers = cluster.getAllChildMarkers();
        
        // Create new layer group for expanded markers
        const expandedLayer = L.layerGroup();
        expandedLayerRef.current = expandedLayer;
        activeClusterRef.current = cluster;
        
        // Create individual markers at their real coordinates
        childMarkers.forEach((marker: any) => {
          const wifi = marker._wifiData;
          if (wifi) {
            const individualMarker = L.marker([wifi.latitude, wifi.longitude], {
              icon: getIconForSignal(wifi.signal),
              zIndexOffset: 1000, // Show on top of clusters
            });
            
            // Bind popup
            individualMarker.bindPopup(createSingleWiFiPopup(wifi), {
              maxWidth: 360,
              className: 'wifi-custom-popup',
              autoPan: true,
              autoPanPadding: [50, 50],
            });
            
            expandedLayer.addLayer(individualMarker);
          }
        });
        
        // Add expanded markers to map
        expandedLayer.addTo(map);
      });

      // Click on map (not on marker/cluster) to collapse expanded view
      map.on('click', () => {
        if (expandedLayerRef.current) {
          map.removeLayer(expandedLayerRef.current);
          expandedLayerRef.current = null;
          activeClusterRef.current = null;
        }
      });

      // Process markers in chunks
      const processChunk = (startIndex: number) => {
        const chunkSize = 500;
        const endIndex = Math.min(startIndex + chunkSize, data.length);
        const markers: L.Marker[] = [];

        for (let i = startIndex; i < endIndex; i++) {
          const wifi = data[i];
          
          if (!wifi || 
              typeof wifi.latitude !== 'number' || 
              typeof wifi.longitude !== 'number' ||
              isNaN(wifi.latitude) || 
              isNaN(wifi.longitude)) {
            continue;
          }

          try {
            // Create invisible marker (will only be visible when cluster is clicked)
            const marker = L.marker([wifi.latitude, wifi.longitude], {
              icon: getIconForSignal(wifi.signal),
              opacity: 0, // Hidden until expanded
            });

            // Store wifi data
            (marker as any)._wifiData = wifi;

            markers.push(marker);
          } catch (error) {
            console.error('Error creating marker:', error);
          }
        }

        if (markers.length > 0) {
          clusterGroup.addLayers(markers);
        }

        if (endIndex < data.length) {
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => processChunk(endIndex), { timeout: 100 });
          } else {
            setTimeout(() => processChunk(endIndex), 0);
          }
        }
      };

      // Add cluster to map and start processing
      map.addLayer(clusterGroup);
      processChunk(0);
    }, 150);

    // Cleanup
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      map.off('click');

      if (expandedLayerRef.current) {
        map.removeLayer(expandedLayerRef.current);
        expandedLayerRef.current = null;
      }

      if (clusterGroupRef.current && map.hasLayer(clusterGroupRef.current)) {
        map.removeLayer(clusterGroupRef.current);
        clusterGroupRef.current.clearLayers();
        clusterGroupRef.current = null;
      }
    };
  }, [map, data, clusterOptions]);

  return null;
};
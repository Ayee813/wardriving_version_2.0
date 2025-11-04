// src/context/WiFiDataContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WiFiData } from '@/type/wifi';
import { loadCSVFromPath } from '@/utils/csvParser';

interface WiFiDataContextType {
  wifiData: WiFiData[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const WiFiDataContext = createContext<WiFiDataContextType | undefined>(undefined);

export const useWiFiData = () => {
  const context = useContext(WiFiDataContext);
  if (!context) {
    throw new Error('useWiFiData must be used within WiFiDataProvider');
  }
  return context;
};

interface WiFiDataProviderProps {
  children: ReactNode;
}

export const WiFiDataProvider: React.FC<WiFiDataProviderProps> = ({ children }) => {
  const [wifiData, setWifiData] = useState<WiFiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await loadCSVFromPath('/data/ZONE_A2.csv');
      setWifiData(data);
      console.log(`Loaded ${data.length} WiFi access points for analysis`);
    } catch (err) {
      console.error('Error loading WiFi data:', err);
      setError('Failed to load WiFi data');
      setWifiData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshData = async () => {
    await loadData();
  };

  return (
    <WiFiDataContext.Provider value={{ wifiData, loading, error, refreshData }}>
      {children}
    </WiFiDataContext.Provider>
  );
};
// src/context/WiFiDataContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { WiFiData } from "@/type/wifi";
import { loadCSVFromPath } from "@/utils/csvParser";

interface WiFiDataContextType {
  wifiData: WiFiData[];
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  totalNetworks: number;
}

const WiFiDataContext = createContext<WiFiDataContextType | undefined>(
  undefined
);

export const useWiFiData = () => {
  const context = useContext(WiFiDataContext);
  if (!context) {
    throw new Error("useWiFiData must be used within WiFiDataProvider");
  }
  return context;
};

interface WiFiDataProviderProps {
  children: ReactNode;
}

export const WiFiDataProvider: React.FC<WiFiDataProviderProps> = ({
  children,
}) => {
  const [wifiData, setWifiData] = useState<WiFiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
  try {
    setLoading(true);
    setError(null);
    let data: WiFiData[] = [];
    
    const paths = [
      '/CSV_FILE/Chanthabuly merge all zone.csv',
      '/CSV_FILE/ZONE A2.csv',
      '/CSV_FILE/result_FOEN.csv',
      '/CSV_FILE/result-VTE.csv',
      '/CSV_FILE/LPB-result.csv',
    ];

    for (const path of paths) {
      try {
        console.log(`🔍 Trying to load: ${path}`);
        const encodedPath = path.split('/').map(segment => encodeURIComponent(segment)).join('/');
        console.log(`📡 Encoded path: ${encodedPath}`);
        
        data = await loadCSVFromPath(encodedPath);
        
        console.log(`📊 Loaded ${data.length} records from ${path}`);
        
        if (data.length > 0) {
          console.log(`✅ Success! Using data from ${path}`);
          break;
        }
      } catch (pathError) {
        console.error(`❌ Failed to load from ${path}:`, pathError);
        continue;
      }
    }

    if (data.length === 0) {
      console.warn('⚠️ No CSV data found in any path');
      setError('No CSV file found. Please check file paths.');
    }

    setWifiData(data);
  } catch (err) {
    console.error('💥 Error loading WiFi data:', err);
    setError(`Failed to load WiFi data: ${err instanceof Error ? err.message : 'Unknown error'}`);
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
    <WiFiDataContext.Provider
      value={{
        wifiData,
        loading,
        error,
        refreshData,
        totalNetworks: wifiData.length,
      }}
    >
      {children}
    </WiFiDataContext.Provider>
  );
};

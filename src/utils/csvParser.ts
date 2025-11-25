//csvParser.ts

import Papa from 'papaparse';
import type { WiFiData } from '@/type/wifi';

export const parseWiFiCSV = async (file: File): Promise<WiFiData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        const data = results.data as WiFiData[];
        const validData = data.filter(
          (row) =>
            (row.latitude || row.LATITUDE) &&
            (row.longitude || row.LONGITUDE) &&
            !isNaN(row.latitude || row.LATITUDE) &&
            !isNaN(row.longitude || row.LONGITUDE) &&
            (row.latitude || row.LATITUDE) !== 0 &&
            (row.longitude || row.LONGITUDE) !== 0
        );
        resolve(validData);
      },
      error: (error: any) => {
        reject(error);
      },
    });
  });
};

export const loadCSVFromPath = async (path: string): Promise<WiFiData[]> => {
  const response = await fetch(path);
  const text = await response.text();
  
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        const data = results.data as WiFiData[];
        const validData = data.filter(
          (row) =>
            (row.latitude || row.LATITUDE) &&
            (row.longitude || row.LONGITUDE) &&
            !isNaN(row.latitude || row.LATITUDE) &&
            !isNaN(row.longitude || row.LONGITUDE) &&
            (row.latitude || row.LATITUDE) !== 0 &&
            (row.longitude || row.LONGITUDE) !== 0
        );
        resolve(validData);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
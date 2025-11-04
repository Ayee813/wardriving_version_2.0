export interface WiFiData {
  SSID: string;
  BSSID: string;
  MANUFACTURER: string;
  SIGNAL: number;
  'High Signal': number;
  RSSI: number;
  'High RSSI': number;
  AUTHENTICATION: string;
  ENCRYPTION: string;
  'RADIO TYPE': string;
  CHANNEL: number;
  BTX: string;
  OTX: string;
  'NETWORK TYPE': string;
  LABEL: string;
  LATITUDE: number;
  LONGITUDE: number;
  SATELLITES: number;
  HDOP: number;
  ALTITUDE: number;
  'HEIGHT OF GEOID': number;
  'SPEED(km/h)': number;
  'SPEED(MPH)': number;
  'TRACK ANGLE': number;
  'DATE(UTC)': string;
  'TIME(UTC)': string;
  name: string;
  network_id: string;
  signal: number;
  frequency: number;
  longitude: number;
  latitude: number;
}

export const getSignalColor = (signal: number): string => {
  if (signal >= -50) return '#22c55e'; // Excellent - green
  if (signal >= -60) return '#84cc16'; // Good - lime
  if (signal >= -70) return '#eab308'; // Fair - yellow
  if (signal >= -80) return '#f97316'; // Poor - orange
  return '#ef4444'; // Very Poor - red
};

export const getSignalStrength = (signal: number): string => {
  if (signal >= -50) return 'Excellent';
  if (signal >= -60) return 'Good';
  if (signal >= -70) return 'Fair';
  if (signal >= -80) return 'Poor';
  return 'Very Poor';
};

export const getSecurityLevel = (auth: string): { level: string; color: string } => {
  if (auth === 'Open') return { level: 'Open', color: '#ef4444' };
  if (auth.includes('WPA3')) return { level: 'High', color: '#22c55e' };
  if (auth.includes('WPA2')) return { level: 'Medium', color: '#eab308' };
  return { level: 'Low', color: '#f97316' };
};
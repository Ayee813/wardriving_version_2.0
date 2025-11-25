// src/utils/analysisUtils.ts
import type { WiFiData } from '@/type/wifi';

// ============ AUTHENTICATION METHODS ============
export const getAuthenticationDistribution = (data: WiFiData[]) => {
  const authCount: Record<string, number> = {
    'Open': 0,
    'WPA': 0,
    'WPA2': 0,
    'WPA3': 0,
    'WEP': 0,
    'Unknown': 0,
  };

  data.forEach((item) => {
    const auth = (item.AUTHENTICATION || 'Unknown').toString().toUpperCase();
    
    if (auth.includes('WPA3')) {
      authCount['WPA3']++;
    } else if (auth.includes('WPA2')) {
      authCount['WPA2']++;
    } else if (auth.includes('WPA')) {
      authCount['WPA']++;
    } else if (auth.includes('WEP')) {
      authCount['WEP']++;
    } else if (auth === 'OPEN' || auth.includes('OPEN')) {
      authCount['Open']++;
    } else {
      authCount['Unknown']++;
    }
  });

  return Object.entries(authCount)
    .map(([method, count]) => ({ method, count }))
    .filter(item => item.count > 0)
    .sort((a, b) => b.count - a.count);
};

// ============ ENCRYPTION TYPES ============
export const getEncryptionDistribution = (data: WiFiData[]) => {
  const encryptionCount: Record<string, number> = {
    'CCMP': 0,
    'TKIP': 0,
    'WEP': 0,
    'None': 0,
    'Unknown': 0,
  };

  data.forEach((item) => {
    const encryption = (item.ENCRYPTION || 'Unknown').toString().toUpperCase();
    
    if (encryption.includes('CCMP')) {
      encryptionCount['CCMP']++;
    } else if (encryption.includes('TKIP')) {
      encryptionCount['TKIP']++;
    } else if (encryption.includes('WEP')) {
      encryptionCount['WEP']++;
    } else if (encryption === 'NONE' || encryption.includes('NONE')) {
      encryptionCount['None']++;
    } else {
      encryptionCount['Unknown']++;
    }
  });

  return Object.entries(encryptionCount)
    .map(([type, count]) => ({ browser: type, visitors: count }))
    .filter(item => item.visitors > 0)
    .sort((a, b) => b.visitors - a.visitors);
};

// ============ FREQUENCY DISTRIBUTION ============
export const getFrequencyDistribution = (data: WiFiData[]) => {
  let freq24GHz = 0;
  let freq5GHz = 0;

  data.forEach((item) => {
    const channel = item.CHANNEL || 0;
    const radioType = (item["RADIO TYPE"] || '').toString().toUpperCase();
    
    // Determine frequency by channel or radio type
    if (channel >= 1 && channel <= 14) {
      freq24GHz++;
    } else if (channel >= 36) {
      freq5GHz++;
    } else if (radioType.includes('802.11B') || radioType.includes('802.11G')) {
      freq24GHz++;
    } else if (radioType.includes('802.11A')) {
      freq5GHz++;
    }
  });

  return [
    {
      month: 'january',
      '2.4GHz': freq24GHz,
      '5.0GHz': freq5GHz,
    },
  ];
};

// ============ DEVICE TYPE DISTRIBUTION ============
export const getDeviceTypeDistribution = (data: WiFiData[]) => {
  let routerCount = 0;
  let mobileCount = 0;

  data.forEach((item) => {
    const manufacturer = (item.MANUFACTURER || '').toString().toLowerCase();
    
    // Categorize by manufacturer hints
    if (
      manufacturer.includes('unknown') ||
      manufacturer.includes('zte') ||
      manufacturer.includes('huawei') ||
      manufacturer.includes('tp-link') ||
      manufacturer.includes('cisco') ||
      manufacturer.includes('netgear')
    ) {
      routerCount++;
    } else {
      mobileCount++;
    }
  });

  return [
    { browser: 'router', visitors: routerCount, fill: 'var(--color-router)' },
    { browser: 'mobile', visitors: mobileCount, fill: 'var(--color-mobile)' },
  ];
};

// ============ SIGNAL STRENGTH HISTOGRAM ============
export const getSignalStrengthHistogram = (data: WiFiData[]) => {
  const bins: Record<string, number> = {
    '20-25': 0,
    '25-30': 0,
    '30-35': 0,
    '35-40': 0,
    '40-45': 0,
    '45-50': 0,
    '50-55': 0,
    '55-60': 0,
    '60-65': 0,
    '65-70': 0,
    '70-75': 0,
    '75-80': 0,
    '80-85': 0,
    '85-90': 0,
    '90-95': 0,
  };

  data.forEach((item) => {
    // SIGNAL is in dBm, typically -100 to 0
    // We need to convert to positive scale (0-100)
    const signal = Math.abs(item.SIGNAL || -70);
    
    if (signal >= 90 && signal < 95) bins['90-95']++;
    else if (signal >= 85 && signal < 90) bins['85-90']++;
    else if (signal >= 80 && signal < 85) bins['80-85']++;
    else if (signal >= 75 && signal < 80) bins['75-80']++;
    else if (signal >= 70 && signal < 75) bins['70-75']++;
    else if (signal >= 65 && signal < 70) bins['65-70']++;
    else if (signal >= 60 && signal < 65) bins['60-65']++;
    else if (signal >= 55 && signal < 60) bins['55-60']++;
    else if (signal >= 50 && signal < 55) bins['50-55']++;
    else if (signal >= 45 && signal < 50) bins['45-50']++;
    else if (signal >= 40 && signal < 45) bins['40-45']++;
    else if (signal >= 35 && signal < 40) bins['35-40']++;
    else if (signal >= 30 && signal < 35) bins['30-35']++;
    else if (signal >= 25 && signal < 30) bins['25-30']++;
    else if (signal >= 20 && signal < 25) bins['20-25']++;
  });

  return Object.entries(bins)
    .map(([bin, count]) => ({ bin, count }))
    .filter(item => item.count > 0);
};

// ============ CHANNEL DISTRIBUTION ============
export const getChannelDistribution = (data: WiFiData[]) => {
  const channelCount: Record<string, number> = {};

  data.forEach((item) => {
    const channel = item.CHANNEL?.toString() || 'Unknown';
    channelCount[channel] = (channelCount[channel] || 0) + 1;
  });

  return Object.entries(channelCount)
    .map(([bin, count]) => ({ bin, count }))
    .sort((a, b) => parseInt(a.bin) - parseInt(b.bin))
    .slice(0, 15); // Limit to top channels
};

// ============ RADIO TYPE DISTRIBUTION ============
export const getRadioTypeDistribution = (data: WiFiData[]) => {
  const radioTypeCount: Record<string, number> = {};

  data.forEach((item) => {
    const radioType = (item["RADIO TYPE"] || 'Unknown').toString();
    radioTypeCount[radioType] = (radioTypeCount[radioType] || 0) + 1;
  });

  return Object.entries(radioTypeCount)
    .map(([radioType, count]) => ({ radioType, count }))
    .sort((a, b) => b.count - a.count);
};
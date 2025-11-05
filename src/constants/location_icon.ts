// src/constants/location_icon.ts

// Import the images directly - Vite will handle the paths
import greenIcon from "@/assets/location/location_green-n35MNbKB.png";
import redIcon from "@/assets/location/location_red-BbHayoXQ.png";
import yellowIcon from "@/assets/location/location_yellow-D2Y_2qFi.png";

export const LOCATION_ICONS = {
  green: greenIcon,
  red: redIcon,
  yellow: yellowIcon,
} as const;

// Export type for better TypeScript support
export type LocationIconType = keyof typeof LOCATION_ICONS;
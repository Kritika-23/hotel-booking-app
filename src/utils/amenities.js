export const normalizeAmenities = (amenities) => {
  if (!amenities) return [];

  if (Array.isArray(amenities)) {
    return amenities.flatMap((item) => {
      if (typeof item === "string") {
        try {
          const parsed = JSON.parse(item);
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          return [item];
        }
      }
      return [item];
    });
  }

  if (typeof amenities === "string") {
    try {
      return JSON.parse(amenities);
    } catch {
      return amenities.split(",").map(i => i.trim());
    }
  }

  return [];
};


// 👇 ADD THIS
import {
  Wifi,
  Car,
  Utensils,
  Tv,
  Snowflake,
  Dumbbell,
  Waves,
  CheckCircle
} from "lucide-react";

export const getAmenityIcon = (item) => {
  const key = item.toLowerCase();

  if (key.includes("wifi")) return Wifi;
  if (key.includes("parking") || key.includes("car")) return Car;
  if (key.includes("restaurant") || key.includes("food")) return Utensils;
  if (key.includes("tv")) return Tv;
  if (key.includes("ac") || key.includes("air")) return Snowflake;
  if (key.includes("gym")) return Dumbbell;
  if (key.includes("pool") || key.includes("swimming")) return Waves;

  return CheckCircle;
};
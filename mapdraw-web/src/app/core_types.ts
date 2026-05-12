import { Path } from "@/app/components/Paths/types";

export type site = {
  location: { lat: number; lng: number };
  text: string;
};

export type trip = {
  id: number;
  name: string;
  location?: { lat: number; lng: number };
  userId: number;
};

export type route = {
  id: number;
  paths: Path[];
  tripId: number;
};

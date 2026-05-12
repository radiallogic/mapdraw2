import { atom } from "jotai";
import { Trip } from "./types";

const trip = {
  id: 0,
  name: "",
  vehicle: "",
  location: {
    lat: 0,
    lng: 0,
  },
  userId: 0,
};

export const currentTripAtom = atom<Trip>(trip);

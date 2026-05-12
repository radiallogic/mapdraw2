import useGET from "../../hooks/useGET";
import usePOST from "../../hooks/usePOST";
import { type Trip } from "./types";

export function useTrips() {
  const { data = [], loading, error } = useGET<Trip>("/api/trips");
  return { data, loading, error };
}

export function usePostTrip() {
  const { data, loading, error, post } = usePOST({
    url: "/api/trips",
  });

  const postTrip = async (trip: Trip) => {
    return post(trip);
  };

  return { postTrip, data, loading, error };
}

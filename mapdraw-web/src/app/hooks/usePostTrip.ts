import usePOST from "./usePOST";
import { type trip } from "../core_types";

export default function usePostTrip() {
  const { data, loading, error, post } = usePOST({
    url: "/api/trips",
  });

  const postTrip = async (trip: trip) => {
    return post(trip);
  };

  return { postTrip, data, loading, error };
}

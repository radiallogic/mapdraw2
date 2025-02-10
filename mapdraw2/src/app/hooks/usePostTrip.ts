import usePOST from "./usePOST";

export default function usePostTrip() {
  const posttrip = (trip: trip) => {
    return usePOST("/api/trip", trip);
  };

  return posttrip;
}

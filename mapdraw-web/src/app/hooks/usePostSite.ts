import usePOST from "./usePOST";

export default function usePosSite() {
  const posSite = (site: site) => {
    return usePOST("/api/site", site);
  };

  return posSite;
}

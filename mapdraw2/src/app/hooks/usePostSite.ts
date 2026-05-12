import usePOST from "./usePOST";

export default function usePostSite() {
  const postsite = (site: site) => {
    return usePOST("/api/site", site);
  };

  return postsite;
}

import useGET from "../../hooks/useGET";
import usePOST from "../../hooks/usePOST";
import { type Site } from "./types";

export function usetSites() {
  const { data = [], loading, error } = useGET<Site>("/api/sites");
  return { data, loading, error };
}

export function usePostSite() {
  const { data, loading, error, post } = usePOST({
    url: "/api/sites",
  });

  const postSite = async (site: Site) => {
    return post(site);
  };

  return { postSite, data, loading, error };
}

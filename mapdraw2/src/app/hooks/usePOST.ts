import useAPI from "./useAPI";

export default function usePOST(url: string, body: {}, options?: {}) {
  return useAPI("POST", url, options, body);
}

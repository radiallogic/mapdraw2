import { useState, useEffect } from "react";

export type APIReturn = { data: {}; loading: boolean; error: string };

export default function useAPI(url: string, options?: {}) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      ...options,
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((e) => setError(e))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

import { useState, useEffect } from "react";

export type APIReturn = { data: {}; loading: boolean; error: string };

export default function useGET<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    setLoading(true);

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      ...options,
    })
      .then((res) => res.json())
      .then((data: T[]) => {
        setData(data);
      })
      .catch((e) => setError(e))
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

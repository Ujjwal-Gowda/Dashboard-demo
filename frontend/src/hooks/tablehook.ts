import { useEffect, useState } from "react";
import axios from "axios";

interface UseTableOptions {
  endpoint: string;
  params?: Record<string, any>;
  enabled?: boolean;
}

export function useTable<T>({
  endpoint,
  params,
  enabled = true,
}: UseTableOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get<{ data: T[] }>(endpoint, {
          params,
          signal: controller.signal,
        });

        setData(res.data.data);
      } catch (err: any) {
        if (err.name !== "CanceledError") {
          setError("Failed to fetch data");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [endpoint, params, enabled]);

  return { data, loading, error };
}

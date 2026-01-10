import { useEffect, useState } from "react";
import axios from "axios";

interface UseTableOptions<T> {
  endpoint: string;
  params?: Record<string, any>;
  enabled?: boolean;
}

export function useTable<T>({
  endpoint,
  params,
  enabled = true,
}: UseTableOptions<T>) {
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
        const res = await axios.get(endpoint, {
          params,
          signal: controller.signal,
        });

        const result = res.data.data;
        console.log("imp ", result);
        setData(result);
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
  }, [endpoint, JSON.stringify(params), enabled]);

  return { data, loading, error };
}

import { useEffect, useState } from "react";
import axios from "axios";

export interface ChartPoint {
  date: string;
  [key: string]: number | string;
}

export function useChartData(endpoint: string, params?: Record<string, any>) {
  const [data, setData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const res = await axios.get(endpoint, { params });

        if (mounted) {
          const chartData = res.data.priceSeries || res.data.data || [];
          setData(Array.isArray(chartData) ? chartData : []);
        }
        console.log("raw data ", res.data);
      } catch (err: any) {
        if (mounted) {
          setError(err.response?.data?.message || "Failed to load chart data");
          setData([]);
        }
      } finally {
        mounted && setLoading(false);
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
  }, [endpoint, JSON.stringify(params)]);

  console.log("data", data);
  return { data, loading, error };
}

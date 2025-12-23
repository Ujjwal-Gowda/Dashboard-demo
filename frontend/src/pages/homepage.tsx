import { KPICard } from "../components/kpi-card";
import { Card } from "../components/ui/card";
import { ChartAreaInteractive } from "../components/area-chart";
import DemoPage from "../components/table/page";
import { BarChart3, Users, Rocket, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
interface KPIResponse {
  cleanedData: {
    pair: string;
    from: string;
    to: string;
    rate: number;
    bid: number;
    ask: number;
    lastUpdated: string;
  };
}

import { useChartData } from "../hooks/useChartData";

function useCryptoPrice(coin: string) {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchPrice() {
      try {
        const res = await axios.get("http://localhost:5000/api/crypto/kpi", {
          params: { coin, CUR: "USD" },
        });

        if (mounted && res.data.cleanedData) {
          setPrice(res.data.cleanedData.rate);
        }
      } catch (err) {
        console.error(`${coin} price fetch failed`, err);
      } finally {
        mounted && setLoading(false);
      }
    }

    fetchPrice();
    return () => {
      mounted = false;
    };
  }, [coin]);

  return { price, loading };
}

// function useEthereumPrice(coin: string) {
//   const [price, setPrice] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     let mounted = true;
//
//     async function fetchPrice() {
//       try {
//         const res = await axios.get("http://localhost:5000/api/crypto/finage", {
//           params: { coin },
//         });
//
//         if (mounted) {
//           setPrice(res.data.cleanedData.price);
//         }
//       } catch (err) {
//         console.error(`${coin} price fetch failed`, err);
//       } finally {
//         mounted && setLoading(false);
//       }
//     }
//
//     fetchPrice();
//
//     return () => {
//       mounted = false;
//     };
//   }, [coin]);
//
//   return { price, loading };
// }

function useCurrencyPrice(curr: string) {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchPrice() {
      try {
        const res = await axios.get("http://localhost:5000/api/crypto/curr", {
          params: { to: curr },
        });

        if (mounted) {
          setPrice(res.data.cleaned.to);
        }
      } catch (err) {
        console.error(`${curr} price fetch failed`, err);
      } finally {
        mounted && setLoading(false);
      }
    }

    fetchPrice();

    return () => {
      mounted = false;
    };
  }, [curr]);

  return { price, loading };
}
function useMarketOpen() {
  const [loading, setLoading] = useState(true);
  const [marketOp, setMarket] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchStatus() {
      try {
        const res = await axios.get("http://localhost:5000/api/market/status");

        if (mounted) {
          setMarket(res.data.open);
        }
        console.log(res, res.data.open);
      } catch (err) {
        console.error(`status fetch failed`, err);
      } finally {
        mounted && setLoading(false);
      }
    }

    fetchStatus();

    return () => {
      mounted = false;
    };
  }, []);

  return { marketOp, loading };
}

export default function HomePage() {
  const { price: btcPrice } = useCryptoPrice("BTC");
  // const { price: ethPrice } = useEthereumPrice("ethusd");

  const { price: currencyprice } = useCurrencyPrice("usd");
  const { marketOp: marketOpen } = useMarketOpen();

  const { data: btcHistory, loading } = useChartData(
    "http://localhost:5000/api/crypto/weekly",
    { coin: "BTC", CUR: "EUR" },
  );
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <KPICard
          title="BTC Price"
          value={btcPrice ? `$${btcPrice}` : "—"}
          icon={BarChart3}
        />

        <KPICard
          title="ETH Price"
          // value={ethPrice ? `$${ethPrice}` : "—"}
          icon={Users}
        />

        <KPICard
          title="EUR To USD"
          value={"1EUR = " + currencyprice + "USD"}
          icon={Rocket}
        />

        <KPICard
          title="Market Status"
          value={marketOpen ? "OPEN" : "CLOSED"}
          icon={Rocket}
          badge={marketOpen ? "Live" : "Closed"}
        />
      </div>

      {/* Chart */}
      <Card>
        {loading ? (
          <div className="p-6">Loading chart…</div>
        ) : (
          <ChartAreaInteractive
            title="BTC Price History"
            description="Daily BTC price (USD)"
            data={btcHistory}
          />
        )}
      </Card>

      {/* Tables */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <DemoPage />
        </Card>
        <Card>
          <DemoPage />
        </Card>
      </div>
    </div>
  );
}

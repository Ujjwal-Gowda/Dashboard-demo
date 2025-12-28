import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, X } from "lucide-react";
import { Button } from "./ui/button";

interface WatchItem {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}

export default function WatchlistTable() {
  const [items, setItems] = useState<WatchItem[]>([
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      price: 43250,
      change24h: 2.14,
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      price: 2350,
      change24h: -1.08,
    },
    {
      id: "eurusd",
      name: "EUR / USD",
      symbol: "EURUSD",
      price: 1.084,
      change24h: 0.22,
    },
  ]);

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b text-muted-foreground">
          <tr>
            <th className="py-2 text-left">Asset</th>
            <th className="py-2 text-right">Price</th>
            <th className="py-2 text-right">24h</th>
            <th className="py-2 text-right"></th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => {
            const isUp = item.change24h >= 0;

            return (
              <tr key={item.id} className="border-b last:border-0">
                <td className="py-3">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.symbol}
                  </div>
                </td>

                <td className="py-3 text-right font-medium">
                  ${item.price.toLocaleString()}
                </td>

                <td
                  className={`py-3 text-right font-medium ${
                    isUp ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {isUp ? (
                      <ArrowUpRight size={16} />
                    ) : (
                      <ArrowDownRight size={16} />
                    )}
                    {Math.abs(item.change24h)}%
                  </span>
                </td>

                <td className="py-3 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <X size={16} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {items.length === 0 && (
        <div className="py-10 text-center text-muted-foreground">
          Watchlist is empty
        </div>
      )}
    </div>
  );
}

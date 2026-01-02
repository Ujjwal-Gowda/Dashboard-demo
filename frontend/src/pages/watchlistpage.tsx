import { ArrowUpRight, ArrowDownRight, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { useWatchlist } from "../hooks/watchlist";

export default function WatchlistTable() {
  const { items, removeItem } = useWatchlist();
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/40 text-muted-foreground">
          <tr>
            <th className="px-4 py-3 text-left">Asset</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-right">24h</th>
            <th className="px-4 py-3 text-right"></th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => {
            const isUp = item.change24h >= 0;

            return (
              <tr
                key={item.id}
                className="border-b last:border-0 hover:bg-muted/30"
              >
                <td className="px-4 py-3">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.symbol}
                  </div>
                </td>

                <td className="px-4 py-3 text-right font-medium">
                  ${item.price.toLocaleString()}
                </td>

                <td
                  className={`px-4 py-3 text-right font-medium ${
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

                <td className="px-4 py-3 text-right">
                  <Button
                    size="icon"
                    variant="ghost"
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
        <div className="py-12 text-center text-muted-foreground">
          Watchlist is empty
        </div>
      )}
    </div>
  );
}

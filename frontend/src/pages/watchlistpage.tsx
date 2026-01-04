import { ArrowUpRight, ArrowDownRight, X } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useWatchlist } from "../hooks/watchlist";

export default function WatchlistTable() {
  const { items, removeItem } = useWatchlist();

  return (
    <div>
      <div className="flex flex-col pb-5">
        <h1 className="text-2xl font-semibold px-2 tracking-tight">
          Forex Market
        </h1>
        <p className="text-sm px-2 text-muted-foreground">liked assets</p>
      </div>
      <Card>
        <CardContent className="p-0 ">
          {items.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Your watchlist is empty
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/30">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">Asset</th>
                    <th className="px-6 py-3 text-right font-medium">Price</th>
                    <th className="px-6 py-3 text-right font-medium">24h</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>

                <tbody>
                  {items.map((item) => {
                    const isUp = item.change24h >= 0;

                    return (
                      <tr
                        key={item.id}
                        className="border-b last:border-0 transition-colors hover:bg-muted/40"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium leading-none">
                            {item.name}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {item.symbol}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-right font-medium">
                          ${item.price.toLocaleString()}
                        </td>

                        <td
                          className={`px-6 py-4 text-right font-medium ${
                            isUp ? "text-emerald-500" : "text-rose-500"
                          }`}
                        >
                          <span className="inline-flex items-center gap-1">
                            {isUp ? (
                              <ArrowUpRight size={14} />
                            ) : (
                              <ArrowDownRight size={14} />
                            )}
                            {Math.abs(item.change24h)}%
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <X size={14} />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

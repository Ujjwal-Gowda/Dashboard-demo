import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select";
import { TableDemo } from "../components/table/page";
import { useTable } from "../hooks/tablehook";
import { useChartData } from "../hooks/useChartData";
import { ChartAreaInteractive } from "../components/area-chart";
import { useState } from "react";
import { useWatchlist } from "../hooks/watchlist";
import { BookmarkIcon } from "lucide-react";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { Toggle } from "../components/ui/toggle";
import { useThemeStore } from "../hooks/usetheme";
export interface stocksRow {
  date: string;
  open: number;
  high: number;
  low: number;
  price: number;
  volume: number;
}

export default function StocksPage() {
  const [selectStock, setStock] = useState<string>("");

  const addItem = useWatchlist((s) => s.addItem);
  function resetStock() {
    setStock("");
  }

  const fetchedTheme = useThemeStore((s) => s.theme);
  let theme = "";
  if (fetchedTheme == "light") {
    theme = "dark";
  } else if (fetchedTheme == "dark") {
    theme = "light";
  } else {
    theme = "light";
  }
  const {
    data: tableData,
    loading: tableLoading,
    error: tableError,
  } = useTable<stocksRow>({
    endpoint: "http://localhost:5000/api/market/stocks",
    params: { symbol: selectStock },
  });
  const { data: stocksHistory, loading } = useChartData(
    "http://localhost:5000/api/market/stockschart",
    { symbol: selectStock },
  );
  function handleAddToWatchlist() {
    if (!selectStock && !stocksHistory) return;
    console.log(
      {
        id: `${selectStock}`,
        name: selectStock,
        symbol: `${selectStock}`,
        price: tableData?.[0]?.price ?? 0,

        change24h: `${Number(stocksHistory[0].price) - Number(stocksHistory[1].price)}`,
      },
      stocksHistory,
    );
    addItem({
      id: `${selectStock}`,
      name: selectStock,
      symbol: `${selectStock}`,
      price: tableData?.[0]?.price ?? 0,

      change24h:
        Number(stocksHistory[0].price) - Number(stocksHistory[1].price),
    });
    liked();
  }

  const liked = () =>
    toast.success("Added to Watchlist", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme,
      transition: Bounce,
    });
  return (
    <div className="space-y-6">
      {/* 🔹 Page Header */}

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold px-2 tracking-tight">
          Stock Market
        </h1>
        <p className="text-sm px-2 text-muted-foreground">
          Explore global equities and daily price movements
        </p>
      </div>

      {/* 🔹 Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search Stock</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            {/* Symbol */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">
                Stock Symbol
              </label>
              <Input
                onChange={(e) => {
                  setStock(e.target.value);
                }}
                placeholder="RELIANCE, AAPL, TSLA..."
                className="w-64"
              />
            </div>

            {/* Exchange */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Exchange</label>
              <Select value={selectStock} onValueChange={setStock}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Select exchange" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BSE">India (BSE)</SelectItem>
                  <SelectItem value="NSE">India (NSE)</SelectItem>
                  <SelectItem value="NASDAQ">US (NASDAQ)</SelectItem>
                  <SelectItem value="MYSE">US (NYSE)</SelectItem>
                  <SelectItem value="LON">UK (LSE)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <Button variant="outline" onClick={resetStock}>
              Reset
            </Button>

            {stocksHistory && (
              <div>
                <Toggle
                  onClick={handleAddToWatchlist}
                  aria-label="Toggle bookmark"
                  size="sm"
                  variant="outline"
                  className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
                >
                  <BookmarkIcon />
                  Bookmark
                </Toggle>
                <ToastContainer />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 🔹 Market Table */}
      {selectStock != "" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Stock Data</CardTitle>
          </CardHeader>

          <CardContent>
            <TableDemo data={tableData} loading={tableLoading} name="stocks" />
          </CardContent>
        </Card>
      )}

      {selectStock != "" && (
        <Card>
          {loading ? (
            <div className="p-6">Loading chart…</div>
          ) : (
            <div className="px-4">
              <ChartAreaInteractive
                title="stocks History"
                description="Daily stocks price (USD)"
                data={stocksHistory}
              />
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { exportToCSV, exportToJSON } from "../lib/exportutils";
import { Download } from "lucide-react";
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

interface ImportedChartPoint {
  date: string;
  price: number;
  exprice?: number;
}
export interface ChartPoint {
  date: string;
  [key: string]: number | string;
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
  const { data: tableData, loading: tableLoading } = useTable<stocksRow>({
    endpoint: "http://localhost:5000/api/market/stocks",
    params: { symbol: selectStock },
  });
  const { data: stocksHistory, loading } = useChartData(
    "http://localhost:5000/api/market/stockschart",
    { symbol: selectStock },
  );
  const normalizedData: ImportedChartPoint[] = stocksHistory
    .filter(
      (d): d is ChartPoint & { price: number } => typeof d.price === "number",
    )
    .map((d) => ({
      date: d.date,
      price: d.price,
    }));
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
                <SelectContent
                  position="popper"
                  side="bottom"
                  sideOffset={8}
                  className="max-h-60 overflow-y-auto"
                >
                  <SelectItem value="BSE">India (BSE)</SelectItem>
                  <SelectItem value="NSE">India (NSE)</SelectItem>
                  <SelectItem value="NASDAQ">US (NASDAQ)</SelectItem>
                  <SelectItem value="NYSE">US (NYSE)</SelectItem>
                  <SelectItem value="AMEX">US (AMEX)</SelectItem>
                  <SelectItem value="LSE">UK (LSE)</SelectItem>
                  <SelectItem value="XETRA">Germany (XETRA)</SelectItem>
                  <SelectItem value="FWB">Germany (Frankfurt)</SelectItem>
                  <SelectItem value="EPA">France (Euronext Paris)</SelectItem>
                  <SelectItem value="AMS">Netherlands (Euronext)</SelectItem>
                  <SelectItem value="SWX">Switzerland (SIX)</SelectItem>
                  <SelectItem value="TSE">Japan (TSE)</SelectItem>
                  <SelectItem value="HKEX">Hong Kong (HKEX)</SelectItem>
                  <SelectItem value="SSE">China (SSE)</SelectItem>
                  <SelectItem value="SZSE">China (SZSE)</SelectItem>
                  <SelectItem value="KRX">South Korea (KRX)</SelectItem>
                  <SelectItem value="TSX">Canada (TSX)</SelectItem>
                  <SelectItem value="ASX">Australia (ASX)</SelectItem>
                  <SelectItem value="B3">Brazil (B3)</SelectItem>
                  <SelectItem value="TADAWUL"></SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}

            <div className="flex gap-2 md:justify-end">
              <Button variant="outline" onClick={resetStock}>
                Reset
              </Button>

              {tableData.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() =>
                        exportToCSV(tableData, `crypto-${selectStock}`)
                      }
                    >
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        exportToJSON(tableData, `crypto-${selectStock}`)
                      }
                    >
                      Export as JSON
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
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
                data={normalizedData}
              />
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

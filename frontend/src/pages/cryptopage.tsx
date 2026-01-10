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
import { ToastContainer, toast, Bounce } from "react-toastify";
import { TableDemo } from "../components/table/page";
import { useTable } from "../hooks/tablehook";
import { useState } from "react";
import { useChartData } from "../hooks/useChartData";
import { ChartAreaInteractive } from "../components/area-chart";
import { useThemeStore } from "../hooks/usetheme.ts";
import { BookmarkIcon } from "lucide-react";
import { Toggle } from "../components/ui/toggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { exportToCSV, exportToJSON } from "../lib/exportutils";
import { Download } from "lucide-react";
interface ImportedChartPoint {
  date: string;
  price: number;
  exprice?: number;
}
export interface ChartPoint {
  date: string;
  [key: string]: number | string;
}
export interface CryptoRow {
  date: string;
  open: number;
  high: number;
  low: number;
  price: number;
  volume: number;
}

import { useWatchlist } from "../hooks/watchlist.ts";

export default function CryptoMarketPage() {
  const [selectCoin, setSelectCoin] = useState<string>("");
  const [selectMarket, setSelectMarket] = useState<string>("");
  const addItem = useWatchlist((s) => s.addItem);
  const fetchedTheme = useThemeStore((s) => s.theme);
  let theme = "";
  if (fetchedTheme == "light") {
    theme = "dark";
  } else if (fetchedTheme == "dark") {
    theme = "light";
  } else {
    theme = "light";
  }
  function resetClicked() {
    setSelectCoin("");
    setSelectMarket("");
  }
  console.log(selectCoin, selectMarket);
  const { data: tableData, loading: tableLoading } = useTable<CryptoRow>({
    endpoint: "http://localhost:5000/api/market/crypto",
    params: { symbol: selectCoin, market: selectMarket },
  });
  const { data: coinHistory, loading } = useChartData(
    "http://localhost:5000/api/crypto/weekly",
    { coin: selectCoin, CUR: selectMarket },
  );

  const normalizedData: ImportedChartPoint[] = coinHistory
    .filter(
      (d): d is ChartPoint & { price: number } => typeof d.price === "number",
    )
    .map((d) => ({
      date: d.date,
      price: d.price,
    }));

  function handleAddToWatchlist() {
    if (!selectCoin && !selectMarket && !coinHistory) return;
    console.log({
      id: `${selectCoin}-${selectMarket}`,
      name: selectCoin,
      symbol: `${selectCoin}/${selectMarket}`,
      price: tableData?.[0]?.price ?? 0,
      change24h: `${Number(coinHistory[0].price) - Number(coinHistory[1].price)}`,
    });
    addItem({
      id: `${selectCoin}-${selectMarket}`,
      name: selectCoin,
      symbol: `${selectCoin}/${selectMarket}`,
      price: tableData?.[0]?.price ?? 0,
      change24h: Number(coinHistory[0].price) - Number(coinHistory[1].price),
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
    <div className="flex flex-col gap-6">
      {/* 🔹 Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold px-2 tracking-tight">
          Crypto Market
        </h1>
        <p className="text-sm px-2 text-muted-foreground">
          Explore cryptocurrency prices, trends, and volume
        </p>
      </div>
      {/* 🔹 Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Market Filters</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Symbol Search */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">
                Crypto Symbol
              </label>
              <Input
                onChange={(e) => {
                  setSelectCoin(e.target.value.toUpperCase());
                }}
                placeholder="BTC, ETH, SOL..."
              />
            </div>
            {/* Preset Coins */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">
                Popular Coins
              </label>

              <Select value={selectCoin} onValueChange={setSelectCoin}>
                <SelectTrigger>
                  <SelectValue placeholder="Select coin" />
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  side="bottom"
                  sideOffset={8}
                  className="max-h-60 overflow-y-auto"
                >
                  <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                  <SelectItem value="SOL">Solana (SOL)</SelectItem>
                  <SelectItem value="BNB">BNB (BNB)</SelectItem>
                  <SelectItem value="XRP">XRP (XRP)</SelectItem>
                  <SelectItem value="MATIC">Polygon (MATIC)</SelectItem>
                  <SelectItem value="ARB">Arbitrum (ARB)</SelectItem>
                  <SelectItem value="OP">Optimism (OP)</SelectItem>
                  <SelectItem value="ADA">Cardano (ADA)</SelectItem>
                  <SelectItem value="AVAX">Avalanche (AVAX)</SelectItem>
                  <SelectItem value="DOT">Polkadot (DOT)</SelectItem>
                  <SelectItem value="ATOM">Cosmos (ATOM)</SelectItem>
                  <SelectItem value="NEAR">NEAR Protocol (NEAR)</SelectItem>
                  <SelectItem value="DOGE">Dogecoin (DOGE)</SelectItem>
                  <SelectItem value="LTC">Litecoin (LTC)</SelectItem>
                  <SelectItem value="BCH">Bitcoin Cash (BCH)</SelectItem>
                  <SelectItem value="USDT">Tether (USDT)</SelectItem>
                  <SelectItem value="USDC">USD Coin (USDC)</SelectItem>
                  <SelectItem value="DAI">Dai (DAI)</SelectItem>
                  <SelectItem value="LINK">Chainlink (LINK)</SelectItem>
                  <SelectItem value="UNI">Uniswap (UNI)</SelectItem>
                  <SelectItem value="AAVE">Aave (AAVE)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Market */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Market</label>
              <Select value={selectMarket} onValueChange={setSelectMarket}>
                <SelectTrigger>
                  <SelectValue placeholder="Market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 md:justify-end">
              <Button variant="outline" onClick={resetClicked}>
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
                        exportToCSV(
                          tableData,
                          `crypto-${selectCoin}-${selectMarket}`,
                        )
                      }
                    >
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        exportToJSON(
                          tableData,
                          `crypto-${selectCoin}-${selectMarket}`,
                        )
                      }
                    >
                      Export as JSON
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {coinHistory && (
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
            {/* Actions */}
          </div>
        </CardContent>
      </Card>
      {/* 🔹 Market Table */}
      {selectCoin != "" && selectMarket != "" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Price History</CardTitle>
          </CardHeader>
          <CardContent>
            <TableDemo
              data={tableData}
              loading={tableLoading}
              name={"crypto"}
            />
          </CardContent>
        </Card>
      )}

      {selectCoin != "" && selectMarket != "" && (
        <Card>
          {loading ? (
            <div className="p-6">Loading chart…</div>
          ) : (
            <div className="px-4">
              <ChartAreaInteractive
                title="BTC Price History"
                description="Daily BTC price (USD)"
                data={normalizedData}
              />
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

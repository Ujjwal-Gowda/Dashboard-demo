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
import { useState } from "react";
export interface CryptoRow {
  date: string;
  open: number;
  high: number;
  low: number;
  price: number;
  volume: number;
}
export default function CryptoMarketPage() {
  const [selectCoin, setSelectCoin] = useState<string>("");
  const [selectMarket, setSelectMarket] = useState<string>("");

  function resetClicked() {
    setSelectCoin("");
    setSelectMarket("");
  }
  console.log(selectCoin, selectMarket);
  const {
    data: tableData,
    loading: tableLoading,
    error: tableError,
  } = useTable<CryptoRow>({
    endpoint: "http://localhost:5000/api/market/crypto",
    params: { symbol: selectCoin, market: selectMarket },
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

                <SelectContent>
                  <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                  <SelectItem value="SOL">Solana (SOL)</SelectItem>
                  <SelectItem value="BNB">BNB</SelectItem>
                  <SelectItem value="XRP">XRP</SelectItem>
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
                  <SelectItem value="INR">INR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-2 md:justify-end">
              <Button variant="outline" onClick={resetClicked}>
                Reset
              </Button>
            </div>
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
    </div>
  );
}

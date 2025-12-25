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
  function resetStock() {
    setStock("");
  }
  const {
    data: tableData,
    loading: tableLoading,
    error: tableError,
  } = useTable<stocksRow>({
    endpoint: "http://localhost:5000/api/market/stocks",
    params: { symbol: selectStock },
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
    </div>
  );
}

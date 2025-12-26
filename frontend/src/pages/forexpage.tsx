import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select";
import { useState } from "react";

import { useTable } from "../hooks/tablehook";
import { TableDemo } from "../components/table/page";
import { useChartData } from "../hooks/useChartData";
import { ChartAreaInteractive } from "../components/area-chart";
export interface ForexRow {
  date: string;
  open: number;
  high: number;
  low: number;
  price: number;
}
export default function ForexPage() {
  const [selectFrom, setFrom] = useState<string>("");
  const [selectTo, setTo] = useState<string>("");
  function resetforex() {
    setFrom("");
    setTo("");
  }
  const {
    data: tableData,
    loading: tableLoading,
    error: tableError,
  } = useTable<ForexRow>({
    endpoint: "http://localhost:5000/api/market/forex",
    params: { from: selectFrom, to: selectTo },
  });
  const { data: forexHistory, loading } = useChartData(
    "http://localhost:5000/api/market/weeklyex",
    { from: selectFrom, to: selectTo },
  );
  return (
    <div className="space-y-6">
      {/* 🔹 Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold px-2 tracking-tight">
          Forex Market
        </h1>
        <p className="text-sm px-2 text-muted-foreground">
          Track global foreign exchange rates and trends
        </p>
      </div>

      {/* 🔹 Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Currency Pair</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            {/* From */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">From</label>
              <Select value={selectFrom} onValueChange={setFrom}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USE">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                  <SelectItem value="AUD">AUD</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                  <SelectItem value="CHF">CHF</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* To */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">To</label>
              <Select value={selectTo} onValueChange={setTo}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USE">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                  <SelectItem value="AUD">AUD</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                  <SelectItem value="CHF">CHF</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <Button onClick={resetforex} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 Market Table */}
      {selectFrom != "" && selectTo != "" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Exchange Rates</CardTitle>
          </CardHeader>

          <CardContent>
            <TableDemo data={tableData} loading={tableLoading} name={"forex"} />
          </CardContent>
        </Card>
      )}
      {selectFrom != "" && selectTo != "" && (
        <Card>
          {loading ? (
            <div className="p-6">Loading chart…</div>
          ) : (
            <div className="px-4">
              <ChartAreaInteractive
                title="forex Price History"
                description="Daily forex price (USD)"
                data={forexHistory}
              />
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

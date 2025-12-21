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
import MarketTable from "../components/table/page";

const exchanges = [
  { label: "India (BSE)", value: "BSE" },
  { label: "India (NSE)", value: "NSE" },
  { label: "US (NASDAQ)", value: "NASDAQ" },
  { label: "US (NYSE)", value: "NYSE" },
  { label: "UK (LSE)", value: "LON" },
];

export default function StocksPage() {
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
              <Input placeholder="RELIANCE, AAPL, TSLA..." className="w-64" />
            </div>

            {/* Exchange */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Exchange</label>
              <Select>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Select exchange" />
                </SelectTrigger>
                <SelectContent>
                  {exchanges.map((ex) => (
                    <SelectItem key={ex.value} value={ex.value}>
                      {ex.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <Button className="ml-auto">Apply</Button>
            <Button variant="outline">Reset</Button>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 Market Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Stock Data</CardTitle>
        </CardHeader>

        <CardContent>
          <MarketTable />
        </CardContent>
      </Card>
    </div>
  );
}

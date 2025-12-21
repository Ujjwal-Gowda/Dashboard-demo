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
import MarketTable from "../components/table/page";

const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "INR"];

export default function ForexPage() {
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
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((cur) => (
                    <SelectItem key={cur} value={cur}>
                      {cur}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* To */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">To</label>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((cur) => (
                    <SelectItem key={cur} value={cur}>
                      {cur}
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
          <CardTitle className="text-base">Exchange Rates</CardTitle>
        </CardHeader>

        <CardContent>
          <MarketTable />
        </CardContent>
      </Card>
    </div>
  );
}

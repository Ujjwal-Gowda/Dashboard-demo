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

export default function MarketPage() {
  return (
    <div className="space-y-6">
      {/* 🔹 Page Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Market</CardTitle>
          <p className="text-sm text-muted-foreground">
            Global crypto & asset market overview
          </p>
        </CardHeader>
      </Card>

      {/* 🔹 Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <Input placeholder="Search symbol (BTC, ETH...)" className="w-64" />

            <Select>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Asset type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="stocks">Stocks</SelectItem>
                <SelectItem value="fx">Forex</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gainers">Top Gainers</SelectItem>
                <SelectItem value="losers">Top Losers</SelectItem>
                <SelectItem value="volume">Highest Volume</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="ml-auto">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 Market Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Market Assets</CardTitle>
        </CardHeader>

        <CardContent>
          <MarketTable />
        </CardContent>
      </Card>
    </div>
  );
}

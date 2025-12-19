// import { CardDefault } from "../components/app-card.tsx";
// import DemoPage from "../components/table/page.tsx";
// import { ChartAreaInteractive } from "../components/area-chart.tsx";
// const market = () => {
//   return (
//     <>
//       {/* <div className="h-fit py-5"> */}
//       {/*   <CardDefault /> */}
//       {/* </div> */}
//       {/* <div className="min-w-0"> */}
//       {/*   <DemoPage /> */}
//       {/* </div> */}
//       {/* <div className="col-start-1 col-end-3"> */}
//       {/*   <ChartAreaInteractive /> */}
//       {/* </div> */}
//
//     </>
//   );
// };
//
// export default market;
//
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import MarketTable from "../components/table/page";

const MarketPage = () => {
  return (
    <div className="col-span-2 space-y-6">
      {/* 🔹 Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Market</h1>
          <p className="text-sm text-muted-foreground">
            Global market overview
          </p>
        </div>
      </div>

      {/* 🔹 Filters */}
      <Card className="p-4 flex flex-wrap gap-4">
        <Input placeholder="Search symbol..." className="w-56" />

        <Select>
          <SelectTrigger className="w-40">Asset Type</SelectTrigger>
          <SelectContent>
            <SelectItem value="crypto">Crypto</SelectItem>
            <SelectItem value="stocks">Stocks</SelectItem>
            <SelectItem value="fx">Forex</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-40">Sort By</SelectTrigger>
          <SelectContent>
            <SelectItem value="gainers">Top Gainers</SelectItem>
            <SelectItem value="losers">Top Losers</SelectItem>
            <SelectItem value="volume">Volume</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">Reset</Button>
      </Card>

      {/* 📊 Market Table */}
      <Card className="p-4">
        <MarketTable />
      </Card>
    </div>
  );
};

export default MarketPage;

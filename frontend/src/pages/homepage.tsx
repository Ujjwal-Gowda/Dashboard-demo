import { CardDefault } from "../components/app-card.tsx";
import DemoPage from "../components/table/page.tsx";
import { Card } from "../components/ui/card.tsx";
import { ChartAreaInteractive } from "../components/area-chart.tsx";
const homepage = () => {
  return (
    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* 🔹 Top KPI Cards */}
      <CardDefault />
      <CardDefault />
      <CardDefault />
      <CardDefault />

      {/* 📈 Market Indicator / Chart */}
      <Card className="col-span-1 xl:col-span-4">
        <ChartAreaInteractive />
      </Card>

      {/* 📊 Bottom Tables */}
      <Card className="col-span-1 xl:col-span-2">
        <DemoPage />
      </Card>

      <Card className="col-span-1 xl:col-span-2">
        <DemoPage />
      </Card>
    </div>
  );
};

export default homepage;

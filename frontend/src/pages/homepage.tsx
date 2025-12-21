import { KPICard } from "../components/kpi-card";
import { Card } from "../components/ui/card";
import { ChartAreaInteractive } from "../components/area-chart";
import DemoPage from "../components/table/page";
import { BarChart3, Users, Rocket, Mail } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* KPI Card */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <KPICard
          title="Market Assets"
          value="2,431"
          icon={BarChart3}
          stats={[
            { label: "Crypto", value: 412 },
            { label: "Stocks", value: 1720 },
          ]}
        />

        <KPICard
          title="Tracked Symbols"
          value="102"
          icon={Users}
          stats={[
            { label: "Active", value: 98 },
            { label: "Inactive", value: 4 },
          ]}
        />

        <KPICard
          title="Alerts"
          value="2"
          icon={Rocket}
          stats={[
            { label: "Triggered", value: 1 },
            { label: "Pending", value: 1 },
          ]}
        />

        <KPICard
          title="API Requests"
          value="1"
          icon={Mail}
          stats={[
            { label: "Today", value: 1 },
            { label: "Failed", value: 0 },
          ]}
        />
      </div>

      {/*  CHART */}
      <Card className="w-full">
        <ChartAreaInteractive />
      </Card>

      {/* TABLES */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <DemoPage />
        </Card>

        <Card>
          <DemoPage />
        </Card>
      </div>
    </div>
  );
}

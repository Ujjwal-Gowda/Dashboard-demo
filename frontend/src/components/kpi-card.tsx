import { Card } from "../components/ui/card";

interface KPIStat {
  label: string;
  value: string | number;
}

interface KPICardProps {
  title: string;
  value: string | number;
  icon: I;
  stats?: KPIStat[];
}

export function KPICard({ title, value, icon: Icon, stats }: KPICardProps) {
  return (
    <Card className="p-5 flex items-start justify-between">
      {/* Left */}
      <div className="flex items-start gap-4">
        <div className="mt-1 text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <div className="text-3xl font-semibold leading-none">{value}</div>
          <p className="text-sm text-muted-foreground mt-1">{title}</p>
        </div>
      </div>

      {/* Right stats */}
      {stats && (
        <div className="text-right space-y-1 text-sm text-muted-foreground">
          {stats.map((stat) => (
            <div key={stat.label}>
              <span className="font-medium text-foreground">{stat.value}</span>{" "}
              {stat.label}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

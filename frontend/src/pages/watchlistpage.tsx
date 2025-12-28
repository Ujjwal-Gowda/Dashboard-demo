import WatchlistTable from "../components/watchlist-table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

export default function WatchlistPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold px-2 tracking-tight"> Watchlist</h1>
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <WatchlistTable />
        </CardContent>
      </Card>
    </div>
  );
}

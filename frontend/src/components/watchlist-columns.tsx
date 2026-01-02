// watchlist-columns.tsx
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface WatchItem {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}

export const watchlistColumns: ColumnDef<WatchItem>[] = [
  {
    accessorKey: "name",
    header: "Asset",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.name}</div>
        <div className="text-xs text-muted-foreground">
          {row.original.symbol}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => `$${getValue<number>().toLocaleString()}`,
  },
  {
    accessorKey: "change24h",
    header: "24h",
    cell: ({ getValue }) => {
      const val = getValue<number>();
      const up = val >= 0;

      return (
        <span
          className={`flex items-center gap-1 ${
            up ? "text-green-500" : "text-red-500"
          }`}
        >
          {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(val)}%
        </span>
      );
    },
  },
];

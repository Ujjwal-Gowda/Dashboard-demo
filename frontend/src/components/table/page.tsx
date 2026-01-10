import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface TableDemoProps {
  data: MarketCoin[] | csfData[];
  loading?: boolean;
  name: "home" | "crypto" | "stocks" | "forex";
  rowsPerPage?: number;
}
interface MarketCoin {
  rank: number;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
}

interface csfData {
  date: string;
  open: number;
  high: number;
  low: number;
  price: number;
  volume?: number;
}
import { useState, useEffect, useMemo } from "react";

export function TableDemo({
  data = [],
  loading,
  name,
  rowsPerPage = 10,
}: TableDemoProps) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [data]);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, page, rowsPerPage]);

  if (loading) return <div className="p-4">Loading table…</div>;
  if (!paginatedData.length)
    return <div className="p-4">No data available</div>;

  if (name == "home") {
    if (loading) {
      return <div className="p-4">Loading table…</div>;
    }

    if (!data.length) {
      return <div className="p-4">No data available</div>;
    }

    return (
      <div>
        <Table>
          <TableCaption>Crypto Market Overview</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price ($)</TableHead>
              <TableHead className="text-right">24h %</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(paginatedData as MarketCoin[]).map((coin) => (
              <TableRow key={`${coin.symbol}-${coin.rank}`}>
                <TableCell>{coin.rank}</TableCell>
                <TableCell className="font-medium">{coin.symbol}</TableCell>
                <TableCell>{coin.name}</TableCell>
                <TableCell className="text-right">
                  ${coin.price.toLocaleString()}
                </TableCell>
                <TableCell
                  className={`text-right ${
                    coin.change24h >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {coin.change24h.toFixed(2)}%
                </TableCell>
                <TableCell className="text-right">
                  ${coin.marketCap.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  } else if (name == "crypto" || name == "stocks" || name == "forex") {
    if (loading) {
      return <div className="p-4">Loading table…</div>;
    }

    if (!data.length) {
      return <div className="p-4">No data available</div>;
    }

    return (
      <div>
        <Table>
          <TableCaption>Crypto Market Overview</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>date</TableHead>
              <TableHead>open</TableHead>
              <TableHead>high</TableHead>
              <TableHead className="text-right">low</TableHead>
              <TableHead className="text-right">price</TableHead>
              {name != "forex" && (
                <TableHead className="text-right"> volume</TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {(paginatedData as csfData[]).map((coin) => (
              <TableRow key={`${coin.date}`}>
                <TableCell>{coin.date}</TableCell>
                <TableCell className="font-medium">{coin.open}</TableCell>
                <TableCell>{coin.high}</TableCell>
                <TableCell className="text-right">{coin.low}</TableCell>
                <TableCell className="text-right">
                  ${coin.price.toLocaleString()}
                </TableCell>
                {name != "forex" && (
                  <TableCell className="text-right">
                    ${coin.volume.toLocaleString() ?? `N/A`}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              className="px-3 py-1 text-sm border rounded disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>

            <button
              className="px-3 py-1 text-sm border rounded disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

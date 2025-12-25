import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface TableDemoProps {
  data: [];
  loading?: boolean;
  name: string;
}

export function TableDemo({ data = [], loading, name }: TableDemoProps) {
  if (name == "home") {
    if (loading) {
      return <div className="p-4">Loading table…</div>;
    }

    if (!data.length) {
      return <div className="p-4">No data available</div>;
    }

    return (
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
          {data.map((coin) => (
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
    );
  } else if (name == "crypto" || name == "stocks" || name == "forex") {
    if (loading) {
      return <div className="p-4">Loading table…</div>;
    }

    if (!data.length) {
      return <div className="p-4">No data available</div>;
    }

    return (
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
          {data.map((coin) => (
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
                  ${coin.volume.toLocaleString()}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

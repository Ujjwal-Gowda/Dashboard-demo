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
import { useState } from "react";
import { useWatchlist } from "../hooks/watchlist";
import { useTable } from "../hooks/tablehook";
import { TableDemo } from "../components/table/page";
import { useChartData } from "../hooks/useChartData";
import { ChartAreaInteractive } from "../components/area-chart";

import { Toggle } from "../components/ui/toggle";
import { toast, Bounce, ToastContainer } from "react-toastify";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { exportToCSV, exportToJSON } from "../lib/exportutils";
import { Download } from "lucide-react";
import { BookmarkIcon } from "lucide-react";
import { useThemeStore } from "../hooks/usetheme";
export interface ForexRow {
  date: string;
  open: number;
  high: number;
  low: number;
  price: number;
}
export default function ForexPage() {
  const [selectFrom, setFrom] = useState<string>("");
  const [selectTo, setTo] = useState<string>("");

  const addItem = useWatchlist((s) => s.addItem);
  function resetforex() {
    setFrom("");
    setTo("");
  }

  const fetchedTheme = useThemeStore((s) => s.theme);
  let theme = "";
  if (fetchedTheme == "light") {
    theme = "dark";
  } else if (fetchedTheme == "dark") {
    theme = "light";
  } else {
    theme = "light";
  }
  const { data: tableData, loading: tableLoading } = useTable<ForexRow>({
    endpoint: "http://localhost:5000/api/market/forex",
    params: { from: selectFrom, to: selectTo },
  });
  const { data: forexHistory, loading } = useChartData(
    "http://localhost:5000/api/market/weeklyex",
    { from: selectFrom, to: selectTo },
  );

  function handleAddToWatchlist() {
    if ((!selectFrom && !selectTo) || !forexHistory) return;

    console.log(
      {
        id: `${selectFrom}-${selectTo}`,
        name: selectFrom,
        symbol: `${selectFrom}/${selectTo}`,
        price: tableData?.[0]?.price ?? 0,

        change24h: `${Number(forexHistory[0].price) - Number(forexHistory[1].price)}`,
      },
      forexHistory,
    );
    addItem({
      id: `${selectFrom}-${selectTo}`,
      name: selectFrom,
      symbol: `${selectFrom}/${selectTo}`,
      price: tableData?.[0]?.price ?? 0,

      change24h: Number(forexHistory[0].price) - Number(forexHistory[1].price),
    });
    liked();
  }
  console.log(forexHistory);

  const liked = () =>
    toast.success("Added to Watchlist", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme,
      transition: Bounce,
    });
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
              <Select value={selectFrom} onValueChange={setFrom}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  side="bottom"
                  sideOffset={8}
                  className="max-h-60 overflow-y-auto"
                >
                  <SelectItem value="USD">USD – US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR – Euro</SelectItem>
                  <SelectItem value="GBP">GBP – British Pound</SelectItem>
                  <SelectItem value="JPY">JPY – Japanese Yen</SelectItem>
                  <SelectItem value="CHF">CHF – Swiss Franc</SelectItem>
                  <SelectItem value="CAD">CAD – Canadian Dollar</SelectItem>
                  <SelectItem value="MXN">MXN – Mexican Peso</SelectItem>
                  <SelectItem value="BRL">BRL – Brazilian Real</SelectItem>
                  <SelectItem value="ARS">ARS – Argentine Peso</SelectItem>
                  <SelectItem value="CLP">CLP – Chilean Peso</SelectItem>
                  <SelectItem value="SEK">SEK – Swedish Krona</SelectItem>
                  <SelectItem value="NOK">NOK – Norwegian Krone</SelectItem>
                  <SelectItem value="DKK">DKK – Danish Krone</SelectItem>
                  <SelectItem value="PLN">PLN – Polish Zloty</SelectItem>
                  <SelectItem value="CZK">CZK – Czech Koruna</SelectItem>
                  <SelectItem value="HUF">HUF – Hungarian Forint</SelectItem>
                  <SelectItem value="RON">RON – Romanian Leu</SelectItem>
                  <SelectItem value="INR">INR – Indian Rupee</SelectItem>
                  <SelectItem value="CNY">CNY – Chinese Yuan</SelectItem>
                  <SelectItem value="HKD">HKD – Hong Kong Dollar</SelectItem>
                  <SelectItem value="SGD">SGD – Singapore Dollar</SelectItem>
                  <SelectItem value="KRW">KRW – South Korean Won</SelectItem>
                  <SelectItem value="THB">THB – Thai Baht</SelectItem>
                  <SelectItem value="MYR">MYR – Malaysian Ringgit</SelectItem>
                  <SelectItem value="IDR">IDR – Indonesian Rupiah</SelectItem>
                  <SelectItem value="PHP">PHP – Philippine Peso</SelectItem>
                  <SelectItem value="AED">AED – UAE Dirham</SelectItem>
                  <SelectItem value="SAR">SAR – Saudi Riyal</SelectItem>
                  <SelectItem value="ILS">ILS – Israeli Shekel</SelectItem>
                  <SelectItem value="QAR">QAR – Qatari Riyal</SelectItem>
                  <SelectItem value="ZAR">ZAR – South African Rand</SelectItem>
                  <SelectItem value="EGP">EGP – Egyptian Pound</SelectItem>
                  <SelectItem value="NGN">NGN – Nigerian Naira</SelectItem>
                  <SelectItem value="AUD">AUD – Australian Dollar</SelectItem>
                  <SelectItem value="NZD">NZD – New Zealand Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* To */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">To</label>
              <Select value={selectTo} onValueChange={setTo}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  side="bottom"
                  sideOffset={8}
                  className="max-h-60 overflow-y-auto"
                >
                  <SelectItem value="USD">USD – US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR – Euro</SelectItem>
                  <SelectItem value="GBP">GBP – British Pound</SelectItem>
                  <SelectItem value="JPY">JPY – Japanese Yen</SelectItem>
                  <SelectItem value="CHF">CHF – Swiss Franc</SelectItem>
                  <SelectItem value="CAD">CAD – Canadian Dollar</SelectItem>
                  <SelectItem value="MXN">MXN – Mexican Peso</SelectItem>
                  <SelectItem value="BRL">BRL – Brazilian Real</SelectItem>
                  <SelectItem value="ARS">ARS – Argentine Peso</SelectItem>
                  <SelectItem value="CLP">CLP – Chilean Peso</SelectItem>
                  <SelectItem value="SEK">SEK – Swedish Krona</SelectItem>
                  <SelectItem value="NOK">NOK – Norwegian Krone</SelectItem>
                  <SelectItem value="DKK">DKK – Danish Krone</SelectItem>
                  <SelectItem value="PLN">PLN – Polish Zloty</SelectItem>
                  <SelectItem value="CZK">CZK – Czech Koruna</SelectItem>
                  <SelectItem value="HUF">HUF – Hungarian Forint</SelectItem>
                  <SelectItem value="RON">RON – Romanian Leu</SelectItem>
                  <SelectItem value="INR">INR – Indian Rupee</SelectItem>
                  <SelectItem value="CNY">CNY – Chinese Yuan</SelectItem>
                  <SelectItem value="HKD">HKD – Hong Kong Dollar</SelectItem>
                  <SelectItem value="SGD">SGD – Singapore Dollar</SelectItem>
                  <SelectItem value="KRW">KRW – South Korean Won</SelectItem>
                  <SelectItem value="THB">THB – Thai Baht</SelectItem>
                  <SelectItem value="MYR">MYR – Malaysian Ringgit</SelectItem>
                  <SelectItem value="IDR">IDR – Indonesian Rupiah</SelectItem>
                  <SelectItem value="PHP">PHP – Philippine Peso</SelectItem>
                  <SelectItem value="AED">AED – UAE Dirham</SelectItem>
                  <SelectItem value="SAR">SAR – Saudi Riyal</SelectItem>
                  <SelectItem value="ILS">ILS – Israeli Shekel</SelectItem>
                  <SelectItem value="QAR">QAR – Qatari Riyal</SelectItem>
                  <SelectItem value="ZAR">ZAR – South African Rand</SelectItem>
                  <SelectItem value="EGP">EGP – Egyptian Pound</SelectItem>
                  <SelectItem value="NGN">NGN – Nigerian Naira</SelectItem>
                  <SelectItem value="AUD">AUD – Australian Dollar</SelectItem>
                  <SelectItem value="NZD">NZD – New Zealand Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}

            <div className="flex gap-2 md:justify-end">
              <Button variant="outline" onClick={resetforex}>
                Reset
              </Button>

              {tableData.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() =>
                        exportToCSV(
                          tableData,
                          `crypto-${selectFrom}-${selectTo}`,
                        )
                      }
                    >
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        exportToJSON(
                          tableData,
                          `crypto-${selectFrom}-${selectTo}`,
                        )
                      }
                    >
                      Export as JSON
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {forexHistory && (
                <div>
                  <Toggle
                    onClick={handleAddToWatchlist}
                    aria-label="Toggle bookmark"
                    size="sm"
                    variant="outline"
                    className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
                  >
                    <BookmarkIcon />
                    Bookmark
                  </Toggle>
                  <ToastContainer />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 Market Table */}
      {selectFrom != "" && selectTo != "" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Exchange Rates</CardTitle>
          </CardHeader>

          <CardContent>
            <TableDemo data={tableData} loading={tableLoading} name={"forex"} />
          </CardContent>
        </Card>
      )}
      {selectFrom != "" && selectTo != "" && (
        <Card>
          {loading ? (
            <div className="p-6">Loading chart…</div>
          ) : (
            <div className="px-4">
              <ChartAreaInteractive
                title="forex Price History"
                description="Daily forex price (USD)"
                data={forexHistory.reverse()}
              />
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

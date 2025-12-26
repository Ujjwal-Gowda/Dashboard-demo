import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
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
import { ArrowLeftRight } from "lucide-react";
import axios from "axios";

type AssetType = "crypto" | "forex" | "stocks";

export default function ConverterPage() {
  const [fromType, setFromType] = useState<AssetType>("crypto");
  const [toType, setToType] = useState<AssetType>("forex");

  const [fromSymbol, setFromSymbol] = useState("BTC");
  const [toSymbol, setToSymbol] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [convalue, setValue] = useState("");
  async function converter() {
    const values = await axios.get(
      "http://localhost:5000/api/service/convert",
      {
        params: {
          from: fromSymbol,
          to: toSymbol,
          ftype: fromType,
          toType: toType,
        },
      },
    );
    setValue(values.data.cleanedData.rate);
  }
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="px-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Asset Converter
        </h1>
        <p className="text-sm text-muted-foreground">
          Convert between crypto, forex, and stocks in real time
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-base">Converter</CardTitle>
          <CardDescription>Flexible cross-asset conversion</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* From / To */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-end">
            {/* FROM */}
            <Card className="p-4">
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground">
                  From
                </p>

                <Select
                  value={fromType}
                  onValueChange={(v) => setFromType(v as AssetType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crypto">Crypto</SelectItem>
                    <SelectItem value="forex">Forex</SelectItem>
                    <SelectItem value="stocks">Stocks</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  value={fromSymbol}
                  onChange={(e) => setFromSymbol(e.target.value.toUpperCase())}
                  placeholder="BTC"
                />
              </div>
            </Card>

            {/* SWAP */}
            <Button
              variant="ghost"
              size="icon"
              className="mt-12 mb-12"
              onClick={() => {
                setFromType(toType);
                setToType(fromType);
                setFromSymbol(toSymbol);
                setToSymbol(fromSymbol);
              }}
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            {/* TO */}
            <Card className="p-4">
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground">To</p>

                <Select
                  value={toType}
                  onValueChange={(v) => setToType(v as AssetType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crypto">Crypto</SelectItem>
                    <SelectItem value="forex">Forex</SelectItem>
                    <SelectItem value="stocks">Stocks</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  value={toSymbol}
                  onChange={(e) => setToSymbol(e.target.value.toUpperCase())}
                  placeholder="USD"
                />
              </div>
            </Card>
          </div>

          {/* Amount */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Amount
            </label>
            <Input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          {/* Result */}
          <Card className="bg-muted/40 border-dashed">
            <CardContent className="flex items-center justify-between py-6">
              <div>
                <p className="text-xs text-muted-foreground">Converted Value</p>
                <p className="text-2xl font-semibold">{convalue}</p>
              </div>
              <Button onClick={converter} size="lg">
                Convert
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

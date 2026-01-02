import mongoose from "mongoose";
import { string } from "zod";
import { required } from "zod/mini";

const PricePointSchema = new mongoose.Schema({
  date: { type: string, required: true },
  price: { type: Number, required: true },

  open: { type: string },
  high: { type: string },
  low: { type: string },
  close: { type: string },
  volume: { type: string },
});

const MarketSeriesSchema = new mongoose.Schema(
  {
    assetType: {
      type: string,
      required: true,
      enum: ["crypto", "stocks", "forex"],
    },
    symbol: { type: string, required: true },
    data: { PricePointSchema },
    market: { type: string },

    timeframe: {
      type: String,
      enum: ["daily", "weekly"],
      required: true,
    },

    source: {
      type: String,
      enum: ["alphavantage", "finage"],
      required: true,
    },

    fetchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

MarketSeriesSchema.index(
  {
    assetType: 1,
    symbol: 1,
    market: 1,
    timeframe: 1,
  },
  { unique: true },
);

export const MarketModel = mongoose.model("MarketModel", MarketSeriesSchema);

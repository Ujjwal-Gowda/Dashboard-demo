import mongoose from "mongoose";

const PricePointSchema = new mongoose.Schema({
  date: { type: String, required: true },
  price: { type: Number, required: true },
  open: { type: Number },
  high: { type: Number },
  low: { type: Number },
  close: { type: Number },
  volume: { type: Number },
});

const MarketSeriesSchema = new mongoose.Schema(
  {
    assetType: {
      type: String,
      required: true,
      enum: ["crypto", "stocks", "forex"],
    },
    symbol: { type: String, required: true },
    data: [PricePointSchema],
    market: { type: String },
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

MarketSeriesSchema.index(
  { fetchedAt: 1 },
  { expireAfterSeconds: 12 * 60 * 60 },
);
export const MarketModel = mongoose.model("MarketModel", MarketSeriesSchema);

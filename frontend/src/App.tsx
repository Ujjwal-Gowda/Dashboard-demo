import Layout from "./pages/layout";
import Homepage from "./pages/homepage.tsx";
import Market from "./pages/market.tsx";
import Converter from "./pages/converter.tsx";
import Watchlistpage from "./pages/watchlistpage.tsx";
import Stockspage from "./pages/stockspage.tsx";
import Cryptopage from "./pages/cryptopage.tsx";
import Forexpage from "./pages/forexpage.tsx";
import Settingspage from "./pages/settingspage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />

          <Route path="market" element={<Market />}>
            <Route path="crypto" element={<Cryptopage />}></Route>
            <Route path="stocks" element={<Stockspage />}></Route>
            <Route path="forex" element={<Forexpage />}></Route>
          </Route>
          <Route path="watchlist" element={<Watchlistpage />} />

          <Route path="converter" element={<Converter />} />
          <Route path="settings" element={<Settingspage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

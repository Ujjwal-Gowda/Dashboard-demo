import Layout from "./pages/layout";
import Homepage from "./pages/homepage.tsx";
import Market from "./pages/market.tsx";
import Deepdive from "./pages/deepdive.tsx";
import Converter from "./pages/converter.tsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />

          <Route path="market" element={<Market />} />

          <Route path="deepdive" element={<Deepdive />} />

          <Route path="converter" element={<Converter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

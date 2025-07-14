import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import RentTax2526 from "./pages/RentTax2526";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tax Calculators</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent-tax-25-26" element={<RentTax2526 />} />
      </Routes>
    </div>
  );
}

export default App;

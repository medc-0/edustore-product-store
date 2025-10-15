import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

import { Routes, Route } from "react.router-dom";

function App() {
  return (
    <div className="min-h-screen bg-base-200 transition-colors dureation-300">
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;

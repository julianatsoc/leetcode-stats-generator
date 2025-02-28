import { Routes, Route, BrowserRouter } from "react-router-dom";
import LeetCodeStats from "./components/LeetCodeStats";
import FormUserStats from "./components/FormUserStats";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-stone-900 w-screen h-screen flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<FormUserStats />} />
            <Route path="/stats/:username" element={<LeetCodeStats />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

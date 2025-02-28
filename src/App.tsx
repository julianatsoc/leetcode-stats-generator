import { Routes, Route, BrowserRouter } from "react-router-dom";
import LeetCodeStats from "./components/LeetCodeStats";


function App() {
  return (
<>
<div className="bg-stone-900 w-screen h-screen flex items-center justify-center">

    <BrowserRouter>
    <Routes>
    <Route path="/stats/:username" element={<LeetCodeStats />} />
    </Routes>
  </BrowserRouter>
</div>
</>

  );
}

export default App;

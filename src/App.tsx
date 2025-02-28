import { Routes, Route, BrowserRouter } from "react-router-dom";
import LeetCodeStats from "./components/LeetCodeStats";


function App() {
  return (
<>

    <BrowserRouter>
    <Routes>
    <Route path="/stats/:username" element={<LeetCodeStats />} />
    </Routes>
  </BrowserRouter>
</>
  
  );
}

export default App;

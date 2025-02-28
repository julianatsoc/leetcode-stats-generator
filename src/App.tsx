import LeetCodeStats from "./components/LeetCodeStats";
import leetcodelogo from "./assets/leetcodelogo.png";

function App() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-stone-950">
      <img src={leetcodelogo}></img>
      <LeetCodeStats />
    </div>
  );
}

export default App;

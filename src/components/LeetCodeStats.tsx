import { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import { LeetCodeStats } from "../types/LeetCodeStats";
import ProgressCircle from "./ProgressCircle";
import CategoryProgress from "./CategoryProgress";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:3001/stats/";

const LeetCodeStatsComponent = () => {
  const { username } = useParams<{ username: string }>();
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!username) return;
    const fetchStats = async () => {
      try {
        const response = await axios.get<LeetCodeStats>(`${API_URL}${username}`);
        setStats(response.data);
        setError(null);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        setError("Error fetching data: " + errorMessage);
        console.error("Error fetching data:", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [username]);

  const handleExportAsImage = async () => {
    if (!statsRef.current) return;
  
    const padding = 12; 
    const originalCanvas = await html2canvas(statsRef.current, { backgroundColor: "#292524" });

    const newCanvas = document.createElement("canvas");
    newCanvas.width = originalCanvas.width + padding * 2 ;
    newCanvas.height = originalCanvas.height + padding * 2 ;
  
    const ctx = newCanvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#292524";
      ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
      ctx.drawImage(originalCanvas, padding, padding);
    }
  
    const link = document.createElement("a");
    link.href = newCanvas.toDataURL("image/png");
    link.download = `${username}_LeetCodeStats.png`;
    link.click();
  };
  

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!stats) return <p className="text-white">No data available.</p>;

  const totalProgress = (stats.totalSolved / stats.totalQuestions) * 100;
  const categories = [
    { label: "Easy", solved: stats.easySolved, total: stats.totalEasy, color: "green" },
    { label: "Medium", solved: stats.mediumSolved, total: stats.totalMedium, color: "orange" },
    { label: "Hard", solved: stats.hardSolved, total: stats.totalHard, color: "red" },
  ];

  return (
    <div className="p-8 bg-stone-800 text-white rounded-lg shadow-lg w-lg">
      <div ref={statsRef}>
        <h2 className="text-lg font-semibold mb-4">{username}'s LeetCode Stats</h2>
        <div className="flex gap-6 items-center">
          <ProgressCircle progress={totalProgress} totalSolved={stats.totalSolved} totalQuestions={stats.totalQuestions} />
          <div className="flex-1">
            {categories.map(({ label, solved, total, color }) => (
              <CategoryProgress key={label} label={label} solved={solved} total={total} color={color} />
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleExportAsImage} className="mt-4 bg-stone-500 hover:bg-stone-600 text-white py-2 px-4 rounded">
        Export as Image
      </button>
    </div>
  );
};

export default LeetCodeStatsComponent;

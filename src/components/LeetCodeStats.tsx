import { useEffect, useState } from "react";
import axios from "axios";
import { LeetCodeStats } from "../types/LeetCodeStats";
import ProgressCircle from "./ProgressCircle";
import CategoryProgress from "./CategoryProgress";

const API_URL = "http://localhost:3000/stats/";
const USERNAME = "julianaatsoc04";

const LeetCodeStatsComponent = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get<LeetCodeStats>(
          `${API_URL}${USERNAME}`
        );
        setStats(response.data);
        setError(null);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setError("Error fetching data: " + errorMessage);
        console.error("Error fetching data:", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!stats) return <p className="text-white">No data available.</p>;

  const totalProgress = (stats.totalSolved / stats.totalQuestions) * 100;
  const categories = [
    {
      label: "Easy",
      solved: stats.easySolved,
      total: stats.totalEasy,
      color: "green",
    },
    {
      label: "Medium",
      solved: stats.mediumSolved,
      total: stats.totalMedium,
      color: "orange",
    },
    {
      label: "Hard",
      solved: stats.hardSolved,
      total: stats.totalHard,
      color: "red",
    },
  ];

  return (
    <div className="p-6 bg-stone-900 text-white rounded-lg shadow-lg w-lg ">
      <h2 className="text-lg font-semibold mb-4">
        {USERNAME}'s LeetCode Stats
      </h2>

      <div className="flex gap-6 items-center">
        <ProgressCircle
          progress={totalProgress}
          totalSolved={stats.totalSolved}
          totalQuestions={stats.totalQuestions}
        />
        <div className="flex-1">
          {categories.map(({ label, solved, total, color }) => (
            <CategoryProgress
              key={label}
              label={label}
              solved={solved}
              total={total}
              color={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeetCodeStatsComponent;

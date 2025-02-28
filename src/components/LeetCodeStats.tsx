import { useEffect, useState } from "react";
import axios from "axios";
import { LeetCodeStats } from "../types/LeetCodeStats";

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
    <div className="p-6 bg-stone-900 text-white rounded-lg shadow-lg ">
      <h2 className="text-lg font-semibold mb-4">
        {USERNAME}'s LeetCode Stats
      </h2>

      <div className="flex gap-6 items-center">
        <div className="relative flex flex-col items-center">
          <svg width="80" height="80" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#444"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="yellow"
              strokeWidth="6"
              fill="none"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * totalProgress) / 100}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            <text
              x="50"
              y="55"
              textAnchor="middle"
              fontSize="16"
              fill="white"
              fontWeight="bold"
            >
              {stats.totalSolved}
            </text>
          </svg>
          <span className="text-sm mt-2">Total Solved </span>

          <span className="text-sm mt-2">
            {" "}
            {stats.totalSolved} / {stats.totalQuestions}
          </span>
        </div>

        <div className="flex-1">
          {categories.map(({ label, solved, total, color }) => {
            const progress = (solved / total) * 100;
            return (
              <div key={label} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{label}</span>
                  <span>
                    {solved} / {total}
                  </span>
                </div>
                <svg width="100%" height="10">
                  <line
                    x1="0"
                    y1="5"
                    x2="100%"
                    y2="5"
                    stroke="#444"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <line
                    x1="0"
                    y1="5"
                    x2={`${progress}%`}
                    y2="5"
                    stroke={color}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeetCodeStatsComponent;

import { useEffect, useState } from "react";
import axios from "axios";
import { LeetCodeStats } from "../types/LeetCodeStats";

const API_URL = "http://localhost:3000/stats/";
const USERNAME = "julianaatsoc04";

const LeetCodeStatsComponent = () => {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<LeetCodeStats>(`${API_URL}${USERNAME}`)
      .then((response) => {
        setStats(response.data);
        setError(null);
      })
      .catch((error) => {
        setError("Erro ao buscar dados: " + error.message);
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!stats) return <p>Carregando...</p>;

  const solvedPercentage = (stats.totalSolved / stats.totalQuestions) * 100;
  const easySolvedPercentage = (stats.easySolved / stats.totalEasy) * 100;
  const mediumSolvedPercentage = (stats.mediumSolved / stats.totalMedium) * 100;
  const hardSolvedPercentage = (stats.hardSolved / stats.totalHard) * 100;

  const svgWidth = 120;
  const svgHeight = 120;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  const easyStrokeDashoffset =
    circumference - (easySolvedPercentage / 100) * circumference;
  const mediumStrokeDashoffset =
    circumference - (mediumSolvedPercentage / 100) * circumference;
  const hardStrokeDashoffset =
    circumference - (hardSolvedPercentage / 100) * circumference;

  return (
    <div className="flex flex-row items-center gap-4 p-4 bg-white shadow-md rounded-lg max-w-sm w-full">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        {USERNAME}'s LeetCode Stats
      </h2>

      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        enableBackground={"#000000"}
      >
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="10"
        />

        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#4CAF50" // Verde
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={easyStrokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />

        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#FF9800"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={mediumStrokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />

        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#F44336"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={hardStrokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="20"
          fill="#4CAF50"
        >
          {Math.round(solvedPercentage)}%
        </text>
      </svg>

      <p className="text-sm text-gray-600 mt-2">
        Total de questões resolvidas: {stats.totalSolved} de{" "}
        {stats.totalQuestions} ({Math.round(solvedPercentage)}%)
      </p>
      <p className="text-sm text-gray-600">
        Easy: {stats.easySolved} de {stats.totalEasy} (
        {Math.round(easySolvedPercentage)}%)
      </p>
      <p className="text-sm text-gray-600">
        Medium: {stats.mediumSolved} de {stats.totalMedium} (
        {Math.round(mediumSolvedPercentage)}%)
      </p>
      <p className="text-sm text-gray-600">
        Hard: {stats.hardSolved} de {stats.totalHard} (
        {Math.round(hardSolvedPercentage)}%)
      </p>
    </div>
  );
};

export default LeetCodeStatsComponent;

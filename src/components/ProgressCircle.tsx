interface ProgressCircleProps {
  progress: number;
  totalSolved: number;
  totalQuestions: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  totalSolved,
  totalQuestions,
}) => {
  const strokeDashoffset = 251.2 - (251.2 * progress) / 100;

  return (
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
          strokeDashoffset={strokeDashoffset}
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
          {totalSolved}
        </text>
      </svg>
      <span className="text-sm mt-2">Total Solved</span>
      <span className="text-sm mt-2">
        {totalSolved} / {totalQuestions}
      </span>
    </div>
  );
};

export default ProgressCircle;

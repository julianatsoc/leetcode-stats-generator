import React from "react";

interface CategoryProgressProps {
  label: string;
  solved: number;
  total: number;
  color: string;
}

const CategoryProgress: React.FC<CategoryProgressProps> = ({
  label,
  solved,
  total,
  color,
}) => {
  const progress = (solved / total) * 100;

  return (
    <div className="mb-4">
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
};

export default CategoryProgress;

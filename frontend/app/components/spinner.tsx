
"use client";

import React from "react";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  colorClass?: string; 
  showText?: boolean;
  text?: string;
};

const sizeMap: Record<"sm" | "md" | "lg", string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
};

export default function Spinner({
  size = "md",
  colorClass = "text-gray-700",
  showText = false,
  text = "Loading...",
}: SpinnerProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <svg
        className={`animate-spin ${sizeMap[size]} ${colorClass}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="status"
        aria-label={text}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>

      {showText && <span className="text-sm text-gray-600">{text}</span>}
    </div>
  );
}

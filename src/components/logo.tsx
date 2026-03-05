import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 32, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Eye Shape */}
      <path
        d="M10 50C10 50 25 20 50 20C75 20 90 50 90 50C90 50 75 80 50 80C25 80 10 50 10 50Z"
        stroke="currentColor"
        strokeWidth="4"
      />

      {/* Bridge Arch */}
      <path
        d="M30 65C30 45 40 35 50 35C60 35 70 45 70 65"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Center Node */}
      <circle
        cx="50"
        cy="50"
        r="8"
        fill="currentColor"
      />

      {/* Scan Lines */}
      <path
        d="M50 20V10M50 90V80M10 50H2M98 50H90"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.5"
      />
    </svg>
  );
};

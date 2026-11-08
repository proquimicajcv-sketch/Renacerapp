import React from 'react';

interface RadialTrackerProps {
  pelvicPercent: number; // 0 to 100
  breathingPercent: number; // 0 to 100
  mobilityPercent: number; // 0 to 100
  size?: number;
}

export const RadialTracker: React.FC<RadialTrackerProps> = ({
  pelvicPercent,
  breathingPercent,
  mobilityPercent,
  size = 180,
}) => {
  const strokeWidth = 9;
  const gap = 5;

  // Outer ring (Suelo Pélvico)
  const r1 = size / 2 - strokeWidth / 2 - 4;
  const c1 = 2 * Math.PI * r1;
  const offset1 = c1 - (Math.min(100, Math.max(0, pelvicPercent)) / 100) * c1;

  // Middle ring (Respiración)
  const r2 = r1 - strokeWidth - gap;
  const c2 = 2 * Math.PI * r2;
  const offset2 = c2 - (Math.min(100, Math.max(0, breathingPercent)) / 100) * c2;

  // Inner ring (Movilidad)
  const r3 = r2 - strokeWidth - gap;
  const c3 = 2 * Math.PI * r3;
  const offset3 = c3 - (Math.min(100, Math.max(0, mobilityPercent)) / 100) * c3;

  const totalAverage = Math.round((pelvicPercent + breathingPercent + mobilityPercent) / 3);

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id="terracottaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#96432b" />
            <stop offset="100%" stopColor="#e3a896" />
          </linearGradient>
          <linearGradient id="sageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#41674c" />
            <stop offset="100%" stopColor="#82b090" />
          </linearGradient>
          <linearGradient id="coralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b55b41" />
            <stop offset="100%" stopColor="#f5b8a6" />
          </linearGradient>
        </defs>

        {/* Outer Ring Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r1}
          fill="none"
          stroke="#f2ede9"
          strokeWidth={strokeWidth}
        />
        {/* Outer Ring Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r1}
          fill="none"
          stroke="url(#terracottaGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={c1}
          strokeDashoffset={offset1}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />

        {/* Middle Ring Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r2}
          fill="none"
          stroke="#f2ede9"
          strokeWidth={strokeWidth}
        />
        {/* Middle Ring Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r2}
          fill="none"
          stroke="url(#sageGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={c2}
          strokeDashoffset={offset2}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />

        {/* Inner Ring Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r3}
          fill="none"
          stroke="#f2ede9"
          strokeWidth={strokeWidth}
        />
        {/* Inner Ring Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r3}
          fill="none"
          stroke="url(#coralGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={c3}
          strokeDashoffset={offset3}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center Metrics */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-serif text-3xl font-medium text-[#1d1b19] tracking-tight tabular-nums leading-none">
          {totalAverage}%
        </span>
        <span className="text-[11px] font-medium text-[#55433e] uppercase tracking-wider mt-1">
          progreso hoy
        </span>
      </div>
    </div>
  );
};

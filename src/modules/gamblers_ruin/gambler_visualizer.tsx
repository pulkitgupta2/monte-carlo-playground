"use client";

import React, { useRef, useEffect } from "react";

interface GamblerVisualizerProps {
  initialFunds: number;
  goal: number;
  samplePaths: Array<number[]>;
  isRunning: boolean;
}

const GamblerVisualizer: React.FC<GamblerVisualizerProps> = ({
  initialFunds,
  goal,
  samplePaths,
  isRunning,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const pathColors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    ctx.clearRect(0, 0, width, height);

    if (samplePaths.length === 0 && !isRunning) return;

    const maxSteps =
      samplePaths.length > 0
        ? Math.max(...samplePaths.map((path) => path.length))
        : 0;

    const maxFunds = Math.max(goal, initialFunds) * 1.1;

    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.font = "10px sans-serif";
    ctx.fillStyle = "#94a3b8";

    const yStep = Math.ceil(maxFunds / 5);
    for (let i = 0; i <= maxFunds; i += yStep) {
      const y = height - padding - (i / maxFunds) * (height - 2 * padding);

      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.strokeStyle = "#e2e8f0";
      ctx.stroke();

      ctx.fillText(`$${i}`, padding - 5, y);
    }

    const goalY = height - padding - (goal / maxFunds) * (height - 2 * padding);
    ctx.beginPath();
    ctx.moveTo(padding, goalY);
    ctx.lineTo(width - padding, goalY);
    ctx.strokeStyle = "#22c55e";
    ctx.setLineDash([5, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#22c55e";
    ctx.fillText(`Goal: $${goal}`, padding - 5, goalY);

    const bankruptcyY = height - padding;
    ctx.beginPath();
    ctx.moveTo(padding, bankruptcyY);
    ctx.lineTo(width - padding, bankruptcyY);
    ctx.strokeStyle = "#ef4444";
    ctx.stroke();

    samplePaths.forEach((path, pathIndex) => {
      if (path.length < 2) return;

      ctx.strokeStyle = pathColors[pathIndex % pathColors.length];
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let i = 0; i < path.length; i++) {
        const x = padding + (i / (maxSteps - 1)) * (width - 2 * padding);
        const y =
          height - padding - (path[i] / maxFunds) * (height - 2 * padding);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      for (let i = 0; i < path.length; i++) {
        const x = padding + (i / (maxSteps - 1)) * (width - 2 * padding);
        const y =
          height - padding - (path[i] / maxFunds) * (height - 2 * padding);

        ctx.fillStyle = pathColors[pathIndex % pathColors.length];
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      const finalValue = path[path.length - 1];
      const finalX =
        padding + ((path.length - 1) / (maxSteps - 1)) * (width - 2 * padding);
      const finalY =
        height - padding - (finalValue / maxFunds) * (height - 2 * padding);

      ctx.fillStyle = pathColors[pathIndex % pathColors.length];
      ctx.textAlign = "left";
      ctx.font = "10px sans-serif";

      if (pathIndex < 3) {
        if (finalValue >= goal) {
          ctx.fillText(`Win: $${finalValue}`, finalX + 5, finalY);
        } else if (finalValue <= 0) {
          ctx.fillText(`Bankrupt`, finalX + 5, finalY);
        }
      }
    });

    const initialY =
      height - padding - (initialFunds / maxFunds) * (height - 2 * padding);
    ctx.fillStyle = "#3b82f6";
    ctx.textAlign = "right";
    ctx.fillText(`Start: $${initialFunds}`, padding - 5, initialY);

    ctx.fillStyle = "#64748b";
    ctx.textAlign = "center";

    ctx.fillText("Steps (Bets)", width / 2, height - 10);

    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Funds ($)", 0, 0);
    ctx.restore();
  }, [initialFunds, goal, samplePaths, isRunning, pathColors]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={700}
          height={400}
          className="border border-gray-100 rounded-lg"
        />

        {samplePaths.length === 0 && !isRunning && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-2 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p>
                Run the simulation to see the gambler&apos;s fortune over time
              </p>
            </div>
          </div>
        )}

        {isRunning && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-600">Running simulations...</p>
            </div>
          </div>
        )}
      </div>

      {samplePaths.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 flex flex-wrap gap-4 justify-center">
          {pathColors
            .slice(0, Math.min(5, samplePaths.length))
            .map((color, index) => (
              <div key={index} className="flex items-center">
                <span
                  className="h-3 w-3 rounded-full mr-2"
                  style={{ backgroundColor: color }}
                ></span>
                <span>Sample Path {index + 1}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default GamblerVisualizer;

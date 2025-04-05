"use client";

import React, { useRef, useEffect } from "react";

interface Point {
  x: number;
  y: number;
  inCircle: boolean;
}

interface PiVisualizerProps {
  points: Point[];
  isRunning: boolean;
}

const PiVisualizer: React.FC<PiVisualizerProps> = ({ points, isRunning }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 10;

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(centerX - radius, centerY - radius, radius * 2, radius * 2);
    ctx.stroke();

    ctx.strokeStyle = "#94a3b8";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();

    points.forEach((point) => {
      const x = centerX - radius + point.x * radius * 2;
      const y = centerY - radius + point.y * radius * 2;

      ctx.fillStyle = point.inCircle ? "#3b82f6" : "#ef4444";
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.strokeStyle = "#cbd5e1";
    ctx.setLineDash([5, 5]);

    ctx.beginPath();
    ctx.moveTo(centerX - radius - 10, centerY);
    ctx.lineTo(centerX + radius + 10, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius - 10);
    ctx.lineTo(centerX, centerY + radius + 10);
    ctx.stroke();

    ctx.setLineDash([]);
  }, [points]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          className="border border-gray-100 rounded-lg"
        />

        {points.length === 0 && !isRunning && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p>Run the simulation to see points</p>
            </div>
          </div>
        )}

        {isRunning && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-600">Calculating...</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500 flex space-x-6">
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
          <span>Points inside circle</span>
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
          <span>Points outside circle</span>
        </div>
      </div>
    </div>
  );
};

export default PiVisualizer;

"use client";

import React, { useState } from "react";
import PiVisualizer from "./pi_visualizer";
import { runPiEstimation } from "./pi_estimator";

const PiEstimatorPage: React.FC = () => {
  const [iterations, setIterations] = useState<number>(1000);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const [points, setPoints] = useState<
    Array<{ x: number; y: number; inCircle: boolean }>
  >([]);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const handleRunSimulation = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setResult(null);
    setPoints([]);
    setAccuracy(null);

    const { estimatedPi, accuracy, pointSubset } = await runPiEstimation(
      iterations
    );

    setResult(estimatedPi);
    setAccuracy(accuracy);
    setPoints(pointSubset);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium text-gray-800">Estimate Pi</h1>
          <p className="text-gray-500 mt-1">
            Monte Carlo method for π approximation using random sampling
          </p>
        </div>
        <button
          onClick={handleRunSimulation}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium
                    hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? "Simulating..." : "Run Simulation"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Parameters</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="iterations"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Number of Iterations: {iterations.toLocaleString()}
                </label>
                <input
                  id="iterations"
                  type="range"
                  min="100"
                  max="1000000"
                  step="100"
                  value={iterations}
                  onChange={(e) => setIterations(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={isRunning}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100</span>
                  <span>10,000</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500 mb-2">Results</div>

                {result ? (
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-gray-500">
                        Estimated Value of π
                      </div>
                      <div className="text-2xl font-mono font-medium text-gray-900">
                        {result}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500">
                        Actual Value of π
                      </div>
                      <div className="text-lg font-mono text-gray-700">
                        {Math.PI.toFixed(8)}
                      </div>
                    </div>

                    {accuracy !== null && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500">Accuracy</div>
                        <div className="text-lg font-medium text-blue-600">
                          {accuracy.toFixed(4)}%
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 italic">
                    Run the simulation to see results
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">
                Visualization
              </h2>
            </div>
            <div className="p-6">
              <PiVisualizer points={points} isRunning={isRunning} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">How It Works</h2>
        </div>
        <div className="p-6">
          <div className="prose max-w-none">
            <p>
              The Monte Carlo method for estimating π works by randomly placing
              points inside a square and counting how many fall within the
              inscribed circle.
            </p>

            <h3 className="text-md font-medium mt-4">The Algorithm:</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Generate random points (x,y) within a 1×1 square</li>
              <li>
                Count points that fall inside the inscribed quarter-circle: x² +
                y² ≤ 1
              </li>
              <li>
                The ratio of points inside the circle to total points approaches
                π/4
              </li>
              <li>Multiply this ratio by 4 to get an estimate of π</li>
            </ol>

            <p className="mt-4">
              The accuracy of this estimate improves with more iterations,
              demonstrating the law of large numbers in probability theory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PiEstimatorPage;

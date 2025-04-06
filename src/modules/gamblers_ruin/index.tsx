"use client";

import React, { useState } from "react";
import GamblerVisualizer from "./gambler_visualizer";
import { runGamblerSimulation } from "./gambler_estimator";

const GamblerRuinPage: React.FC = () => {
  const [initialFunds, setInitialFunds] = useState<number>(50);
  const [goal, setGoal] = useState<number>(100);
  const [winProbability, setWinProbability] = useState<number>(0.5);
  const [betAmount, setBetAmount] = useState<number>(1);
  const [numSimulations, setNumSimulations] = useState<number>(100);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [results, setResults] = useState<{
    winCount: number;
    bankruptcyCount: number;
    averageSteps: number;
    winProbability: number;
    samplePaths: Array<number[]>;
    stepVariance: number;
    logInsights: {
      logStart: number;
      logGoal: number;
    };
  } | null>(null);

  const handleRunSimulation = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setResults(null);

    const result = await runGamblerSimulation(
      initialFunds,
      goal,
      winProbability,
      betAmount,
      numSimulations
    );

    console.log(result);

    setResults(result);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium text-gray-800">
            Gambler&apos;s Ruin
          </h1>
          <p className="text-gray-500 mt-1">
            Simulating the probability of winning or going bankrupt in
            sequential betting
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
                  htmlFor="initialFunds"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Initial Funds: ${initialFunds}
                </label>
                <input
                  id="initialFunds"
                  type="range"
                  min="10"
                  max="90"
                  step="10"
                  value={initialFunds}
                  onChange={(e) => setInitialFunds(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={isRunning}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$10</span>
                  <span>$90</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Target Goal: ${goal}
                </label>
                <input
                  id="goal"
                  type="range"
                  min={initialFunds + 10}
                  max="200"
                  step="10"
                  value={goal}
                  onChange={(e) => setGoal(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={isRunning}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>${initialFunds + 10}</span>
                  <span>$200</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="winProbability"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Win Probability: {(winProbability * 100).toFixed(0)}%
                </label>
                <input
                  id="winProbability"
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={winProbability}
                  onChange={(e) =>
                    setWinProbability(parseFloat(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={isRunning}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10%</span>
                  <span>90%</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="betAmount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bet Amount: ${betAmount}
                </label>
                <input
                  id="betAmount"
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={betAmount}
                  onChange={(e) => setBetAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={isRunning}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$1</span>
                  <span>$10</span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="numSimulations"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Number of Simulations: {numSimulations.toLocaleString()}
                </label>
                <input
                  id="numSimulations"
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={numSimulations}
                  onChange={(e) => setNumSimulations(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={isRunning}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10</span>
                  <span>1,000</span>
                </div>
              </div>

              {results && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500 mb-2">
                    Simulation Results
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">
                          Win Probability:
                        </span>
                        <span className="text-sm font-medium text-blue-600">
                          {(results.winProbability * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${results.winProbability * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Win Count:</span>
                      <span className="text-sm font-medium">
                        {results.winCount}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">
                        Bankruptcy Count:
                      </span>
                      <span className="text-sm font-medium">
                        {results.bankruptcyCount}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">
                        Average Steps:
                      </span>
                      <span className="text-sm font-medium">
                        {results.averageSteps.toFixed(1)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">
                        Step Variance:
                      </span>
                      <span className="text-sm font-medium">
                        {results.stepVariance.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">
                        log(Initial Funds + 1):
                      </span>
                      <span className="text-sm font-medium">
                        {results.logInsights.logStart.toFixed(3)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">
                        log(Goal + 1):
                      </span>
                      <span className="text-sm font-medium">
                        {results.logInsights.logGoal.toFixed(3)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
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
              <GamblerVisualizer
                initialFunds={initialFunds}
                goal={goal}
                samplePaths={results?.samplePaths || []}
                isRunning={isRunning}
              />
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
              The Gambler&apos;s Ruin problem models a gambler who starts with
              an initial stake and makes a series of bets, winning or losing a
              fixed amount with certain probabilities.
            </p>

            <h3 className="text-md font-medium mt-4">The Scenario:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>A gambler starts with ${initialFunds} (initial funds)</li>
              <li>
                Each bet has a {(winProbability * 100).toFixed(0)}% chance of
                winning and a {(100 - winProbability * 100).toFixed(0)}% chance
                of losing
              </li>
              <li>
                The gambler wins ${betAmount} or loses ${betAmount} on each bet
              </li>
              <li>
                The gambler continues betting until either reaching the goal ($
                {goal}) or going bankrupt ($0)
              </li>
            </ul>

            <h3 className="text-md font-medium mt-4">Mathematical Analysis:</h3>
            <p>
              For a fair game (50% win probability), the probability of reaching
              the target goal before bankruptcy is proportional to the initial
              funds divided by the goal. As the win probability changes, this
              relationship becomes non-linear.
            </p>

            <p className="mt-4">
              The simulation runs multiple trials and tracks the outcomes to
              estimate the actual probability of success and the average number
              of bets needed to reach either outcome.
            </p>

            <h3 className="text-md font-medium mt-4">
              Deeper Statistical Insights:
            </h3>
            <p>
              We compute not only average steps but also the{" "}
              <strong>variance</strong> in steps, which shows how spread out the
              outcomes are. A higher variance indicates more unpredictability in
              reaching a final outcome.
            </p>
            <p className="mt-2">
              We also use logarithmic scaling via <code>log1p</code> to
              calculate the log-transformed values of starting funds and goal.
              These can be useful in strategies like Martingale where the impact
              of multiplicative growth or loss is significant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamblerRuinPage;

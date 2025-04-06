import uniform from "@stdlib/random/base/uniform";
import mean from "@stdlib/stats/base/mean";
import variance from "@stdlib/stats/base/variance";
import log1p from "@stdlib/math/base/special/log1p";

type SimulationResult = {
  won: boolean;
  steps: number;
  path: number[];
};

const simulateSingleRun = (
  initialFunds: number,
  goal: number,
  winProbability: number,
  betAmount: number,
  rand: () => number
): SimulationResult => {
  let funds = initialFunds;
  let steps = 0;
  const path = [funds];

  while (funds > 0 && funds < goal) {
    const roll = rand();
    funds += roll < winProbability ? betAmount : -betAmount;
    path.push(funds);
    steps++;

    if (steps > 1000) break;
  }

  return {
    won: funds >= goal,
    steps,
    path,
  };
};

export const runGamblerSimulation = async (
  initialFunds: number,
  goal: number,
  winProbability: number,
  betAmount: number,
  numSimulations: number,
  maxSamplePaths = 5
) => {
  const rand = uniform.factory(0.0, 1.0);

  const winResults: boolean[] = [];
  const stepsArray: number[] = [];
  const samplePaths: number[][] = [];

  for (let i = 0; i < numSimulations; i++) {
    const result = simulateSingleRun(
      initialFunds,
      goal,
      winProbability,
      betAmount,
      rand
    );

    winResults.push(result.won);
    stepsArray.push(result.steps);

    if (samplePaths.length < maxSamplePaths) {
      samplePaths.push(result.path);
    } else if (Math.random() < 0.05) {
      const index = Math.floor(Math.random() * maxSamplePaths);
      samplePaths[index] = result.path;
    }

    if (i % 1000 === 0) await new Promise((r) => setTimeout(r, 0));
  }

  const winCount = winResults.filter((w) => w).length;
  const bankruptcyCount = winResults.length - winCount;
  const averageSteps = mean(stepsArray.length, stepsArray, 1);
  const stepVariance = variance(stepsArray.length, 1, stepsArray, 1);

  return {
    winCount,
    bankruptcyCount,
    averageSteps,
    stepVariance,
    winProbability: winCount / numSimulations,
    samplePaths,
    logInsights: {
      logStart: log1p(initialFunds),
      logGoal: log1p(goal),
    },
  };
};

import uniform from "@stdlib/random/base/uniform";
import sqrt from "@stdlib/math/base/special/sqrt";
export interface SimulationResult {
  estimatedPi: number;
  pointsInside: number;
  pointsTotal: number;
  points: Array<{ x: number; y: number; inCircle: boolean }>;
}

export const runPiEstimation = async (iterations: number) => {
  const randX = uniform.factory(0.0, 1.0);
  const randY = uniform.factory(0.0, 1.0);

  let inside = 0;
  const pointSubset: Array<{ x: number; y: number; inCircle: boolean }> = [];

  for (let i = 0; i < iterations; i++) {
    const x = randX();
    const y = randY();

    const dx = x - 0.5;
    const dy = y - 0.5;
    const dist = sqrt(dx * dx + dy * dy);
    const inCircle = dist <= 0.5;

    if (inCircle) inside++;

    if (i % Math.max(1, Math.floor(iterations / 1000)) === 0) {
      pointSubset.push({ x, y, inCircle });
    }

    if (i % 1000 === 0) await new Promise((r) => setTimeout(r, 0));
  }

  const estimatedPi = (inside / iterations) * 4;
  const actualPi = Math.PI;
  const accuracy = (1 - Math.abs(estimatedPi - actualPi) / actualPi) * 100;

  return { estimatedPi, accuracy, pointSubset };
};

# Monte Carlo Simulation Playground

This project is a showcase for my Google Summer of Code (GSoC) application with [`stdlib`](https://github.com/stdlib-js/stdlib).

## Overview

The Monte Carlo Simulation Playground is an interactive tool built to demonstrate the power and versatility of Monte Carlo methods. It serves as both an educational resource and a technical demo of how `stdlib` can be used in simulations and statistical computation.

## Features

- **Two simulation modules implemented:**

  - **Gambler's Ruin** – Visualize the classic probability problem involving wins, losses, and ruin.
  - **Pi Estimator** – Estimate the value of π using random sampling.

- **Powered by [`stdlib`](https://github.com/stdlib-js/stdlib):**

  - Uses `@stdlib/random/base/uniform` for precise and reproducible random sampling.
  - Applies `@stdlib/stats/mean` and `@stdlib/stats/variance` to calculate average and variability in simulation steps.
  - Leverages `@stdlib/math/base/special/log1p` to offer log-transformed insights on initial capital and goal amounts.

- **Real-time Visualization:**
  - Canvas-based rendering of sample paths across simulations.
  - Slider-based parameter controls for instant feedback.

## Tech Stack

- `Next.js` + `React`
- `TypeScript`
- `Tailwind CSS`
- `stdlib`

Feel free to explore the code and try out the simulations!

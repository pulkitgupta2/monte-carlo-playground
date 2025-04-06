import GamblerRuinPage from "./gamblers_ruin";
import PiEstimatorPage from "./pi";

interface Module {
  id: string;
  name: string;
  component: React.ReactNode;
}

export const modules: Module[] = [
  { id: "gambler", name: "Gambler's Ruin", component: <GamblerRuinPage /> },
  { id: "pi", name: "Estimate Pi", component: <PiEstimatorPage /> },
];

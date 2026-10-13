import type { NavigationItem } from "../types/Navigation";

export const navigationItems: NavigationItem[] = [
  { label: "Dashboard", icon: "◫", route: "/", active: true },
  { label: "Skills Library", icon: "◎", route: "/skills", active: false },
  {
    label: "Combination Builder",
    icon: "⇢",
    route: "/combinations",
  },
  { label: "Training Log", icon: "▤", route: "/training", active: false },
  {
    label: "Development Path",
    icon: "↗",
    route: "/development",
    active: false,
  },
  {
    label: "AI Training Planner",
    icon: "✳",
    route: "/ai-planner",
    active: false,
  },
];

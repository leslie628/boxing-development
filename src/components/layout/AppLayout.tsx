import type { ReactNode } from "react";
import { navigationItems } from "../../data/navigationItems";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white md:flex">
      <Sidebar navigation={navigationItems} />
      <div className="min-w-0 flex-1">
        <Header />
        {children}
      </div>
    </div>
  );
}

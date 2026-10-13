import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/skills': 'Skills Library',
  '/combinations': 'Combination Builder',
  '/training': 'Training Log',
  '/development': 'Development Path',
  '/ai-planner': 'AI Training Planner',
}

const Header = () => {
    const {pathname}=useLocation();
    const title=pageTitles[pathname] ?? "Page not found";
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 px-6 py-5 lg:px-10">
      <div>
        <p className="text-sm text-slate-400">Training workspace</p>
        <h2 className="mt-1 text-xl font-bold">{title}</h2>
      </div>
      <div className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300">
        Personal training
      </div>
    </header>
  );
};
export default Header;

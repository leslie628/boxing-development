import type { NavigationItem } from "../../types/Navigation";
import { NavLink } from "react-router-dom";
interface SidebarProps {
  navigation: NavigationItem[];
}

const Sidebar = ({ navigation }: SidebarProps) => {
  return (
    <aside className="w-full border-b border-slate-800 bg-slate-900 p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 font-black text-slate-950">
          B
        </div>
        <div>
          <h1 className="font-bold tracking-wide">BOXING LAB</h1>
          <p className="text-xs text-slate-400">Development platform</p>
        </div>
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Workspace
      </p>

      <nav className="space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.label}
            to={item.route}
            end={item.route === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                isActive
                  ? "bg-orange-500/10 font-semibold text-orange-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="w-5 text-center">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-10 rounded-xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-sm font-semibold">Your approach</p>
        <p className="mt-2 text-sm text-slate-400">
          Your preferred boxing style
        </p>
      </div>
    </aside>
  );
};
export default Sidebar;

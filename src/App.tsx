import "./App.css";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./features/dashboard/dashboard";
import { dashboardStatItems } from "./data/dashboardStatItems";
import { Route, Routes } from "react-router-dom";
function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="p-6 lg:p-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-slate-400">This page is under development.</p>
    </main>
  );
}
function App() {
  return (
    <AppLayout>
      <Routes>
        <Route
          path="/"
          element={<Dashboard dashboardStats={dashboardStatItems} />}
        />
        <Route
          path="/skills"
          element={<PlaceholderPage title="Skills Library" />}
        />
        <Route
          path="/combinations"
          element={<PlaceholderPage title="Combination Builder" />}
        />
        <Route
          path="/training"
          element={<PlaceholderPage title="Training Log" />}
        />
        <Route
          path="/development"
          element={<PlaceholderPage title="Development Path" />}
        />
        <Route
          path="/ai-planner"
          element={<PlaceholderPage title="AI Training Planner" />}
        />
        <Route path="*" element={<PlaceholderPage title="Page not found" />} />
      </Routes>
    </AppLayout>
  );
}

export default App;

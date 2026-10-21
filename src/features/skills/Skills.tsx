import { useEffect, useState } from "react";
import type { Skill } from "../../types/skill";
import { useSkills } from "../../hooks/useSkills";
const Skills = () => {
  const [search, setSearch] = useState("");
  const { skills, loading: skillsLoading } = useSkills();

  const filteredSkills = skills.filter((skill: Skill) =>
    `${skill.name} ${skill.category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const categories = [
    ...new Set(filteredSkills.map((skill: Skill) => skill.category)),
  ];
  return (
    <main className="mx-auto max-w-screen-2xl space-y-8 p-6 lg:p-10">
      <section>
        <h1 className="text-3xl font-bold text-white">Skills Library</h1>
        <p className="mt-2 text-slate-400">
          Browse the fundamental skills used to build your boxing combinations.
        </p>
      </section>
      {skillsLoading ? (
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-slate-800 bg-slate-900">
          <div
            role="status"
            aria-label="Loading skills"
            className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-orange-500"
          />
        </div>
      ) : (
        <section className="space-y-6">
          <div className="relative max-w-xl">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search skills..."
              aria-label="Search skills"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-4 pr-4 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {categories.length === 0 && (
            <p className="py-8 text-center text-slate-400">
              No skills found. Try another search.
            </p>
          )}

          {categories.map((category) => {
            const categorySkills = filteredSkills.filter(
              (skill) => skill.category === category,
            );

            return (
              <section key={category} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">
                    {category}
                  </h2>
                  <span className="text-sm text-slate-400">
                    {categorySkills.length}{" "}
                    {categorySkills.length === 1 ? "skill" : "skills"}
                  </span>
                </div>

                <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-900 px-4">
                  {categorySkills.map((skill) => (
                    <article
                      key={skill.id}
                      className="flex items-center gap-4 py-4"
                    >
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-white">{skill.name}</h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {skill.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </section>
      )}
    </main>
  );
};
export default Skills;

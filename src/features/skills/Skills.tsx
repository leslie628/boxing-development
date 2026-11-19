import { useState } from "react";
import type { Skill } from "../../types/skill";
import { useSkills } from "../../hooks/useSkills";
const Skills = () => {
  const [search, setSearch] = useState("");
  const { skills, loading: skillsLoading, createNewSkill } = useSkills();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const filteredSkills = skills.filter((skill: Skill) =>
    `${skill.name} ${skill.category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const categories = [
    ...new Set(filteredSkills.map((skill: Skill) => skill.category)),
  ];
  const handleCreateSkill = async () => {
    try {
      await createNewSkill({
        name: name,
        description: description,
        category: category,
      });
      setShowCreateModal(false);
      setName("");
      setDescription("");
      setCategory("");
    } catch (error) {
      console.error("Error saving skill:", error);
    }
  };
  const disableSkillCreate = () => {
    if (!name.trim() || !description.trim() || !category) {
      return true;
    } else {
      return false;
    }
  };
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
          <div className="flex w-full items-center  gap-4">
            <div className="relative max-w-xl flex-1">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search skills..."
                aria-label="Search skills"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-4 pr-4 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              + Create Skill
            </button>
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
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium text-white">
                            {skill.name}
                          </h3>
                          {skill.status && (
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                skill.status === "natural"
                                  ? "bg-green-500/15 text-green-400"
                                  : "bg-orange-500/15 text-orange-400"
                              }`}
                            >
                              {skill.status === "natural"
                                ? "Natural"
                                : "Needs work"}
                            </span>
                          )}
                        </div>

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
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
            <h2 className="mb-6 text-xl font-semibold">Create New Skill</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jab"
                  className="w-full rounded-lg border border-gray-300 bg-transparent p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the boxing technique..."
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 bg-transparent p-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-black p-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="Punches">Punches</option>
                  <option value="Defence">Defence</option>
                  <option value="Footwork">Footwork</option>
                  <option value="Movement">Movement</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreateSkill}
                disabled={disableSkillCreate()}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700
                disabled:cursor-not-allowed disabled:opacity-40"
              >
                Create Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
export default Skills;

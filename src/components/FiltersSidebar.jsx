import React from "react";

const FiltersSidebar = ({
    filters,
    setFilters,
    onApplyFilters,
    onClearFilters,
}) => {
    const skillsList = [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "JavaScript",
        "TypeScript",
        "Next.js",
        "Tailwind",
        "Python",
    ];

    const toggleSkill = (skill) => {
        const exists = filters.skills.includes(skill);

        if (exists) {
            setFilters({
                ...filters,
                skills: filters.skills.filter((s) => s !== skill),
            });
        } else {
            setFilters({
                ...filters,
                skills: [...filters.skills, skill],
            });
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            <p className="text-sm text-gray-500 mt-1">
                Refine jobs based on your preferences.
            </p>

            {/* Role/Title */}
            <div className="mt-6">
                <label className="text-sm font-semibold text-gray-700">
                    Role / Title
                </label>
                <input
                    type="text"
                    value={filters.what}
                    onChange={(e) => setFilters({ ...filters, what: e.target.value })}
                    placeholder="e.g. React Developer"
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Location */}
            <div className="mt-5">
                <label className="text-sm font-semibold text-gray-700">Location</label>
                <input
                    type="text"
                    value={filters.where}
                    onChange={(e) => setFilters({ ...filters, where: e.target.value })}
                    placeholder="e.g. Kolkata"
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Skills */}
            <div className="mt-5">
                <label className="text-sm font-semibold text-gray-700">Skills</label>
                <div className="mt-3 flex flex-wrap gap-2">
                    {skillsList.map((skill) => (
                        <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition cursor-pointer
                ${filters.skills.includes(skill)
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                }`}
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            </div>

            {/* Date Posted */}
            <div className="mt-5">
                <label className="text-sm font-semibold text-gray-700">
                    Date Posted
                </label>
                <select
                    value={filters.datePosted}
                    onChange={(e) =>
                        setFilters({ ...filters, datePosted: e.target.value })
                    }
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="anytime">Any time</option>
                    <option value="24h">Last 24 hours</option>
                    <option value="week">Last week</option>
                    <option value="month">Last month</option>
                </select>
            </div>

            {/* Job Type */}
            <div className="mt-5">
                <label className="text-sm font-semibold text-gray-700">Job Type</label>
                <select
                    value={filters.jobType}
                    onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="all">All</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                </select>
            </div>

            {/* Work Mode */}
            <div className="mt-5">
                <label className="text-sm font-semibold text-gray-700">Work Mode</label>
                <select
                    value={filters.workMode}
                    onChange={(e) => setFilters({ ...filters, workMode: e.target.value })}
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="all">All</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                </select>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
                <button
                    onClick={onApplyFilters}
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-500 active:scale-95 transition cursor-pointer"
                >
                    Apply
                </button>

                <button
                    onClick={onClearFilters}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition cursor-pointer"
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default FiltersSidebar;

import { CiLocationOn } from "react-icons/ci";
import { BsSuitcaseLg } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const JobCard = ({ job }) => {
    const [saving, setSaving] = useState(false);

    const saveApplication = async () => {
        try {
            setSaving(true);

            const res = await fetch("http://localhost:8000/api/v1/applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jobId: job.id,
                    title: job.title,
                    company: job.company,
                    location: job.location,
                    applyUrl: job.applyUrl,
                }),
            });

            const data = await res.json();

            // Optional: show message
            if (!data.success) {
                alert(data.message || "Could not save application");
            }

            // Open apply link after saving
            if (job.applyUrl) {
                window.open(job.applyUrl, "_blank");
            }
        } catch (error) {
            alert("Server not responding!");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 w-full">
            {/* Top */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">{job.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                </div>

                {/* AI match score */}
                {/* <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                    {job.matchScore ?? 0}% Match
                </span> */}

            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <CiLocationOn className="text-lg" />
                    <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-1">
                    <BsSuitcaseLg />
                    <span>{job.jobType || "Full-time"}</span>
                </div>

                <div className="flex items-center gap-1">
                    <FaRegClock />
                    <span>{job.posted || "Recently"} </span>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mt-4 leading-relaxed line-clamp-2">
                {job.description}
            </p>

            {/* Bottom */}
            <div className="flex items-center justify-between mt-5">
                <button
                    onClick={saveApplication}
                    disabled={saving}
                    className={`px-5 py-2 rounded-xl active:scale-95 transition font-medium
                    ${saving
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-500 cursor-pointer"
                        }`}
                >
                    {saving ? "Saving..." : "Apply"}
                </button>

                <Link to={`/jobs/${job.id}`} state={{ job }}>
                    <button className="text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
                        View Details →
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default JobCard;

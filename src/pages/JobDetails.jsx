import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { BsSuitcaseLg } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const [job, setJob] = useState(location.state?.job || null);

  const [saving, setSaving] = useState(false);

  const [match, setMatch] = useState(null);
  const [matchLoading, setMatchLoading] = useState(false);

  // Refresh case: no state
  useEffect(() => {
    if (!location.state?.job) {
      setJob(null);
    }
  }, [id]);

  // ✅ Apply + Save tracking
  const handleApply = async () => {
    try {
      if (!job) return;

      setSaving(true);

      const res = await fetch("https://job-tracker-server-ln8r.onrender.com/api/v1/applications", {
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

      if (!data.success) {
        toast.error(data.message || "Could not save application");
      } else {
        toast.success("Application saved");
      }

      if (job.applyUrl) {
        window.open(job.applyUrl, "_blank");
      }
    } catch (error) {
      toast.error("Server not responding!");
    } finally {
      setSaving(false);
    }
  };

  // ✅ AI Match Score (LangChain API)
  const getScore = async () => {
    try {
      if (!job) return;

      setMatchLoading(true);
      setMatch(null);

      const res = await fetch(" https://job-tracker-server-ln8r.onrender.com/api/v1/match-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: job.title,
          jobDescription: job.description,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Could not calculate match score");
        return;
      }

      setMatch(data.match);
      toast.success("Match score generated");
    } catch (error) {
      toast.error("AI server not responding!");
    } finally {
      setMatchLoading(false);
    }
  };

  // If job missing
  if (!job) {
    return (
      <div className="pt-24 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-red-600 font-medium">
            Job details not available. Please go back and open from Jobs list.
          </p>

          <Link
            to="/"
            className="inline-block mt-4 text-blue-600 font-medium hover:underline"
          >
            ← Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  // Score badge color
  const score = match?.score ?? 0;

  const scoreColor =
    score >= 70
      ? "bg-green-100 text-green-700"
      : score >= 40
        ? "bg-yellow-100 text-yellow-700"
        : "bg-gray-100 text-gray-700";

  return (
    <div className="pt-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <Link
          to="/"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back
        </Link>

        {/* Main Card */}
        <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {/* Top */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {job.title}
              </h1>
              <p className="text-gray-600 mt-2 text-base">{job.company}</p>
            </div>

            {/* Score */}
            <span className={`px-4 py-2 rounded-full text-sm font-semibold w-fit ${scoreColor}`}>
              {match ? `${match.score}% Match` : "Match: Not calculated"}
            </span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-5 mt-5 text-sm text-gray-600">
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
              <span>{job.posted || "Recently"}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleApply}
              disabled={saving}
              className={`px-6 py-3 rounded-xl active:scale-95 transition text-center font-medium
                ${saving
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-500 cursor-pointer"
                }`}
            >
              {saving ? "Saving..." : "Apply on Company Site"}
            </button>

            <button
              onClick={getScore}
              disabled={matchLoading}
              className={`px-6 py-3 rounded-xl active:scale-95 transition text-center font-medium
                ${matchLoading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                }`}
            >
              {matchLoading ? "Calculating..." : "AI Match Score"}
            </button>
          </div>
        </div>

        {/* Match Result */}
        {match && (
          <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              AI Resume Match Result
            </h2>

            <p className="text-gray-600 mt-3">{match.summary}</p>

            {/* Missing Skills */}
            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-800">
                Missing Skills
              </p>

              {match.missingSkills?.length === 0 ? (
                <p className="text-sm text-gray-600 mt-2">
                  No missing skills found 🎉
                </p>
              ) : (
                <div className="flex flex-wrap gap-2 mt-3">
                  {match.missingSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900">Job Description</h2>

          <p className="text-gray-600 mt-4 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <h3 className="font-semibold text-blue-900">
            Tips to improve your match score
          </h3>
          <ul className="text-sm text-blue-800 mt-3 space-y-1">
            <li>• Add missing skills in your resume</li>
            <li>• Mention relevant projects (React, Node, APIs)</li>
            <li>• Keep resume updated in PDF format</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

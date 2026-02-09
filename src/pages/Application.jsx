import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import DotLoader from "react-spinners/DotLoader";

const Application = () => {
  const BASE_URL = "https://job-tracker-server-ln8r.onrender.com";

  const [activeTab, setActiveTab] = useState("All");
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tabs = ["All", "Applied", "Interview", "Offer", "Rejected"];

  // ✅ Fetch applications from backend
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${BASE_URL}/api/v1/applications`);
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to fetch applications");
        return;
      }

      setApplications(data.applications || []);
    } catch (err) {
      setError("Server not responding!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ✅ Update status
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/applications/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to update status");
        return;
      }

      fetchApplications();
    } catch (err) {
      alert("Server not responding!");
    }
  };

  // ✅ Delete application
  const deleteApplication = async (id) => {
    try {
      const confirmDelete = window.confirm("Remove this application?");
      if (!confirmDelete) return;

      const res = await fetch(`${BASE_URL}/api/v1/applications/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to delete application");
        return;
      }

      fetchApplications();
    } catch (err) {
      alert("Server not responding!");
    }
  };

  // Tabs filter
  const filteredApplications =
    activeTab === "All"
      ? applications
      : applications.filter((app) => app.status === activeTab);

  // Badge colors
  const statusColor = (status) => {
    if (status === "Applied") return "bg-blue-50 text-blue-700";
    if (status === "Interview") return "bg-yellow-50 text-yellow-700";
    if (status === "Offer") return "bg-green-50 text-green-700";
    if (status === "Rejected") return "bg-red-50 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  // Date format
  const formatDate = (iso) => {
    if (!iso) return "Unknown";
    const d = new Date(iso);
    return d.toLocaleString();
  };

  return (
    <div className="pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
            <p className="text-gray-600 mt-2">
              Track your job applications and update statuses.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 px-4 py-2 rounded-xl text-blue-700 font-medium text-sm">
            Total: {applications.length}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition
                ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && <div className="text-gray-600 w-full flex justify-center"><DotLoader color="blue" size={30}/></div>}

        {/* Error */}
        {error && <p className="text-red-600 font-medium">{error}</p>}

        {/* Applications List */}
        {!loading && !error && (
          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">
                  No applications found
                </h2>
                <p className="text-gray-600 mt-2">
                  Start applying to jobs and track them here.
                </p>
              </div>
            ) : (
              filteredApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                  {/* Top Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {app.title}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {app.company}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <CiLocationOn className="text-lg" />
                          <span>{app.location}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <FaRegClock />
                          <span>Applied: {formatDate(app.appliedAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col items-start sm:items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>

                      {/* Dropdown */}
                      <select
                        value={app.status}
                        onChange={(e) => updateStatus(app.id, e.target.value)}
                        className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                      </select>
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      Last updated:{" "}
                      <span className="font-medium">
                        {formatDate(app.updatedAt)}
                      </span>
                    </p>

                    <div className="flex gap-2">
                      <a
                        href={app.applyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
                      >
                        View Job
                      </a>

                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="px-4 py-2 rounded-xl bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Application;

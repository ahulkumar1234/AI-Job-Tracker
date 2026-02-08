import React, { useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const AddCv = () => {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [resumes, setResumes] = useState([]);

  // ✅ Fetch uploaded resumes
  const fetchResumes = async () => {
    try {
      const res = await fetch("https://job-tracker-server-ln8r.onrender.com/api/v1/resume");
      const data = await res.json();

      if (data.success) {
        setResumes(data.resumes || []);
      }
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // File validate
  const validateFile = (f) => {
    if (!f) return false;

    if (f.type !== "application/pdf") {
      setError("Only PDF files are allowed!");
      setFile(null);
      return false;
    }

    // 5 MB limit (optional)
    if (f.size > 5 * 1024 * 1024) {
      setError("File size should be under 5 MB!");
      setFile(null);
      return false;
    }

    return true;
  };

  // When file selected
  const handleFileChange = (f) => {
    setMessage("");
    setError("");

    if (!validateFile(f)) return;

    setFile(f);
  };

  // Upload resume
  const handleUpload = async () => {
    try {
      setLoading(true);
      setMessage("");
      setError("");

      if (!file) {
        setError("Please select a PDF resume first!");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("https://job-tracker-server-ln8r.onrender.com/api/v1/resume/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Upload failed!");
        return;
      }

      setMessage("Resume uploaded successfully");
      setFile(null);

      fetchResumes();
    } catch (err) {
      setError("Server not responding!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Resume Upload</h1>
          <p className="text-gray-600 mt-2">
            Upload your resume (PDF). We will use it to calculate match score and track applications.
          </p>
        </div>

        {/* Upload Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Upload Box */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">

            <h2 className="text-lg font-bold text-gray-900">
              Upload Resume
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Supported format: PDF (max 5MB)
            </p>

            {/* Drop Area */}
            <div
              onDragEnter={() => setDragging(true)}
              onDragLeave={() => setDragging(false)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);

                const droppedFile = e.dataTransfer.files?.[0];
                if (droppedFile) handleFileChange(droppedFile);
              }}
              className={`mt-5 rounded-2xl border-2 border-dashed p-8 flex flex-col items-center justify-center text-center transition
                ${dragging
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 bg-gray-50"
                }`}
            >
              <FiUploadCloud className="text-4xl text-blue-600" />

              <p className="mt-3 font-semibold text-gray-900">
                Drag & drop your resume here
              </p>
              <p className="text-sm text-gray-600 mt-1">
                or click to browse from your computer
              </p>

              <button
                onClick={() => fileInputRef.current.click()}
                className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-500 active:scale-95 transition cursor-pointer"
              >
                Browse File
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
            </div>

            {/* Selected File Preview */}
            {file && (
              <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  onClick={() => setFile(null)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                >
                  <MdOutlineDeleteOutline className="text-2xl text-gray-600" />
                </button>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-500 active:scale-95 transition disabled:opacity-50"
              >
                {loading ? "Uploading..." : "Upload Resume"}
              </button>

              <button
                onClick={() => {
                  setFile(null);
                  setMessage("");
                  setError("");
                }}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition"
              >
                Reset
              </button>
            </div>

            {/* Messages */}
            {message && (
              <p className="text-green-700 mt-4 font-medium">{message}</p>
            )}
            {error && <p className="text-red-600 mt-4 font-medium">{error}</p>}
          </div>

          {/* Tips Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900">Tips</h3>
            <ul className="mt-4 text-sm text-gray-600 space-y-2">
              <li>• Upload latest updated resume</li>
              <li>• Use clean PDF (not scanned images)</li>
              <li>• Mention skills clearly (React, Node, MongoDB)</li>
              <li>• Add your projects and internships</li>
            </ul>

            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <p className="text-sm text-blue-800 font-medium">
                Resume will be used to calculate your match score with jobs.
              </p>
            </div>
          </div>
        </div>

        {/* Uploaded Resume */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">
            Uploaded Resumes
          </h2>

          <div className="mt-4 space-y-3">
            {resumes.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-gray-600">
                No resume uploaded yet.
              </div>
            ) : (
              resumes.map((r) => (
                <div
                  key={r.id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {r.originalName}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Uploaded: {new Date(r.uploadedAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={r.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      View Resume
                    </Link>

                    <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      PDF
                    </span>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddCv;

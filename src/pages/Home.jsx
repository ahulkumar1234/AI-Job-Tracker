import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { BsSuitcaseLg } from "react-icons/bs";
import { FaBuilding } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import JobCard from "../components/JobCard";
import FiltersSidebar from "../components/FiltersSidebar";
import FloatingAssistant from "../components/FloatingAssistant";
import FadeLoader from "react-spinners/FadeLoader";

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);

    // ✅ APPLIED FILTERS (real filters used in API)
    const [filters, setFilters] = useState({
        what: "",
        where: "",
        skills: [],
        datePosted: "anytime",
        jobType: "all",
        workMode: "all",
    });

    // ✅ DRAFT FILTERS (typing wala)
    const [filtersDraft, setFiltersDraft] = useState({
        what: "",
        where: "",
    });

    const advertisement = [
        {
            id: 1,
            num: "1,75,324",
            text: "Live Job",
            img: <BsSuitcaseLg className="text-2xl text-blue-600" />,
        },
        {
            id: 2,
            num: "97,354",
            text: "Companies",
            img: <FaBuilding className="text-2xl text-blue-600" />,
        },
        {
            id: 3,
            num: "38,47,154",
            text: "Candidates",
            img: <CiUser className="text-2xl text-blue-600" />,
        },
        {
            id: 4,
            num: "7,532",
            text: "New Jobs",
            img: <BsSuitcaseLg className="text-2xl text-blue-600" />,
        },
    ];

    // Fetch Jobs
    const fetchJobs = async (customPage = page, customFilters = filters) => {
        try {
            setLoading(true);
            setError("");

            const skillsParam = customFilters.skills.join(",");

            const url = `https://job-tracker-server-ln8r.onrender.com/api/v1/jobs?what=${encodeURIComponent(
                customFilters.what || "developer"
            )}&where=${encodeURIComponent(
                customFilters.where || "india"
            )}&page=${customPage}&skills=${encodeURIComponent(
                skillsParam
            )}&datePosted=${customFilters.datePosted}&jobType=${customFilters.jobType
                }&workMode=${customFilters.workMode}`;

            const res = await fetch(url);
            const data = await res.json();

            if (!data.success) {
                setError(data.message || "Failed to fetch jobs");
                return;
            }

            setJobs(data.jobs || []);
        } catch (err) {
            setError("Server not responding!");
        } finally {
            setLoading(false);
        }
    };

    // ✅ AUTO FETCH whenever filters change (Hero + Sidebar + AI) 
    useEffect(() => {
        setPage(1);
        fetchJobs(1);
    }, []);

    // ✅ First load 
    useEffect(() => {
        fetchJobs(1, filters);
    }, []);

    // HERO SEARCH 
    const handleSearch = () => {
        const updatedFilters = {
            ...filters,
            what: filtersDraft.what,
            where: filtersDraft.where,
        };

        setFilters(updatedFilters);   // applied filters update
        setPage(1);
        fetchJobs(1, updatedFilters); // same time correct filters se fetch
    };


    const handleNext = () => {
        const next = page + 1;
        setPage(next); fetchJobs(next);
    };

    const handlePrev = () => {
        if (page === 1)
            return; const prev = page - 1;
        setPage(prev); fetchJobs(prev);
    };

    return (
        <>
            {/* AI floating assistant */}
            <FloatingAssistant setFilters={setFilters} fetchJobs={fetchJobs} />

            {/* HERO */}
            <div className="bg-gray-100 rounded-xl px-6 md:px-10 py-12 md:py-16 md:px-25">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="left-section w-full">
                        <h1 className="text-5xl text-center lg:text-start md:text-6xl tracking-tight font-bold mb-4">
                            Find a job that suits your interest & skills.
                        </h1>

                        <p className="text-base md:text-lg text-center lg:text-start tracking-wide text-gray-600 mb-6 max-w-2xl">
                            Your ultimate job tracking companion. Stay organized, track your
                            applications, and land your dream job with ease.
                        </p>

                        {/* Search */}
                        <div className="flex justify-center lg:justify-start flex-col sm:flex-row gap-3 w-full max-w-3xl">
                            <div className="relative">
                                <input
                                    value={filtersDraft.what}
                                    onChange={(e) =>
                                        setFiltersDraft({ ...filtersDraft, what: e.target.value })
                                    }
                                    type="text"
                                    placeholder="Job title, Keywords..."
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                                />
                                <CiSearch className="absolute right-3 top-4 text-gray-500 text-xl" />
                            </div>

                            <div className="relative sm:max-w-[220px]">
                                <input
                                    value={filtersDraft.where}
                                    onChange={(e) =>
                                        setFiltersDraft({ ...filtersDraft, where: e.target.value })
                                    }
                                    type="text"
                                    placeholder="Location"
                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                                />
                                <CiLocationOn className="absolute right-3 top-4 text-gray-500 text-xl" />
                            </div>

                            <button
                                onClick={handleSearch}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 cursor-pointer active:scale-95 transition-all duration-150 ease-in-out"
                            >
                                Find Jobs
                            </button>
                        </div>
                    </div>

                    <div className="right-section hidden lg:block w-full max-w-md">
                        <img src="/Illustration.png" alt="Job Search" className="w-full h-auto" />
                    </div>
                </div>

                {/* HERO CARDS */}
                <div className="mt-12 flex flex-col items-center justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
                        {advertisement.map((add) => (
                            <div
                                key={add.id}
                                className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4"
                            >
                                <div className="icon">{add.img}</div>
                                <div>
                                    <h2 className="text-2xl font-bold">{add.num}</h2>
                                    <p className="text-gray-600">{add.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* JOBS LIST + FILTERS */}
            <div className="max-w-7xl mx-auto mt-10 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */} <div className="lg:col-span-1">
                        <FiltersSidebar
                            filters={filters}
                            setFilters={setFilters}
                            onApplyFilters={() => {
                                setPage(1);
                                fetchJobs(1);
                            }}
                            onClearFilters={() => {
                                setFilters({
                                    what: "developer", where: "india", skills: [],
                                    datePosted: "anytime", jobType: "all", workMode: "all",
                                });
                                setPage(1);
                                setTimeout(() => fetchJobs(1), 0);
                            }}
                        />
                    </div>

                    {/* Jobs */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                Latest Jobs (Page {page})
                            </h2>

                            <div className="flex gap-2">
                                <button
                                    onClick={handlePrev}
                                    disabled={page === 1}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition
                    ${page === 1
                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            : "bg-white border border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    ← Prev
                                </button>

                                <button
                                    onClick={handleNext}
                                    className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition"
                                >
                                    Next →
                                </button>
                            </div>
                        </div>

                        {loading && <div className="text-gray-600 flex justify-center items-center w-full h-screen"><FadeLoader color="gray" /></div>}
                        {error && <p className="text-red-600 font-medium">{error}</p>}

                        {!loading && !error && (
                            <div className="flex flex-col gap-5">
                                {jobs.length === 0 ? (
                                    <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            No jobs found
                                        </h2>
                                        <p className="text-gray-600 mt-2">Try different filters.</p>
                                    </div>
                                ) : (
                                    jobs.map((job) => <JobCard key={job.id} job={job} />)
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;

import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { RiRobot2Fill } from "react-icons/ri";

const FloatingAssistant = ({ setFilters, fetchJobs }) => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            text: "Hi 👋 Tell me what jobs you want. Example: 'Remote React jobs in Kolkata'",
        },
    ]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input.trim();

        // show user message
        setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
        setInput("");

        try {
            setLoading(true);

            const res = await fetch("http://localhost:8000/api/v1/assistant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg }),
            });

            const data = await res.json();

            if (!data.success) {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", text: "❌ Sorry, I couldn’t understand that." },
                ]);
                return;
            }

            const aiFilters = data.filters;

            // ✅ clear
            if (aiFilters.clear) {
                setFilters({
                    what: "",
                    where: "",
                    skills: [],
                    datePosted: "anytime",
                    jobType: "all",
                    workMode: "all",
                });
            } else {
                setFilters((prev) => ({
                    ...prev,
                    ...aiFilters,
                    skills: Array.isArray(aiFilters.skills) ? aiFilters.skills : prev.skills,
                }));
            }

            // reset to page 1
            fetchJobs(1);

            toast.success("Filters updated");

            //show assistant reply
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: data.reply || "✅ Filters applied." },
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: "⚠️ Server not responding!" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500 transition z-50 cursor-pointer"
            >
                {open ? <IoMdClose size={22} /> : <RiRobot2Fill size={22} />}
            </button>

            {/* Chat Box */}
            {open && (
                <div className="fixed bottom-20 right-6 w-[340px] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50">
                    {/* Header */}
                    <div className="bg-gray-900 text-white px-4 py-3 font-semibold">
                        AI Job Assistant
                    </div>

                    {/* Messages */}
                    <div className="h-[300px] overflow-y-auto p-3 space-y-3">
                        {messages.map((m, idx) => (
                            <div
                                key={idx}
                                className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${m.role === "user"
                                        ? "ml-auto bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                {m.text}
                            </div>
                        ))}

                        {/* ✅ Loader bubble */}
                        {loading && (
                            <span className="max-w-auto px-3 py-2 rounded-xl text-xs bg-gray-100 text-gray-600">
                                🤖 Finding....
                            </span>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-gray-200 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type: remote React jobs..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        />

                        <button
                            onClick={handleSend}
                            disabled={loading}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${loading
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-500"
                                }`}
                        >
                            {loading ? "..." : "Send"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default FloatingAssistant;

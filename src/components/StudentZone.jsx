import { useEffect, useState } from "react";

const TABS = [
  { key: "internship", label: "Internship Opportunities", icon: "💼", desc: "Explore the latest internship openings and industry opportunities." },
  { key: "drives",     label: "Placement Drives",         icon: "🏢", desc: "Stay updated with upcoming company visits and placement drives." },
  { key: "material",   label: "Announcements & Notices",   icon: "📢", desc: "Important announcements, notices, and updates from the Placement Cell." },
];

export default function StudentZone({ isAdmin, activeTab, setActiveTab }) {

  const [updates, setUpdates]           = useState([]);
  const [showForm, setShowForm]         = useState(false);
  const [formCategory, setFormCategory] = useState("internship");
  const [formHeading, setFormHeading]   = useState("");
  const [formDetail, setFormDetail]     = useState("");
  const [formLink, setFormLink]         = useState("");
  const [hasLink, setHasLink]           = useState(false);

  /* ── load updates ── */
  useEffect(() => {
    const load = () => {
      const stored = JSON.parse(localStorage.getItem("updates")) || [];
      setUpdates(stored);
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  /* ── filtered updates for active tab ── */
  const filteredUpdates = updates.filter(u => u.type === activeTab);

  /* ── add update ── */
  const handleAdd = () => {
    if (!formHeading.trim()) return;
    const stored = JSON.parse(localStorage.getItem("updates")) || [];
    stored.push({
      type:   formCategory,
      title:  formHeading,
      detail: formDetail,
      link:   hasLink ? formLink.trim() : "",
      date:   new Date().toLocaleDateString(),
    });
    localStorage.setItem("updates", JSON.stringify(stored));
    setUpdates(stored);
    setFormHeading("");
    setFormDetail("");
    setFormLink("");
    setHasLink(false);
    setShowForm(false);
  };

  /* ── delete update ── */
  const handleDelete = (globalIndex) => {
    const stored = JSON.parse(localStorage.getItem("updates")) || [];
    stored.splice(globalIndex, 1);
    localStorage.setItem("updates", JSON.stringify(stored));
    setUpdates([...stored]);
  };

  const activeTabInfo = TABS.find(t => t.key === activeTab);

  return (
    <div className="bg-gray-100 min-h-screen p-6 space-y-6">

      {/* ── HEADER ── */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-900 mb-3">Student Zone</h2>
        <p className="text-gray-600 leading-relaxed">
          Welcome to the Student Zone. Here students can access placement
          resources, company updates, internship opportunities, placement
          drives, and career guidance provided by the Placement Cell.
        </p>
      </div>

      {/* ── LATEST UPDATES with TABS ── */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* card title row */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-blue-900">Latest Updates</h2>
          {isAdmin && (
            <button
              onClick={() => setShowForm(v => !v)}
              className="bg-blue-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-xl hover:bg-blue-700 transition shadow"
            >
              {showForm ? "✕" : "+"}
            </button>
          )}
        </div>

        {/* ── ADMIN ADD FORM ── */}
        {showForm && (
          <div className="mx-6 mt-4 mb-2 bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-3">

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">Category</p>
              <div className="flex gap-2 flex-wrap">
                {TABS.map(t => (
                  <button
                    key={t.key}
                    onClick={() => setFormCategory(t.key)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all
                      ${formCategory === t.key
                        ? "bg-blue-900 text-white border-blue-900"
                        : "bg-white text-blue-900 border-blue-200 hover:border-blue-900"}`}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Heading</label>
              <input
                type="text"
                value={formHeading}
                onChange={e => setFormHeading(e.target.value)}
                placeholder="e.g. Amazon SDE Internship 2025"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Details</label>
              <textarea
                value={formDetail}
                onChange={e => setFormDetail(e.target.value)}
                placeholder="Describe the opportunity, eligibility, deadline, etc."
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-700 font-medium">
              <input
                type="checkbox"
                checked={hasLink}
                onChange={e => setHasLink(e.target.checked)}
                className="w-4 h-4 accent-blue-900"
              />
              Add a registration / link
            </label>

            {hasLink && (
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Link URL</label>
                <input
                  type="text"
                  value={formLink}
                  onChange={e => setFormLink(e.target.value)}
                  placeholder="e.g. https://forms.google.com/..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <button
              onClick={handleAdd}
              className="bg-blue-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition w-full"
            >
              Save
            </button>
          </div>
        )}

        {/* ── TAB BUTTONS ── */}
        <div className="flex gap-2 px-6 pt-4 pb-0 flex-wrap">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-t-xl text-sm font-semibold border-2 border-b-0 transition-all duration-200
                ${activeTab === t.key
                  ? "bg-blue-900 text-white border-blue-900"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-900"}`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* ── TAB CONTENT ── */}
        <div className="border-t-2 border-blue-900 mx-0 px-6 py-5">

          <div className="mb-5">
            <h3 className="text-lg font-bold text-blue-900">{activeTabInfo.icon} {activeTabInfo.label}</h3>
            <p className="text-gray-500 text-sm mt-1">{activeTabInfo.desc}</p>
          </div>

          {filteredUpdates.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-sm">No {activeTabInfo.label.toLowerCase()} posted yet.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {filteredUpdates.map((item, i) => {
                /* resolve the real index in the full updates array for deletion */
                const globalIndex = updates.indexOf(item);

                return (
                  <div
                    key={i}
                    className="relative bg-gray-50 border-l-4 border-blue-900 p-4 pr-8 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    {/* ── RED DELETE CROSS (admin only) ── */}
                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(globalIndex)}
                        title="Remove update"
                        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-red-500 hover:bg-red-700 text-white text-[10px] font-bold flex items-center justify-center transition opacity-70 hover:opacity-100"
                      >
                        ✕
                      </button>
                    )}

                    <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>

                    {item.link && item.link.trim() !== "" && (
                      <a
                        href={item.link.startsWith("http") ? item.link : `https://${item.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-900 px-3 py-1 rounded-full transition"
                      >
                        🔗 Register / Open Link ↗
                      </a>
                    )}

                    {item.detail && (
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed whitespace-pre-wrap">{item.detail}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── RESUME CHECKER ── */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl shadow-xl p-10 text-white">
        <h2 className="text-4xl font-bold mb-3">Resume Checker</h2>
        <p className="text-lg text-blue-100 mb-8">
          Is your resume good enough? Improve your chances before you apply.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-[65%]">
            <h3 className="text-2xl font-semibold mb-4">AI Powered ATS Resume Analyzer</h3>
            <p className="leading-relaxed text-blue-100">
              Upload your resume and get an ATS compatibility score, resume improvement
              suggestions, keyword optimization tips, and company-specific guidance
              powered by Artificial Intelligence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">✅ ATS Score Analysis</div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">✅ Resume Improvement Tips</div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">✅ Company Specific Suggestions</div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">✅ Skill & Keyword Matching</div>
            </div>
          </div>
          <div className="md:w-[35%] flex justify-center">
            <div className="bg-white text-center text-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">Upload Resume</h3>
              <p className="text-gray-600 mb-6">
                Upload your resume in PDF or DOCX format and get instant AI-powered analysis.
              </p>
              <button className="bg-blue-900 hover:bg-blue-700 transition text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                Analyze Resume
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
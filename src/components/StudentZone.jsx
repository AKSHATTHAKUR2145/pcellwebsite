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

  // ATS Analyzer States
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const roles = [
    "MERN Stack Developer",
    "Java Developer",
    "Frontend Developer",
    "Data Scientist / Analyst",
    "Software Development Engineer (SDE)",
    "DevOps Engineer",
    "Android/App Developer",
    "Cyber Security Analyst"
  ];

  useEffect(() => {
    const load = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("updates"));
        setUpdates(Array.isArray(stored) ? stored : []);
      } catch (e) {
        setUpdates([]);
      }
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const currentTab = activeTab || "internship";
  const filteredUpdates = updates.filter(u => u.type === currentTab);

  const handleAdd = () => {
    if (!formHeading.trim()) return;
    const stored = [...updates];
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

  const handleDelete = (globalIndex) => {
    const stored = [...updates];
    stored.splice(globalIndex, 1);
    localStorage.setItem("updates", JSON.stringify(stored));
    setUpdates(stored);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file || !role) {
      alert("Please select a role and upload a resume.");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("role", role);

    try {
      const response = await fetch("http://localhost:5000/api/ats/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("API error", error);
      alert("Backend server error! Make sure Node server is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const activeTabInfo = TABS.find(t => t.key === currentTab) || TABS[0] || {};

  return (
    <div className="bg-gray-100 min-h-screen p-6 space-y-6">

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-900 mb-3">Student Zone</h2>
        <p className="text-gray-600 leading-relaxed">
          Welcome to the Student Zone. Here students can access placement
          resources, company updates, internship opportunities, placement
          drives, and career guidance provided by the Placement Cell.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-blue-900">Latest Updates</h2>
          {isAdmin && (
            <button onClick={() => setShowForm(v => !v)} className="bg-blue-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-xl hover:bg-blue-700 transition shadow">
              {showForm ? "✕" : "+"}
            </button>
          )}
        </div>

        {showForm && (
          <div className="mx-6 mt-4 mb-2 bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">Category</p>
              <div className="flex gap-2 flex-wrap">
                {TABS.map(t => (
                  <button key={t.key} onClick={() => setFormCategory(t.key)} className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${formCategory === t.key ? "bg-blue-900 text-white border-blue-900" : "bg-white text-blue-900 border-blue-200 hover:border-blue-900"}`}>
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Heading</label>
              <input type="text" value={formHeading} onChange={e => setFormHeading(e.target.value)} placeholder="e.g. Amazon SDE Internship 2025" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">Details</label>
              <textarea value={formDetail} onChange={e => setFormDetail(e.target.value)} placeholder="Describe the opportunity, eligibility, deadline, etc." rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-700 font-medium">
              <input type="checkbox" checked={hasLink} onChange={e => setHasLink(e.target.checked)} className="w-4 h-4 accent-blue-900" />
              Add a registration / link
            </label>
            {hasLink && (
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">Link URL</label>
                <input type="text" value={formLink} onChange={e => setFormLink(e.target.value)} placeholder="e.g. https://forms.google.com/..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            )}
            <button onClick={handleAdd} className="bg-blue-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition w-full">Save</button>
          </div>
        )}

        <div className="flex gap-2 px-6 pt-4 pb-0 flex-wrap">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab && setActiveTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-t-xl text-sm font-semibold border-2 border-b-0 transition-all duration-200 ${currentTab === t.key ? "bg-blue-900 text-white border-blue-900" : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-900"}`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="border-t-2 border-blue-900 mx-0 px-6 py-5">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-blue-900">{activeTabInfo?.icon} {activeTabInfo?.label}</h3>
            <p className="text-gray-500 text-sm mt-1">{activeTabInfo?.desc}</p>
          </div>

          {filteredUpdates.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p className="text-3xl mb-2">📭</p>
              <p className="text-sm">No {activeTabInfo?.label ? activeTabInfo.label.toLowerCase() : "updates"} posted yet.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {filteredUpdates.map((item, i) => {
                const globalIndex = updates.indexOf(item);
                return (
                  <div key={i} className="relative bg-gray-50 border-l-4 border-blue-900 p-4 pr-8 rounded-lg shadow-sm hover:shadow-md transition">
                    {isAdmin && (
                      <button onClick={() => handleDelete(globalIndex)} title="Remove update" className="absolute top-2 right-2 w-5 h-5 rounded-full bg-red-500 hover:bg-red-700 text-white text-[10px] font-bold flex items-center justify-center transition opacity-70 hover:opacity-100">✕</button>
                    )}
                    <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
                    {item.link && item.link.trim() !== "" && (
                      <a href={item.link.startsWith("http") ? item.link : `https://${item.link}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-900 px-3 py-1 rounded-full transition">🔗 Register / Open Link ↗</a>
                    )}
                    {item.detail && <p className="text-xs text-gray-600 mt-2 leading-relaxed whitespace-pre-wrap">{item.detail}</p>}
                    <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl shadow-xl p-10 text-white">
        <h2 className="text-4xl font-bold mb-3">Resume Checker</h2>
        <p className="text-lg text-blue-100 mb-8">
          Is your resume good enough? Improve your chances before you apply.
        </p>
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          
          <div className="md:w-[45%]">
            <h3 className="text-2xl font-semibold mb-4">AI Powered ATS Resume Analyzer</h3>
            <p className="leading-relaxed text-blue-100">
              Select your target role, upload your resume (PDF), and get an instant ATS compatibility score based on strict industry skill requirements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">✅ ATS Score Analysis</div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">✅ Instant Match Percentage</div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">✅ Missing Skill Detection</div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">✅ Role-Specific Checking</div>
            </div>
          </div>

          <div className="md:w-[55%] w-full flex justify-center">
            <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl w-full">
              
              {!result ? (
                <form onSubmit={handleAnalyze} className="flex flex-col space-y-5">
                  <div className="text-center">
                    <div className="text-5xl mb-3">📄</div>
                    <h3 className="text-2xl font-bold text-blue-900">Upload & Analyze</h3>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 block mb-1">1. Select Target Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-900 text-sm" required>
                      <option value="" disabled>-- Choose a Role --</option>
                      {roles.map((r, i) => (
                        <option key={i} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 block mb-1">2. Upload Resume (.pdf)</label>
                    <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} className="w-full border border-gray-300 p-2 rounded-lg text-sm file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:bg-blue-100 file:text-blue-900 hover:file:bg-blue-200 transition" required />
                  </div>

                  <button type="submit" disabled={loading} className="w-full bg-blue-900 hover:bg-blue-700 transition text-white px-4 py-3 rounded-xl font-bold shadow-md mt-2 disabled:opacity-50 flex justify-center items-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Analyzing Profile...
                      </>
                    ) : "Generate ATS Score"}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col w-full">
                  
                  {/* Result Header */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-900">Analysis Complete</h3>
                      <p className="text-sm font-medium text-gray-500 mt-1">{result.role}</p>
                    </div>
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl border-4 shadow-lg shrink-0
                      ${result.score >= 70 ? "bg-green-500 border-green-600" : result.score >= 40 ? "bg-yellow-500 border-yellow-600" : "bg-red-500 border-red-600"}`}>
                      {result.score}%
                    </div>
                  </div>

                  <div className="w-full space-y-6 text-sm">
                    
                    {/* Strengths Section */}
                    <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">💡</span>
                        <h4 className="font-bold text-green-800 text-lg">Strengths & Matches</h4>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {result.strengthsSummary || "Your resume shows a solid foundation in the required domain."}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.matchedSkills && result.matchedSkills.length > 0 ? (
                          result.matchedSkills.map((skill, i) => (
                            <span key={i} className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold capitalize border border-green-200 shadow-sm">
                              ✓ {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-500 italic">No core skills matched.</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Improvements Section */}
                    <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">📈</span>
                        <h4 className="font-bold text-red-800 text-lg">Areas for Improvement</h4>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {result.improvementsSummary || "Consider adding the following skills and technologies to improve your ATS compatibility for this role."}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.missingSkills && result.missingSkills.length > 0 ? (
                          result.missingSkills.map((skill, i) => (
                            <span key={i} className="bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-xs font-bold capitalize border border-red-200 shadow-sm">
                              ✕ {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-500 italic">You have all the required core skills!</span>
                        )}
                      </div>
                    </div>

                  </div>

                  <button onClick={() => { setResult(null); setFile(null); }} className="mt-8 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-bold transition shadow-sm border border-gray-300">
                    Analyze Another Resume
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

/* ─────────────────────────── CONSTANTS ─────────────────────────── */

const COMPANY_LOGOS = [
  "accenture","arcesium","capgemini","Ccube logo","cleartrail",
  "deloitte","download","infobeans","infosys","intellicus",
  "mindruby","persistent","quantiphi","reqpedia","syvora",
  "tcs","turing","virtusa","wipro","Worldpay"
];

const CALENDAR_COMPANIES = [
  { name:"TCS",        logo:"/companylogo/tcs.png",        date:3,  students:["Rahul Sharma","Ananya Singh"] },
  { name:"Infosys",    logo:"/companylogo/infosys.png",    date:7,  students:["Priya Patel","Rohan Joshi"] },
  { name:"Accenture",  logo:"/companylogo/accenture.png",  date:13, students:["Neha Gupta","Amit Kumar","Sakshi Verma"] },
  { name:"Capgemini",  logo:"/companylogo/capgemini.png",  date:17, students:["Siddharth Mehta","Megha Tiwari"] },
  { name:"Deloitte",   logo:"/companylogo/deloitte.png",   date:22, students:["Arjun Patel","Riya Sharma","Vivek Nair"] },
  { name:"Persistent", logo:"/companylogo/persistent.png", date:26, students:["Karan Mishra","Pooja Yadav"] },
  { name:"Wipro",      logo:"/companylogo/wipro.png",      date:29, students:["Tanvi Desai","Mohit Agarwal","Shruti Jain"] },
];

const DETAIL_COMPANIES = [
  { name:"TCS",        logo:"/companylogo/tcs.png",        role:"Developer",          avg:"7 LPA",  students:["Rahul Sharma","Ananya Singh","Deepak Roy"] },
  { name:"Infosys",    logo:"/companylogo/infosys.png",    role:"System Engineer",    avg:"6 LPA",  students:["Priya Patel","Rohan Joshi"] },
  { name:"Accenture",  logo:"/companylogo/accenture.png",  role:"Analyst",            avg:"8 LPA",  students:["Neha Gupta","Amit Kumar","Sakshi Verma","Raj Shukla"] },
  { name:"Capgemini",  logo:"/companylogo/capgemini.png",  role:"Software Engineer",  avg:"6.5 LPA",students:["Siddharth Mehta","Megha Tiwari"] },
  { name:"Deloitte",   logo:"/companylogo/deloitte.png",   role:"Consultant",         avg:"10 LPA", students:["Arjun Patel","Riya Sharma","Vivek Nair"] },
  { name:"Persistent", logo:"/companylogo/persistent.png", role:"Tech Lead",          avg:"15 LPA", students:["Karan Mishra","Pooja Yadav","Ishaan Tomar"] },
  { name:"Wipro",      logo:"/companylogo/wipro.png",      role:"Associate",          avg:"5.5 LPA",students:["Tanvi Desai","Mohit Agarwal"] },
  { name:"Arcesium",   logo:"/companylogo/arcesium.png",   role:"SDE",                avg:"18 LPA", students:["Aditya Verma","Sneha Nair","Kunal Shah"] },
  { name:"Quantiphi",  logo:"/companylogo/quantiphi.png",  role:"Data Scientist",     avg:"12 LPA", students:["Anshul Bajpai","Divya Sharma"] },
  { name:"InfoBeans",  logo:"/companylogo/infobeans.png",  role:"Full Stack Dev",     avg:"9 LPA",  students:["Ritu Pandey","Aman Gupta","Harshit Jain"] },
  { name:"Intellicus",  logo:"/companylogo/intellicus.png", role:"BI Developer",      avg:"8.5 LPA",students:["Simran Kaur","Nikhil Dubey"] },
  { name:"Virtusa",    logo:"/companylogo/virtusa.png",    role:"Software Engineer",  avg:"7.5 LPA",students:["Prateek Rao","Mansi Trivedi","Yash Aggarwal"] },
];

const HIGH_FLYERS_INIT = [
  { name:"Sahil Ali",      company:"Adyen",  package:"1.13 CR", photo:"/HighFlyers/sahil.jpg",   companyLogo:"/companylogo/adyen.png" },
  { name:"Aaditya Bansal", company:"xAI",    package:"76 LPA",  photo:"/HighFlyers/aditya.jpg",  companyLogo:"/companylogo/xAI.png" },
  { name:"Kashish Ahuja",  company:"Google", package:"56 LPA",  photo:"/HighFlyers/kashish.jpg", companyLogo:"/companylogo/google.png" },
];

/* ─────────────────────── PIE DATA ─────────────────────── */
const BATCH_DATA = {
  "2025-26": {
    label:"Batch 2025-26",
    color:"#1e3a8a",
    accent:"#3b82f6",
    programData:[ {name:"MTech",value:35}, {name:"MCA",value:28} ],
    genderData:[ {name:"Male",value:31}, {name:"Female",value:23} ],
    stats:{
      mtech:35, mca:28, ratio:"1.25 : 1",
      maleMCA:16, femaleMCA:12,
      maleMTech:20, femaleMTech:15,
      totalMale:31, totalFemale:23, genderRatio:"1.33 : 1",
      mcaAvg:"8.14 LPA", mtechAvg:"7.91 LPA", combinedAvg:"8.35 LPA",
      totalPlaced:63,
    }
  },
  "2024-25": {
    label:"Batch 2024-25",
    color:"#065f46",
    accent:"#10b981",
    programData:[ {name:"MTech",value:32}, {name:"MCA",value:38} ],
    genderData:[ {name:"Male",value:24}, {name:"Female",value:24} ],
    stats:{
      mtech:32, mca:38, ratio:"0.85 : 1",
      maleMCA:19, femaleMCA:19,
      maleMTech:17, femaleMTech:15,
      totalMale:24, totalFemale:24, genderRatio:"1 : 1 (Perfect)",
      mcaAvg:"7.82 LPA", mtechAvg:"8.23 LPA", combinedAvg:"8.02 LPA",
      totalPlaced:70,
    }
  }
};

/* ─────────────────────── CUSTOM PIE LABEL ─────────────────────── */
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
      {`${name}\n${(percent*100).toFixed(0)}%`}
    </text>
  );
};

/* ─────────────────────── STAT CARD ─────────────────────── */
function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow border-l-4 border-blue-900">
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-xl font-extrabold text-blue-900">{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */
export default function Placement({ isAdmin }) {

  /* ── state ── */
  const [selectedBatch, setSelectedBatch]   = useState("2025-26");
  const [detailStart, setDetailStart]       = useState(0);
  const [calMonth, setCalMonth]             = useState(new Date());
  const [highlight, setHighlight]           = useState(null);
  const [highFlyers, setHighFlyers]         = useState(HIGH_FLYERS_INIT);
  const [calEvents, setCalEvents]           = useState(CALENDAR_COMPANIES);
  const [showCalForm, setShowCalForm]       = useState(null); // date number
  const [showHFForm, setShowHFForm]         = useState(false);
  const [showCompForm, setShowCompForm]     = useState(false);
  const [detailComps, setDetailComps]       = useState(DETAIL_COMPANIES);

  /* batch form */
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [batchForm, setBatchForm] = useState({
    key:"", label:"", mtech:"", mca:"",
    maleMTech:"", femaleMTech:"", maleMCA:"", femaleMCA:"",
    mcaAvg:"", mtechAvg:"", combinedAvg:"", totalPlaced:""
  });
  const [batchData, setBatchData] = useState(BATCH_DATA);

  /* cal form */
  const [calForm, setCalForm] = useState({ logo:"", name:"", count:"", students:"", role:"", avg:"" });
  /* hf form */
  const [hfForm, setHfForm]   = useState({ name:"", company:"", package:"", photo:"", companyLogo:"" });
  /* comp form */
  const [compForm, setCompForm] = useState({ logo:"", name:"", role:"", avg:"", students:"" });

  const batch = batchData[selectedBatch];
  const PIE_COLORS_PROG   = ["#1e3a8a","#60a5fa"];
  const PIE_COLORS_GENDER = ["#1d4ed8","#ec4899"];

  /* ── save new batch ── */
  const handleAddBatch = () => {
    if (!batchForm.key || !batchForm.label) return;
    const mt = parseInt(batchForm.mtech)||0, mc = parseInt(batchForm.mca)||0;
    const mMT=parseInt(batchForm.maleMTech)||0, fMT=parseInt(batchForm.femaleMTech)||0;
    const mMC=parseInt(batchForm.maleMCA)||0,  fMC=parseInt(batchForm.femaleMCA)||0;
    const newBatch = {
      label: batchForm.label,
      color:"#1e3a8a", accent:"#3b82f6",
      programData:[ {name:"MTech",value:mt}, {name:"MCA",value:mc} ],
      genderData:[ {name:"Male",value:mMT+mMC}, {name:"Female",value:fMT+fMC} ],
      stats:{
        mtech:mt, mca:mc,
        ratio: mc ? `${(mt/mc).toFixed(2)} : 1` : "N/A",
        maleMTech:mMT, femaleMTech:fMT, maleMCA:mMC, femaleMCA:fMC,
        totalMale:mMT+mMC, totalFemale:fMT+fMC,
        genderRatio: (fMT+fMC) ? `${((mMT+mMC)/(fMT+fMC)).toFixed(2)} : 1` : "N/A",
        mcaAvg: batchForm.mcaAvg, mtechAvg: batchForm.mtechAvg,
        combinedAvg: batchForm.combinedAvg,
        totalPlaced: parseInt(batchForm.totalPlaced)||0,
      }
    };
    setBatchData(prev => ({ ...prev, [batchForm.key]: newBatch }));
    setSelectedBatch(batchForm.key);
    setBatchForm({ key:"", label:"", mtech:"", mca:"", maleMTech:"", femaleMTech:"", maleMCA:"", femaleMCA:"", mcaAvg:"", mtechAvg:"", combinedAvg:"", totalPlaced:"" });
    setShowBatchForm(false);
  };

  /* ── calendar helpers ── */
  const month      = calMonth.getMonth();
  const year       = calMonth.getFullYear();
  const months     = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth= new Date(year, month+1, 0).getDate();

  const calEventMap = {};
  calEvents.forEach(e => { calEventMap[e.date] = e; });

  /* ── add calendar event → also adds to placement drive details ── */
  const handleAddCalEvent = () => {
    if (!calForm.name || !showCalForm) return;
    const logo = calForm.logo || `/companylogo/${calForm.name.toLowerCase()}.png`;
    const students = calForm.students.split(",").map(s => s.trim()).filter(Boolean);
    const newEvent = { name: calForm.name, logo, date: showCalForm, students };
    setCalEvents(prev => {
      const filtered = prev.filter(e => e.date !== showCalForm);
      return [...filtered, newEvent];
    });
    // also push into placement drive details if not already present
    setDetailComps(prev => {
      const exists = prev.find(c => c.name.toLowerCase() === calForm.name.toLowerCase());
      if (exists) return prev;
      return [...prev, {
        name: calForm.name, logo,
        role: calForm.role || "—",
        avg:  calForm.avg  || "—",
        students,
      }];
    });
    setCalForm({ logo:"", name:"", count:"", students:"", role:"", avg:"" });
    setShowCalForm(null);
  };

  /* ── add high flyer ── */
  const handleAddHF = () => {
    if (!hfForm.name || !hfForm.company) return;
    setHighFlyers(prev => [...prev, { ...hfForm }]);
    setHfForm({ name:"", company:"", package:"", photo:"", companyLogo:"" });
    setShowHFForm(false);
  };

  /* ── add company detail ── */
  const handleAddComp = () => {
    if (!compForm.name) return;
    const newComp = {
      name: compForm.name,
      logo: compForm.logo || `/companylogo/${compForm.name.toLowerCase()}.png`,
      role: compForm.role,
      avg:  compForm.avg,
      students: compForm.students.split(",").map(s => s.trim()).filter(Boolean),
    };
    setDetailComps(prev => [...prev, newComp]);
    setCompForm({ logo:"", name:"", role:"", avg:"", students:"" });
    setShowCompForm(false);
  };

  /* ── marquee logos doubled for seamless loop ── */
  const marqueeLogos = [...COMPANY_LOGOS, ...COMPANY_LOGOS];

  /* ── calendar cells ── */
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const day = i - firstDay + 1;
    if (day > 0 && day <= daysInMonth) {
      const ev = calEventMap[day];
      const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
      cells.push(
        <div key={i} className={`relative min-h-[80px] border-2 rounded-lg flex flex-col items-center justify-start p-1.5 transition-all duration-200 group/cell
          ${isToday
            ? "bg-blue-50 border-blue-400 ring-2 ring-blue-300"
            : "bg-white border-gray-300 hover:border-gray-800"}`}>
          <span className={`text-[10px] font-extrabold mb-1 self-start w-5 h-5 rounded-full flex items-center justify-center leading-none transition-colors duration-200
            ${isToday
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 group-hover/cell:bg-gray-800 group-hover/cell:text-white"}`}>{day}</span>
          {ev && (
            <button onClick={() => setHighlight(ev.name === highlight ? null : ev.name)}
              className="flex flex-col items-center group w-full">
              <img src={ev.logo} className="h-7 object-contain group-hover:scale-110 transition" alt={ev.name}
                onError={e => { e.target.style.display='none'; }} />
              <span className="text-[9px] text-blue-900 font-semibold mt-0.5 truncate w-full text-center">{ev.name}</span>
            </button>
          )}
          {isAdmin && !ev && (
            <button onClick={() => setShowCalForm(day)}
              className="mt-auto text-gray-300 hover:text-blue-600 text-lg font-bold leading-none transition">+</button>
          )}
          {isAdmin && ev && (
            <button onClick={() => setShowCalForm(day)}
              className="absolute top-1 right-1 w-4 h-4 bg-blue-900 text-white rounded-full text-[9px] flex items-center justify-center hover:bg-blue-600 transition">+</button>
          )}
        </div>
      );
    } else {
      cells.push(<div key={i} className="min-h-[80px] bg-gray-50 border-2 border-gray-100 rounded-lg opacity-40" />);
    }
  }

  /* ── visible company details ── */
  const visibleComps = detailComps.slice(detailStart, detailStart + 3);

  return (
    <div className="bg-gray-50 min-h-screen space-y-16 pb-16">

      {/* ══════════════════ 1. DEMOGRAPHICS ══════════════════ */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-blue-900 rounded-full" />
          <h2 className="text-2xl font-extrabold text-blue-900 tracking-tight">Placement Demographics</h2>
        </div>

        {/* batch toggle + admin add */}
        <div className="flex gap-3 mb-8 flex-wrap items-center">
          {Object.keys(batchData).map(b => (
            <button key={b} onClick={() => setSelectedBatch(b)}
              className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all duration-300
                ${selectedBatch === b
                  ? "bg-blue-900 text-white border-blue-900 shadow-lg scale-105"
                  : "bg-white text-blue-900 border-blue-200 hover:border-blue-900"}`}>
              {batchData[b].label}
            </button>
          ))}
          {isAdmin && (
            <button onClick={() => setShowBatchForm(v => !v)}
              className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all duration-300
                ${showBatchForm
                  ? "bg-blue-900 text-white border-blue-900"
                  : "bg-white text-blue-900 border-blue-200 hover:border-blue-900"}`}>
              {showBatchForm ? "✕ Cancel" : "+ Add Batch"}
            </button>
          )}
        </div>

        {/* batch add form */}
        {isAdmin && showBatchForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-blue-900">
            <h3 className="font-bold text-blue-900 mb-4">New Batch Data</h3>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Batch Key (e.g. 2026-27)"   value={batchForm.key}          onChange={v=>setBatchForm(f=>({...f,key:v}))}          placeholder="2026-27" />
              <Field label="Batch Label"                 value={batchForm.label}        onChange={v=>setBatchForm(f=>({...f,label:v}))}        placeholder="Batch 2026-27" />
              <Field label="MTech Students" type="number" value={batchForm.mtech}       onChange={v=>setBatchForm(f=>({...f,mtech:v}))}        placeholder="35" />
              <Field label="MCA Students"  type="number"  value={batchForm.mca}         onChange={v=>setBatchForm(f=>({...f,mca:v}))}          placeholder="28" />
              <Field label="MTech Male"    type="number"  value={batchForm.maleMTech}   onChange={v=>setBatchForm(f=>({...f,maleMTech:v}))}    placeholder="20" />
              <Field label="MTech Female"  type="number"  value={batchForm.femaleMTech} onChange={v=>setBatchForm(f=>({...f,femaleMTech:v}))}  placeholder="15" />
              <Field label="MCA Male"      type="number"  value={batchForm.maleMCA}     onChange={v=>setBatchForm(f=>({...f,maleMCA:v}))}      placeholder="16" />
              <Field label="MCA Female"    type="number"  value={batchForm.femaleMCA}   onChange={v=>setBatchForm(f=>({...f,femaleMCA:v}))}    placeholder="12" />
              <Field label="MCA Avg Package"    value={batchForm.mcaAvg}      onChange={v=>setBatchForm(f=>({...f,mcaAvg:v}))}      placeholder="8.14 LPA" />
              <Field label="MTech Avg Package"  value={batchForm.mtechAvg}    onChange={v=>setBatchForm(f=>({...f,mtechAvg:v}))}    placeholder="7.91 LPA" />
              <Field label="Combined Avg"       value={batchForm.combinedAvg} onChange={v=>setBatchForm(f=>({...f,combinedAvg:v}))} placeholder="8.35 LPA" />
              <Field label="Total Placed" type="number" value={batchForm.totalPlaced} onChange={v=>setBatchForm(f=>({...f,totalPlaced:v}))} placeholder="63" />
            </div>
            <button onClick={handleAddBatch}
              className="mt-4 bg-blue-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition">
              Save Batch
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: pie charts */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-8">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Program Distribution</p>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={batch.programData} cx="50%" cy="50%" outerRadius={90}
                    dataKey="value" labelLine={false} label={renderLabel}>
                    {batch.programData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS_PROG[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v} students`]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Gender Distribution</p>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={batch.genderData} cx="50%" cy="50%" outerRadius={90}
                    dataKey="value" labelLine={false} label={renderLabel}>
                    {batch.genderData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS_GENDER[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v} students`]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RIGHT: stats */}
          <div className="space-y-4">
            {/* banner */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl p-6 shadow-lg">
              <p className="text-xs uppercase tracking-widest text-blue-200 mb-1">{batch.label}</p>
              <p className="text-5xl font-black">{batch.stats.totalPlaced}</p>
              <p className="text-blue-200 mt-1">Students Placed</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <StatCard label="MTech Students"   value={batch.stats.mtech}    sub={`MTech Male: ${batch.stats.maleMTech} | Female: ${batch.stats.femaleMTech}`} />
              <StatCard label="MCA Students"     value={batch.stats.mca}      sub={`MCA Male: ${batch.stats.maleMCA} | Female: ${batch.stats.femaleMCA}`} />
              <StatCard label="MTech : MCA Ratio" value={batch.stats.ratio} />
              <StatCard label="Gender Ratio (M:F)" value={batch.stats.genderRatio} sub={`${batch.stats.totalMale}M  ${batch.stats.totalFemale}F`} />
              <StatCard label="MCA Avg Package"   value={batch.stats.mcaAvg} />
              <StatCard label="MTech Avg Package" value={batch.stats.mtechAvg} />
            </div>

            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl p-5 shadow-lg flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-100">Combined Average Package</p>
                <p className="text-3xl font-black mt-1">{batch.stats.combinedAvg}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ 2. CALENDAR ══════════════════ */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-blue-900 rounded-full" />
          <h2 className="text-2xl font-extrabold text-blue-900 tracking-tight">Placement Calendar</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* calendar header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-5 flex items-center justify-between px-6">
            <button onClick={() => setCalMonth(new Date(year, month-1, 1))}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition text-lg">‹</button>
            <h3 className="text-xl font-bold tracking-wide">{months[month]} {year}</h3>
            <button onClick={() => setCalMonth(new Date(year, month+1, 1))}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition text-lg">›</button>
          </div>

          {/* day headers */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-600 uppercase py-3 px-4 border-b-2 border-gray-200 tracking-widest bg-gray-50">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d}>{d}</div>)}
          </div>

          {/* cells */}
          <div className="grid grid-cols-7 gap-1 p-3">
            {cells}
          </div>
        </div>

        {/* highlighted company detail */}
        <AnimatePresence>
          {highlight && (() => {
            const ev = calEvents.find(e => e.name === highlight);
            if (!ev) return null;
            return (
              <motion.div key={highlight} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}
                className="mt-6 bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6 border-l-4 border-blue-900">
                <img src={ev.logo} className="h-16 object-contain" alt={ev.name}
                  onError={e=>{e.target.style.display='none'}} />
                <div>
                  <h3 className="text-xl font-bold text-blue-900">{ev.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">Drive date: {months[month]} {ev.date}, {year}</p>
                  <div className="flex flex-wrap gap-2">
                    {ev.students.map((s,i) => (
                      <span key={i} className="bg-blue-50 text-blue-900 text-xs px-3 py-1 rounded-full font-medium">{s}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => setHighlight(null)} className="ml-auto text-gray-300 hover:text-gray-500 text-2xl">✕</button>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* ── COMPANY DETAIL CARDS ── */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-blue-900">Placement Drive Details</h3>
            <div className="flex gap-3 items-center">
              {isAdmin && (
                <button onClick={() => setShowCompForm(true)}
                  className="bg-blue-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-xl hover:bg-blue-700 transition shadow">+</button>
              )}
              <button onClick={() => setDetailStart(Math.max(0, detailStart-3))}
                disabled={detailStart === 0}
                className="w-9 h-9 rounded-full bg-blue-900 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-30 transition">◀</button>
              <span className="text-sm text-gray-500">{Math.floor(detailStart/3)+1} / {Math.ceil(detailComps.length/3)}</span>
              <button onClick={() => setDetailStart(Math.min(detailComps.length-3, detailStart+3))}
                disabled={detailStart+3 >= detailComps.length}
                className="w-9 h-9 rounded-full bg-blue-900 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-30 transition">▶</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {visibleComps.map((c, i) => (
                <motion.div key={c.name+detailStart}
                  initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}}
                  transition={{delay:i*0.07}}
                  className={`bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition
                    ${highlight === c.name ? "ring-2 ring-blue-400" : ""}`}>

                  {/* header band */}
                  <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-4 py-3 flex items-center gap-3">
                    <img src={c.logo} className="h-8 w-16 object-contain bg-white rounded px-1" alt={c.name}
                      onError={e=>{e.target.style.display='none'}} />
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-sm truncate">{c.name}</h4>
                      <p className="text-blue-200 text-xs truncate">{c.role}</p>
                    </div>
                  </div>

                  {/* body */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2">
                      <p className="text-xs text-gray-500 font-medium">Avg Package</p>
                      <p className="text-base font-extrabold text-blue-900">{c.avg}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Students Placed</p>
                      <div className="flex flex-wrap gap-1">
                        {c.students.map((s,j) => (
                          <span key={j} className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ══════════════════ 3. HIGH FLYERS ══════════════════ */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-amber-500 rounded-full" />
            <h2 className="text-2xl font-extrabold text-blue-900 tracking-tight">High Flyers</h2>
          </div>
          {isAdmin && (
            <button onClick={() => setShowHFForm(true)}
              className="bg-blue-900 text-white w-9 h-9 rounded-full flex items-center justify-center text-xl hover:bg-blue-700 transition shadow">+</button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highFlyers.map((h, i) => (
            <motion.div key={i} whileHover={{ y:-4, scale:1.02 }}
              transition={{ duration:0.25 }}
              className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-2xl shadow-lg overflow-hidden flex flex-col">

              {/* top strip: package */}
              <div className="px-5 pt-5 pb-3 border-b border-white/10">
                <p className="text-amber-400 font-black text-2xl tracking-tight">{h.package}</p>
              </div>

              {/* body: text left, logo+photo stacked on right */}
              <div className="flex flex-1 items-center gap-4 px-5 py-4">
                {/* left: name + company */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-white text-lg leading-tight truncate">{h.name}</h3>
                  <p className="text-blue-300 text-sm mt-1">{h.company}</p>
                </div>

                {/* right: company logo above, person photo below */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  {/* company logo */}
                  <div className="bg-white rounded-md px-2 py-0.5 flex items-center justify-center">
                    <img
                      src={h.companyLogo}
                      className="h-5 object-contain"
                      alt={h.company}
                      onError={e => { e.target.parentNode.style.display="none"; }}
                    />
                  </div>
                  {/* person photo */}
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-blue-800 border-2 border-white/30 flex items-center justify-center">
                    <img
                      src={h.photo}
                      alt={h.name}
                      className="w-full h-full object-cover"
                      onError={e => {
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:2.2rem;height:2.2rem">
                          <circle cx="32" cy="24" r="12" fill="#94a3b8"/>
                          <ellipse cx="32" cy="52" rx="20" ry="12" fill="#94a3b8"/>
                        </svg>`;
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════ 4. OUR RECRUITERS (MARQUEE) ══════════════════ */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-blue-900 rounded-full" />
          <h2 className="text-2xl font-extrabold text-blue-900 tracking-tight">Our Recruiters</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg py-6 overflow-hidden relative">
          {/* fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {marqueeLogos.map((name, i) => (
              <div key={i} className="inline-flex items-center justify-center w-32 h-16 shrink-0">
                <img
                  src={`/companylogo/${name}.png`}
                  className="max-h-12 max-w-[7rem] object-contain hover:scale-110 transition duration-300"
                  alt={name}
                  onError={e => {
                    e.target.parentNode.innerHTML = `<span class="text-xs text-gray-400 font-semibold">${name}</span>`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ MODALS ══════════════════ */}

      {/* Calendar event form */}
      <AnimatePresence>
        {showCalForm && (
          <Modal title={`Add Drive – ${months[month]} ${showCalForm}`} onClose={() => setShowCalForm(null)}>
            <LogoUploadField value={calForm.logo} onChange={v => setCalForm(f=>({...f,logo:v}))} label="Company Logo" />
            <Field label="Company Name" value={calForm.name} onChange={v => setCalForm(f=>({...f,name:v}))} placeholder="e.g. Infosys" />
            <Field label="Role" value={calForm.role} onChange={v => setCalForm(f=>({...f,role:v}))} placeholder="e.g. Software Engineer" />
            <Field label="Avg Package" value={calForm.avg} onChange={v => setCalForm(f=>({...f,avg:v}))} placeholder="e.g. 8 LPA" />
            <Field label="No. of Students" type="number" value={calForm.count} onChange={v => setCalForm(f=>({...f,count:v}))} placeholder="e.g. 5" />
            <Field label="Student Names (comma separated)" value={calForm.students} onChange={v => setCalForm(f=>({...f,students:v}))} placeholder="Rahul, Priya, Amit" />
            <button onClick={handleAddCalEvent} className="mt-4 w-full bg-blue-900 text-white py-2 rounded-xl font-bold hover:bg-blue-700 transition">Save Event</button>
          </Modal>
        )}

        {/* High flyer form */}
        {showHFForm && (
          <Modal title="Add High Flyer" onClose={() => setShowHFForm(false)}>
            <Field label="Student Name"  value={hfForm.name}    onChange={v => setHfForm(f=>({...f,name:v}))}    placeholder="e.g. Riya Sharma" />
            <Field label="Company"       value={hfForm.company} onChange={v => setHfForm(f=>({...f,company:v}))} placeholder="e.g. Google" />
            <Field label="Package"       value={hfForm.package} onChange={v => setHfForm(f=>({...f,package:v}))} placeholder="e.g. 24 LPA" />
            <LogoUploadField label="Student Photo"   value={hfForm.photo}        onChange={v => setHfForm(f=>({...f,photo:v}))} />
            <LogoUploadField label="Company Logo"    value={hfForm.companyLogo}  onChange={v => setHfForm(f=>({...f,companyLogo:v}))} />
            <button onClick={handleAddHF} className="mt-4 w-full bg-blue-900 text-white py-2 rounded-xl font-bold hover:bg-blue-700 transition">Add</button>
          </Modal>
        )}

        {/* Add company form */}
        {showCompForm && (
          <Modal title="Add Company Drive" onClose={() => setShowCompForm(false)}>
            <LogoUploadField value={compForm.logo} onChange={v => setCompForm(f=>({...f,logo:v}))} label="Company Logo" />
            <Field label="Company Name" value={compForm.name} onChange={v => setCompForm(f=>({...f,name:v}))} placeholder="e.g. Wipro" />
            <Field label="Role" value={compForm.role} onChange={v => setCompForm(f=>({...f,role:v}))} placeholder="e.g. Software Engineer" />
            <Field label="Avg Package" value={compForm.avg} onChange={v => setCompForm(f=>({...f,avg:v}))} placeholder="e.g. 8 LPA" />
            <Field label="Student Names (comma separated)" value={compForm.students} onChange={v => setCompForm(f=>({...f,students:v}))} placeholder="Name1, Name2" />
            <button onClick={handleAddComp} className="mt-4 w-full bg-blue-900 text-white py-2 rounded-xl font-bold hover:bg-blue-700 transition">Save</button>
          </Modal>
        )}
      </AnimatePresence>

      {/* marquee keyframe via style tag */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

/* ─────────── small reusable UI pieces ─────────── */

function Modal({ title, onClose, children }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div initial={{scale:0.9,y:30}} animate={{scale:1,y:0}} exit={{scale:0.9,y:30}}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-3"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-blue-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">✕</button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function Field({ label, value, onChange, placeholder, type="text" }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 block mb-1">{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  );
}

function LogoUploadField({ label, value, onChange }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 block mb-1">{label}</label>
      <div className="flex items-center gap-3">
        {value && <img src={value} className="h-10 object-contain rounded" alt="preview" />}
        <label className="cursor-pointer bg-blue-50 border border-blue-200 text-blue-900 text-xs px-4 py-2 rounded-lg hover:bg-blue-100 transition font-semibold">
          Browse
          <input type="file" accept="image/*" className="hidden" onChange={e => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => onChange(reader.result);
            reader.readAsDataURL(file);
          }} />
        </label>
        {value && <button onClick={() => onChange("")} className="text-red-400 text-xs hover:text-red-600">Remove</button>}
      </div>
    </div>
  );
}
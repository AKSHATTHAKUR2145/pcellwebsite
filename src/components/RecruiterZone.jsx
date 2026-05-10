import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Send Job Notification",
    description:
      "Recruiters share the Job Description (JD) with the Placement Cell via email or the portal. The JD should include role details, eligibility criteria, CTC, and important dates.",
    
  },
  {
    number: "02",
    title: "Student Registration",
    description:
      "Eligible students register for the drive through the Placement Cell portal. The cell coordinates with recruiters to share the registered student list and résumés.",
    
  },
  {
    number: "03",
    title: "Shortlisting",
    description:
      "Recruiters review applications and share a shortlist. The Placement Cell notifies shortlisted students and coordinates pre-placement talk (PPT) schedules.",
    
  },
  {
    number: "04",
    title: "Pre-Placement Talk",
    description:
      "Recruiters conduct an online or on-campus PPT to introduce the company, culture, and role to students. This helps candidates make informed decisions.",
    
  },
  {
    number: "05",
    title: "Selection Process",
    description:
      "Aptitude tests, group discussions, technical rounds, and HR interviews are conducted on-campus or virtually as per the recruiter's process.",
    
  },
  {
    number: "06",
    title: "Offer & Onboarding",
    description:
      "Selected candidates receive offer letters through the Placement Cell. The cell assists with documentation and ensures a smooth onboarding experience.",
    
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

export default function RecruiterZone() {
  const [form, setForm] = useState({
    companyName: "",
    workMail: "",
    hrName: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.companyName.trim()) e.companyName = "Company name is required.";
    if (!form.workMail.trim()) {
      e.workMail = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workMail)) {
      e.workMail = "Enter a valid email address.";
    }
    if (!form.hrName.trim()) e.hrName = "HR name is required.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

 return (
  <div className="bg-gray-100 min-h-screen">
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">

      {/* ================= RECRUITER ZONE HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Recruiter Zone
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Welcome to the Recruiter Zone. Here recruiters can connect with the
          Placement Cell, share job opportunities, conduct placement drives,
          access recruitment information, and collaborate with IIPS DAVV
          for campus hiring.
        </p>
      </motion.div>

      {/* ── INTRO ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Recruitment Process
        </h2>
        <p className="text-gray-600 leading-relaxed">
          We follow a streamlined, transparent recruitment process to make
          campus hiring smooth and efficient for our recruiter partners. Below
          is a step-by-step overview of how the placement process works at
          IIPS, DAVV Indore.
        </p>
      </motion.div>

      {/* ── PROCESS STEPS ── */}
      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">
          Step-by-Step Process
        </h2>

        {/* DESKTOP: timeline */}
        <div className="hidden md:block relative">
          {/* center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-200" />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className={`flex items-center gap-8 ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* card */}
                  <div className="w-[45%] bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{step.icon}</span>
                      <span className="text-xs font-bold text-blue-400 tracking-widest">
                        STEP {step.number}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-blue-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* center dot */}
                  <div className="w-[10%] flex justify-center">
                    <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* empty side */}
                  <div className="w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* MOBILE: vertical cards */}
        <div className="md:hidden space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-2xl shadow-md p-5 flex gap-4"
            >
              <div className="w-10 h-10 shrink-0 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
                {step.number}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span>{step.icon}</span>
                  <h3 className="font-bold text-blue-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CONTACT FORM ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
      >
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-900 mb-1 text-center">
            Contact Us
          </h2>
          <p className="text-gray-500 text-center mb-8 text-sm">
            Interested in recruiting from IIPS? Fill in the details below and
            our Placement Cell will get back to you shortly.
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-10"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Thank you, {form.hrName}!
              </h3>
              <p className="text-gray-500">
                We've received your inquiry from{" "}
                <span className="font-semibold text-blue-800">
                  {form.companyName}
                </span>
                . Our team will reach out to{" "}
                <span className="font-semibold text-blue-800">
                  {form.workMail}
                </span>{" "}
                soon.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ companyName: "", workMail: "", hrName: "" });
                }}
                className="mt-6 text-blue-900 underline text-sm"
              >
                Submit another inquiry
              </button>
            </motion.div>
          ) : (
            <div className="space-y-5">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Infosys Ltd."
                  value={form.companyName}
                  onChange={(e) =>
                    handleChange("companyName", e.target.value)
                  }
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 transition ${
                    errors.companyName ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* Work Mail */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. hr@company.com"
                  value={form.workMail}
                  onChange={(e) => handleChange("workMail", e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 transition ${
                    errors.workMail ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {errors.workMail && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.workMail}
                  </p>
                )}
              </div>

              {/* HR Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  HR Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={form.hrName}
                  onChange={(e) => handleChange("hrName", e.target.value)}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 transition ${
                    errors.hrName ? "border-red-400" : "border-gray-300"
                  }`}
                />
                {errors.hrName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.hrName}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-900 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl shadow-md"
              >
                Submit Inquiry
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  </div>
);
}

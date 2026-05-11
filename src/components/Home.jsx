import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home({ isAdmin, setPage, setStudentTab }) {

  const text = "Welcome to Placement Cell";

  const [displayText, setDisplayText] = useState("");
  const [current, setCurrent] = useState(0);
  const [updates, setUpdates] = useState([]);
  const [images, setImages] = useState([]);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [type, setType] = useState("internship");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [hasLink, setHasLink] = useState(false);

  /* ================= ADD UPDATE ================= */

  const addUpdate = () => {
    if (!title.trim()) return;
    const stored = JSON.parse(localStorage.getItem("updates")) || [];
    stored.push({
      title,
      type,
      date: new Date().toLocaleDateString(),
      link: hasLink ? link.trim() : "",
    });
    localStorage.setItem("updates", JSON.stringify(stored));
    setUpdates(stored);
    setTitle("");
    setLink("");
    setHasLink(false);
    setShowUpdateForm(false);
  };

  /* ================= DELETE UPDATE ================= */

  const deleteUpdate = (index) => {
    const stored = JSON.parse(localStorage.getItem("updates")) || [];
    stored.splice(index, 1);
    localStorage.setItem("updates", JSON.stringify(stored));
    setUpdates([...stored]);
  };

  /* ================= IMAGE UPLOAD ================= */

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const stored = JSON.parse(localStorage.getItem("images")) || [];
      stored.push(reader.result);
      localStorage.setItem("images", JSON.stringify(stored));
      setImages(stored);
    };
    reader.readAsDataURL(file);
  };

  /* ================= DELETE IMAGE ================= */

  const deleteImage = (index) => {
    const stored = JSON.parse(localStorage.getItem("images")) || [];
    stored.splice(index, 1);
    localStorage.setItem("images", JSON.stringify(stored));
    setImages(stored);
  };

  /* ================= TYPING EFFECT ================= */

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const load = () => {
      const storedUpdates = JSON.parse(localStorage.getItem("updates")) || [];
      setUpdates(storedUpdates);
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("images"));
    if (storedImages && storedImages.length > 0) {
      setImages(storedImages);
    } else {
      setImages([
        "/image 1.png",
        "/image 2.png",
        "/image 3.png",
        "/image 4.jpeg",
        "/image 5.jpeg",
        "/image 6.png",
        "/image 7.jpeg",
        "/image 8.jpeg",
        "/image 9.jpeg",
        "/image 10.jpeg",
        "/image 11.jpeg",
      ]);
    }
  }, []);

  /* ================= IMAGE SLIDER ================= */

  useEffect(() => {
    if (images.length === 0) return;
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(slider);
  }, [images]);

  /* ================= PARALLAX ================= */

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const x     = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <>
      {/* ================= SECTION 1 ================= */}
      <div ref={sectionRef} className="w-full px-3 py-6 bg-gray-100">
        <div className="flex gap-4 items-stretch">

          {/* LEFT SIDE */}
          <div className="w-[40%] flex flex-col gap-4">

            {/* WELCOME */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                {displayText}
              </h2>
              <p className="text-gray-600">
                The Placement Cell at IIPS connects students with top recruiters.
              </p>
            </div>

            {/* UPDATES */}
            <div className="bg-white p-4 rounded-xl shadow flex flex-col h-[420px]">
              <h2 className="flex justify-between font-semibold mb-4">
                Latest Updates
                {isAdmin && (
                  <button
                    onClick={() => setShowUpdateForm((v) => !v)}
                    className="bg-blue-900 text-white px-2 rounded"
                  >
                    {showUpdateForm ? "✕" : "+"}
                  </button>
                )}
              </h2>

              {/* ── ADMIN ADD FORM ── */}
              {showUpdateForm && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4 space-y-2">
                  <select
                    className="border p-2 w-full rounded-lg text-sm"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="internship">💼 Internship</option>
                    <option value="drives">🏢 Placement Drive</option>
                    <option value="material">📢 Announcements & Notices</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Enter title / update"
                    className="border p-2 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={hasLink}
                      onChange={(e) => setHasLink(e.target.checked)}
                      className="w-4 h-4 accent-blue-900"
                    />
                    Add a registration / link
                  </label>

                  {hasLink && (
                    <input
                      type="text"
                      placeholder="Paste link (e.g. https://forms.google.com/...)"
                      className="border p-2 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  )}

                  <button
                    onClick={addUpdate}
                    className="bg-blue-900 text-white px-4 py-1.5 rounded-lg text-sm w-full hover:bg-blue-700 transition"
                  >
                    Save Update
                  </button>
                </div>
              )}

              {/* ── UPDATE LIST ── */}
              <div className="space-y-3 overflow-y-auto pr-2">
                {updates.length === 0 && (
                  <p className="text-gray-400 text-sm">No updates available</p>
                )}
                {updates.map((item, index) => {
                  const typeLabel = {
                    internship: "💼 Internship",
                    drives:     "🏢 Placement Drive",
                    material:   "📢 Announcements & Notices",
                  }[item.type] || item.type;

                  return (
                    <div
                      key={index}
                      className="relative border-l-4 border-blue-900 pl-3 py-2 pr-7 rounded hover:bg-blue-50 transition group"
                    >
                      {/* ── RED DELETE CROSS (admin only) ── */}
                      {isAdmin && (
                        <button
                          onClick={() => deleteUpdate(index)}
                          title="Remove update"
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 hover:bg-red-700 text-white text-[10px] font-bold flex items-center justify-center transition opacity-70 hover:opacity-100"
                        >
                          ✕
                        </button>
                      )}

                      <p className="font-semibold text-sm text-gray-800">{item.title}</p>

                      {item.link && item.link.trim() !== "" && (
                        <a
                          href={item.link.startsWith("http") ? item.link : `https://${item.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-900 px-2 py-0.5 rounded-full transition"
                        >
                          🔗 Register / Open Link ↗
                        </a>
                      )}

                      <p className="text-xs text-gray-500 mt-1">{typeLabel} • {item.date}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-[60%] flex flex-col">
            <motion.img
              src={images[current] || "https://via.placeholder.com/1200x600"}
              style={{ x, scale }}
              className="rounded-xl w-full h-[550px] object-cover shadow-lg"
            />

            {isAdmin && (
              <>
                <div className="mt-3 flex gap-3 overflow-x-auto">
                  {images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        onClick={() => setCurrent(index)}
                        className="w-28 h-20 object-cover rounded-lg cursor-pointer"
                      />
                      <button
                        onClick={() => deleteImage(index)}
                        className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-2">
                  <label className="bg-blue-900 text-white w-8 h-8 flex items-center justify-center rounded cursor-pointer">
                    +
                    <input type="file" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ================= SECTION 2 : DIRECTOR ================= */}
      <div className="min-h-screen flex items-center px-10 bg-gray-100">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            From the Director's Desk
          </h2>
          <div className="flex items-center gap-10">

            <motion.img
              src="/director.png"
              initial={{ x: -200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="w-[40%] h-[320px] object-cover rounded-xl shadow-lg border-2 border-blue-900"
            />

            <motion.div
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="w-[60%] bg-white p-6 rounded-xl shadow-lg"
            >
              <p className="text-gray-700 leading-relaxed text-sm tracking-wide">
                At the outset, I would like to thank and congratulate our esteemed recruiters
                for their continued support. Our students have consistently lived up to expectations,
                demonstrating excellence in academics, innovation, and professional growth.
                <br /><br />
                The institute continues to provide a strong academic and research environment,
                fostering curiosity, innovation, and entrepreneurship.
              </p>
              <button className="mt-6 bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                Read More
              </button>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ================= SECTION 3 : TPO ================= */}
      <div className="min-h-screen flex items-center px-10 bg-gray-100">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            From the Professor-In-Charge, Training and Placement Cell
          </h2>
          <div className="flex items-center gap-10">

            <motion.div
              initial={{ x: -200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="w-[60%] bg-white p-6 rounded-xl shadow-lg"
            >
              <p className="text-gray-700 leading-relaxed text-sm tracking-wide">
                On behalf of the Training and Placement Cell, I invite corporates,
                academia, and organizations to collaborate with our students for
                internships, training, and placement opportunities.
                <br /><br />
                Our institute focuses on developing highly skilled professionals
                equipped with technical knowledge, innovation, and leadership
                qualities to meet industry demands.
              </p>
              <button className="mt-6 bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                Read More
              </button>
            </motion.div>

            <motion.img
              src="/tpo.png"
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="w-[40%] h-[320px] object-cover rounded-xl shadow-lg border-2 border-blue-900"
            />

          </div>
        </div>
      </div>
    </>
  );
}
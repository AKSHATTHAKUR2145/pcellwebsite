import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home({ isAdmin }) {
  const text = "Welcome to Placement Cell";

  const [displayText, setDisplayText] = useState("");
  const [current, setCurrent] = useState(0);
  const [updates, setUpdates] = useState([]);
  const [images, setImages] = useState([]);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [type, setType] = useState("updates");
  const [title, setTitle] = useState("");

  /* ADD UPDATE */
  const addUpdate = () => {
    const stored = JSON.parse(localStorage.getItem("updates")) || [];

    stored.push({
      title,
      type,
      date: new Date().toLocaleDateString(),
      link: "#",
    });

    localStorage.setItem("updates", JSON.stringify(stored));
    setUpdates(stored);
    setTitle("");
    setShowUpdateForm(false);
  };

  /* IMAGE UPLOAD */
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

  /* DELETE IMAGE */
  const deleteImage = (index) => {
    const stored = JSON.parse(localStorage.getItem("images")) || [];
    stored.splice(index, 1);

    localStorage.setItem("images", JSON.stringify(stored));
    setImages(stored);
  };

  /* TYPING EFFECT */
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  /* LOAD DATA */
  useEffect(() => {
    const storedUpdates = JSON.parse(localStorage.getItem("updates"));
    if (storedUpdates) setUpdates(storedUpdates);
  }, []);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("images"));
    if (storedImages) setImages(storedImages);
  }, []);

  /* IMAGE SLIDER */
  useEffect(() => {
    if (images.length === 0) return;

    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(slider);
  }, [images]);

  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

// ================= SECTION 3 ANIMATION =================

const section3Ref = useRef(null);

const { scrollYProgress: section3Progress } = useScroll({
  target: section3Ref,
  offset: ["start end", "end start"]
});

// opposite direction (right → center)
const section3X = useTransform(section3Progress, [0, 1], [300, 0]);

const section3Opacity = useTransform(section3Progress, [0, 0.3, 1], [0, 1, 1]);

  return (
    <>
      <div ref={sectionRef} className="w-full px-3 py-6">
        <div className="flex gap-4 items-stretch">

          {/* LEFT SIDE */}
          <div className="w-[40%] flex flex-col gap-4">

            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                {displayText}
              </h2>
              <p className="text-gray-600">
                The Placement Cell at IIPS connects students with top recruiters.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow flex flex-col h-[420px]">

              <h2 className="flex justify-between font-semibold mb-4">
                Latest Updates

                {isAdmin && (
                  <button
                    onClick={() => setShowUpdateForm(true)}
                    className="bg-blue-900 text-white px-2 rounded"
                  >
                    +
                  </button>
                )}
              </h2>

              {showUpdateForm && (
                <div className="bg-gray-100 p-3 rounded mb-4">

                  <select
                    className="border p-2 w-full mb-2"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="updates">Updates</option>
                    <option value="internship">Internship</option>
                    <option value="drives">Drives</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Enter title"
                    className="border p-2 w-full mb-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <button
                    onClick={addUpdate}
                    className="bg-blue-900 text-white px-4 py-1 rounded"
                  >
                    Save
                  </button>

                </div>
              )}

              <div className="space-y-3 overflow-y-auto pr-2">

                {updates.length === 0 && (
                  <p className="text-gray-400 text-sm">No updates available</p>
                )}

                {updates.map((item, index) => (
                  <div key={index} className="border-l-4 border-blue-900 pl-3 py-2 rounded">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      {item.type} • {item.date}
                    </p>
                  </div>
                ))}

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
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
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

    {/* HEADING */}
    <h2 className="text-3xl font-bold text-blue-900 mb-8">
      From the Director's Desk
    </h2>

    <div className="flex items-center gap-10">

      {/* IMAGE (2 PART) */}
      <motion.img
        src="/director.png"
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-[40%] h-[320px] object-cover rounded-xl shadow-lg border-2 border-blue-900"
      />

      {/* TEXT (3 PART) */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-[60%] bg-white p-6 rounded-xl shadow-lg"
      >

        <p className="text-gray-700 leading-relaxed text-sm tracking-wide">
          At the outset, I would like to thank and congratulate our esteemed recruiters 
          for their continued support. Our students have consistently lived up to expectations, 
          demonstrating excellence in academics, innovation, and professional growth.

          <br /><br />

          The institute continues to provide a strong academic and research environment, 
          fostering curiosity, innovation, and entrepreneurship. With experienced faculty 
          and world-class facilities, our graduates are well-prepared to excel in both 
          industry and society.
        </p>

        {/* READ MORE BUTTON */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-6 bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Read More
        </button>

      </motion.div>

    </div>

  </div>

</div>

{/* ================= SECTION 3 : TPO ================= */}
<div className="min-h-screen flex items-center px-10 bg-gray-100">

  <div className="w-full">

    {/* HEADING */}
    <h2 className="text-3xl font-bold text-blue-900 mb-8">
      From the Professor-In-Charge, Training and Placement Cell
    </h2>

    <div className="flex items-center gap-10">

      {/* TEXT (3 PART) */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
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
  {/* READ MORE BUTTON */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-6 bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Read More
        </button>
      </motion.div>

      {/* IMAGE (2 PART) */}
      <motion.img
        src="/tpo.png"
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-[40%] h-[320px] object-cover rounded-xl shadow-lg border-2 border-blue-900"
      />

    </div>

  </div>

</div>
   </>
  );
}
import { useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import People from "./components/People";
import StudentZone from "./components/StudentZone";
import Placement from "./components/Placement";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";
import RecruiterZone from "./components/RecruiterZone";
import { getDatabase } from "firebase/database";
import { app } from "./firebase";

const DB = getDatabase(app);

const navItems = [
  { label: "HOME",             key: "home" },
  { label: "ABOUT",            key: "about" },
  { label: "STUDENT ZONE",    key: "student" },
  { label: "PLACEMENT",        key: "placement" },
  { label: "RECRUITER'S ZONE", key: "recruiter" },
  { label: "ADMIN LOGIN",      key: "admin" },
];

export default function App() {
  const [page, setPage]           = useState("home");
  const [isAdmin, setIsAdmin]     = useState(false);
  const [studentTab, setStudentTab] = useState("internship");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* HEADER */}
      <div className="flex items-center justify-between px-10 py-3 bg-white shadow">
        <img src="/davvLogo.png" className="h-10" alt="DAVV" />
        <div className="text-center">
          <h1 className="text-xl font-semibold text-blue-900">Placement Cell IIPS</h1>
          <p className="text-sm text-gray-500">DAVV - Indore</p>
        </div>
        <img src="/iipsLogo.png" className="h-10" alt="IIPS" />
      </div>

      {/* NAVBAR */}
      <div className="flex justify-center gap-8 py-3 bg-blue-900 text-white text-sm font-medium flex-wrap px-4">
        {navItems.map(({ label, key }) => (
          <p key={key} onClick={() => setPage(key)}
            className={`relative cursor-pointer transition duration-300 ease-in-out whitespace-nowrap
              ${page === key ? "text-blue-300" : "hover:text-blue-300 hover:scale-105"}
              after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-blue-300
              after:transition-all after:duration-300
              ${page === key ? "after:w-full" : "after:w-0 hover:after:w-full"}`}>
            {label}
          </p>
        ))}
      </div>

      {/* PAGES */}
      <div className="flex-grow bg-gray-100 flex justify-center">
        <div className="w-full max-w-7xl px-6 py-8">
          {page === "home"      && <Home isAdmin={isAdmin} setPage={setPage} setStudentTab={setStudentTab} />}
          {page === "about"     && <About />}
          {page === "people"    && <People />}
          {page === "student"   && <StudentZone isAdmin={isAdmin} activeTab={studentTab} setActiveTab={setStudentTab} />}
          {page === "placement" && <Placement isAdmin={isAdmin} />}
          {page === "recruiter" && <RecruiterZone />}
          {page === "admin" && !isAdmin && <AdminLogin setIsAdmin={setIsAdmin} setPage={setPage} />}
          {page === "admin" && isAdmin  && <AdminPanel />}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#001f3f] text-white pt-10 pb-4 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-10 px-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://iips.edu.in" target="_blank" rel="noopener noreferrer"
                  className="hover:text-blue-400 cursor-pointer">IIPS</a>
              </li>
              <li className="hover:text-blue-400 cursor-pointer">Student Login</li>
              <li className="hover:text-blue-400 cursor-pointer"
                onClick={() => setPage("recruiter")}>Recruiter Zone</li>
              <li className="hover:text-blue-400 cursor-pointer">Our Developers</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Social</h3>
            <div className="flex gap-4 text-xl">
              <i className="fab fa-linkedin hover:text-blue-400 cursor-pointer"></i>
              <i className="fab fa-x-twitter hover:text-blue-400 cursor-pointer"></i>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <p>📞 Phone Number</p>
              <p className="text-gray-300">0731-660 (Extn. 3572)</p>
              <p>📍 Address</p>
              <p className="text-gray-300">IIPS, DAVV, Indore<br />Madhya Pradesh, India</p>
              <p>✉️ Email</p>
              <p className="text-gray-300">placement@iips.edu.in</p>
            </div>
          </div>
          <div>
            <iframe
              src="https://maps.google.com/maps?q=IIPS%20Indore&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-48 rounded-lg" loading="lazy" />
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-8 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} Placement Cell | IIPS DAVV Indore
        </div>
      </footer>
    </div>
  );
}
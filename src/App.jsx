import { useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import People from "./components/People";
import StudentZone from "./components/StudentZone";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* HEADER */}
      <div className="flex items-center justify-between px-10 py-3 bg-white shadow">
        <img src="/davvLogo.png" className="h-14" />

        <div className="text-center">
          <h1 className="text-xl font-bold text-blue-900">
            Placement Cell IIPS
          </h1>
          <p className="text-sm text-gray-500">DAVV - Indore</p>
        </div>

        <img src="/iipsLogo.png" className="h-14" />
      </div>

      {/* NAVBAR */}
      
<div className="flex justify-center gap-10 py-4 bg-blue-900 text-white cursor-pointer">
  <p onClick={() => setPage("home")}>HOME</p>
  <p onClick={() => setPage("about")}>ABOUT</p>
  <p onClick={() => setPage("people")}>PEOPLE</p>
  <p onClick={() => setPage("student")}>STUDENT ZONE</p>
  <p>PLACEMENT</p>
  <p>ADMIN LOGIN</p>
</div>
      {/* PAGES */}
      <div className="flex-grow">
        {page === "home" && <Home />}
        {page === "about" && <About />}
        {page === "people" && <People />}
        {page === "student" && <StudentZone />}
      </div>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white text-center py-6 mt-10">
        <p className="text-sm">
          © {new Date().getFullYear()} Placement Cell | International Institute of Professional Studies (IIPS)
        </p>
        <p className="text-sm mt-1">
          Devi Ahilya Vishwavidyalaya (DAVV), Indore
        </p>

        <div className="flex justify-center gap-6 mt-3 text-sm">
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">LinkedIn</a>
          <a href="#" className="hover:underline">Website</a>
        </div>
      </footer>

    </div>
  );
}
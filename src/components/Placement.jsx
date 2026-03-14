import { useRef } from "react";

export default function Placement() {

  const scrollRef = useRef(null);

  const recruiters = [
    { name: "TCS", logo: "/tcs.png", info: "Role: Developer | Avg: 7 LPA" },
    { name: "Infosys", logo: "/infosys.png", info: "Role: System Engineer | Avg: 6 LPA" },
    { name: "Accenture", logo: "/accenture.png", info: "Role: Analyst | Avg: 8 LPA" },
    { name: "Capgemini", logo: "/capgemini.png", info: "Role: Software Engineer | Avg: 6.5 LPA" },
    { name: "Deloitte", logo: "/deloitte.png", info: "Role: Consultant | Avg: 10 LPA" },
  ];

  const calendar = [
    { date: "5 Jan", company: "TCS", students: ["Rahul", "Ananya", "Rohit"] },
    { date: "12 Jan", company: "Infosys", students: ["Neha", "Arjun"] },
    { date: "20 Jan", company: "Accenture", students: ["Riya", "Siddharth"] },
  ];

  const highflyers = [
    { name: "Riya Sharma", company: "Deloitte", package: "18 LPA" },
    { name: "Arjun Patel", company: "Amazon", package: "22 LPA" },
    { name: "Neha Jain", company: "Microsoft", package: "25 LPA" },
  ];

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 300;
  };

  return (
    <div className="p-10 space-y-16">

      {/* RECRUITERS SECTION */}

      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Recruiters</h2>

        <div className="flex items-center gap-4">

          <button
            onClick={scrollLeft}
            className="bg-blue-900 text-white px-3 py-2 rounded"
          >
            ◀
          </button>

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-hidden scroll-smooth"
          >
            {recruiters.map((r, i) => (
              <div
                key={i}
                className="relative group w-40 h-28 flex items-center justify-center bg-white shadow rounded-xl hover:scale-105 transition"
              >
                <img src={r.logo} className="h-12" />

                {/* Hover Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition p-2 rounded-b-xl">
                  <p className="font-bold">{r.name}</p>
                  <p>{r.info}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="bg-blue-900 text-white px-3 py-2 rounded"
          >
            ▶
          </button>
        </div>
      </div>

      {/* CALENDAR SECTION */}

      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          Placement Calendar
        </h2>

        <div className="grid grid-cols-3 gap-6">

          {calendar.map((event, i) => (
            <div
              key={i}
              className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-blue-900">{event.date}</h3>
              <p className="text-gray-600">{event.company}</p>

              <div className="mt-3 text-sm">
                <p className="font-semibold">Students Placed:</p>
                {event.students.map((s, j) => (
                  <p key={j}>{s}</p>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Company timeline */}

        <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Companies Timeline</h3>

          {calendar.map((c, i) => (
            <p key={i} className="text-gray-700">
              {c.date} → {c.company}
            </p>
          ))}
        </div>
      </div>

      {/* HIGHFLYERS */}

      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          High Flyers
        </h2>

        <div className="grid grid-cols-3 gap-6">

          {highflyers.map((h, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-blue-900 to-blue-600 text-white p-6 rounded-xl shadow hover:scale-105 transition"
            >
              <h3 className="text-lg font-bold">{h.name}</h3>
              <p>{h.company}</p>
              <p className="text-2xl font-bold mt-2">{h.package}</p>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}
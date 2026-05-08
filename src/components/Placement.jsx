import { useRef, useState, useEffect } from "react";

export default function Placement() {

  const scrollRef = useRef(null);
  const [highlight, setHighlight] = useState(null);

  const recruiters = [
    { name: "TCS", logo: "/tcs.png", info: "Role: Developer | Avg: 7 LPA" },
    { name: "Infosys", logo: "/infosys.png", info: "Role: System Engineer | Avg: 6 LPA" },
    { name: "Accenture", logo: "/accenture.png", info: "Role: Analyst | Avg: 8 LPA" },
    { name: "Capgemini", logo: "/capgemini.png", info: "Role: Software Engineer | Avg: 6.5 LPA" },
    { name: "Deloitte", logo: "/deloitte.png", info: "Role: Consultant | Avg: 10 LPA" },
    { name: "Persistent", logo: "/persistent.png", info: "Role: Consultant | Avg: 15 LPA" },

  ];

  const calendar = [
    { date: "3 Sept", company: "Virtusa", students: ["Rahul","Ananya"] },
    { date: "13 Sept", company: "Persistent", students: ["Neha","Rohit"] },
    { date: "29 Sept", company: "Capgemini", students: ["Siddharth","Megha"] },
  ];

  const calendarEvents = {
    3: { company: "Virtusa", logo: "/virtusa.png" },
    13: { company: "Persistent", logo: "/persistent.png" },
    29: { company: "Capgemini", logo: "/capgemini.png" },
  };

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

  const scrollToCompany = (company) => {
    setHighlight(company);
    document.getElementById(company)?.scrollIntoView({behavior:"smooth"});
  };

  useEffect(()=>{
    const removeHighlight = () => setHighlight(null);
    window.addEventListener("scroll", removeHighlight);
    return ()=>window.removeEventListener("scroll", removeHighlight);
  },[]);

  const [currentDate,setCurrentDate]=useState(new Date());

  const month=currentDate.getMonth();
  const year=currentDate.getFullYear();

  const months=[
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const nextMonth=()=>{
    setCurrentDate(new Date(year,month+1,1));
  };

  const prevMonth=()=>{
    setCurrentDate(new Date(year,month-1,1));
  };

  const firstDay=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();

  const calendarCells=[];

  for(let i=0;i<35;i++){   // 5 rows × 7 columns

    const day=i-firstDay+1;

    if(day>0 && day<=daysInMonth){

      const event=calendarEvents[day];

      calendarCells.push(

        <div key={i} className="border h-24 flex items-center justify-center relative">

          <span className="absolute top-1 left-2 text-xs">{day}</span>

          {event && (
            <img
              src={event.logo}
              className="h-8 object-contain cursor-pointer hover:scale-110 transition"
              onClick={()=>scrollToCompany(event.company)}
            />
          )}

        </div>
      );

    }else{

      calendarCells.push(
        <div key={i} className="border h-24"></div>
      );

    }

  }

  return(
    <div className="p-6 space-y-16">

      {/* RECRUITERS */}

      <div>

        <h2 className="text-2xl font-bold text-blue-900 mb-6">Recruiters</h2>

        <div className="flex items-center gap-4">

          <button onClick={scrollLeft} className="bg-blue-900 text-white px-3 py-2 rounded">
            ◀
          </button>

          <div ref={scrollRef} className="flex gap-8 overflow-x-hidden scroll-smooth">

            {recruiters.map((r,i)=>(
              <div key={i} className="relative group w-40 h-28 flex items-center justify-center bg-white shadow rounded-xl hover:scale-105 transition">
                <img src={r.logo} className="h-12"/>
                <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition p-2 rounded-b-xl">
                  <p className="font-bold">{r.name}</p>
                  <p>{r.info}</p>
                </div>
              </div>
            ))}

          </div>

          <button onClick={scrollRight} className="bg-blue-900 text-white px-3 py-2 rounded">
            ▶
          </button>

        </div>
      </div>

      {/* CALENDAR */}

      <div>

        <h2 className="text-2xl font-bold text-blue-900 mb-6">Placement Calendar</h2>

        <div className="max-w-4xl mx-auto shadow-lg rounded-xl overflow-hidden">

          <div className="bg-red-600 text-white py-4 flex items-center justify-between px-6">

            <button onClick={prevMonth} className="bg-white text-red-600 px-3 py-1 rounded">
              ◀
            </button>

            <h2 className="text-2xl font-bold">
              {months[month]} {year}
            </h2>

            <button onClick={nextMonth} className="bg-white text-red-600 px-3 py-1 rounded">
              ▶
            </button>

          </div>

          <div className="grid grid-cols-7 text-center bg-gray-100 font-semibold py-2">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>

          <div className="grid grid-cols-7 bg-white text-center">
            {calendarCells}
          </div>

        </div>

        {/* GRID CARDS */}

        <div className="mt-10 grid grid-cols-3 gap-6">

          {calendar.map((event,i)=>(
            <div
              key={i}
              id={event.company}
              className={`scroll-mt-32 bg-white shadow rounded-xl p-4 transition transform
              ${highlight===event.company ? "scale-110 ring-4 ring-blue-400" : "scale-100"}`}
            >

              <h3 className="font-bold text-blue-900">{event.date}</h3>

              <p className="text-gray-600">{event.company}</p>

              <div className="mt-3 text-sm">
                <p className="font-semibold">Students Placed:</p>
                {event.students.map((s,j)=>(
                  <p key={j}>{s}</p>
                ))}
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* HIGH FLYERS */}

      <div>

        <h2 className="text-2xl font-bold text-blue-900 mb-6">High Flyers</h2>

        <div className="grid grid-cols-3 gap-6">

          {highflyers.map((h,i)=>(
            <div key={i} className="bg-gradient-to-r from-blue-900 to-blue-600 text-white p-6 rounded-xl shadow hover:scale-105 transition">
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
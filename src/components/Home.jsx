import { useEffect, useState } from "react";

export default function Home() {

  const text = "Welcome to Placement Cell";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const updates = [
    {
      title: "Upcoming Drive: TCS Digital",
      date: "15 April 2026",
      type: "Placement",
      link: "#"
    },
    {
      title: "Internship Opportunity – Deloitte",
      date: "Apply before 10 April",
      type: "Internship",
      link: "#"
    },
    {
      title: "Google Form – Resume Collection",
      date: "Final Year Students",
      type: "Form",
      link: "#"
    }
  ];

  return (
    <div className="flex p-10 gap-8">

      <div className="w-1/2 space-y-6">

        {/* Welcome Card */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            {displayText}
          </h2>

          <p className="text-gray-600">
            The Placement Cell at IIPS connects students with top recruiters,
            providing opportunities, internships, and career growth.
          </p>
        </div>

        {/* Updates Section */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-lg font-semibold text-blue-900 mb-4">
            Latest Updates
          </h2>

          <div className="space-y-4">

            {updates.map((item, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-900 pl-4 hover:bg-gray-50 p-2 rounded"
              >

                <p className="font-semibold">{item.title}</p>

                <p className="text-sm text-gray-500">
                  {item.type} • {item.date}
                </p>

                <a
                  href={item.link}
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Details
                </a>

              </div>
            ))}

          </div>

        </div>

      </div>

      <div className="w-1/2">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
          className="rounded-xl"
        />
      </div>

    </div>
  );
}
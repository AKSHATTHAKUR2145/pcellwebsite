export default function People() {
  return (
    <div className="p-10 space-y-10">

      {/* DIRECTOR */}
      <div className="bg-white p-6 rounded-xl shadow flex gap-6 items-center">
        <img src="/director.png" className="w-32 h-32 rounded-full" />
        <div>
          <h2 className="text-xl font-bold">Dr. Yamini Karmarkar</h2>
          <p>Director, IIPS</p>
          <p>director@iips.edu.in</p>
          <p>yamini.karmarkar@iips.edu.in</p>
        </div>
      </div>

      {/* TPO */}
      <div className="bg-white p-6 rounded-xl shadow flex gap-6 items-center">
        <img src="/tpo.png" className="w-32 h-32 rounded-full" />
        <div>
          <h2 className="text-xl font-bold">Dr. Nitin Nagar</h2>
          <p>Qualification: MCA, Ph.D.</p>
          <p>Specialization: Java, Cloud, IoT, Data Science</p>
          <p>Experience: 15+ Years</p>
          <p>Email: nitin28nagar@gmail.com</p>
        </div>
      </div>

      {/* COORDINATORS */}
      <div className="grid grid-cols-3 gap-6">

        {[
          "Ritwik Nigam", "Vidushi Sharma",
          "Lokesh Patel", "Iti Patidar", "Mehul Vijayvargiya",
          "Digpal Thakur", "Bhavik Jain",
          "Akshat Thakur", "Abdul Rehman", "Atharva",
          "Anushka Sharma", "Sumit Yogi", "Samarth", "Hansika"
        ].map((name, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow text-center">
            <img src="/user.png" className="w-20 h-20 mx-auto rounded-full mb-2" />
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-gray-500">LinkedIn | Email</p>
          </div>
        ))}

      </div>

    </div>
  );
}
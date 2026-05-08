export default function About() {
  return (

    <div className="bg-gray-100 py-10 px-6 space-y-16">

      {/* ================= DAVV SECTION ================= */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">

        {/* HEADING */}
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-10">
          Devi Ahilya Vishwavidyalaya (DAVV)
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10">

          {/* IMAGE */}
          <div className="w-full md:w-1/2">
            <img
              src="/davv.jpeg"
              alt="DAVV"
              className="w-full h-[450px] object-cover rounded-xl"
            />
          </div>

          {/* TEXT */}
          <div className="w-full md:w-1/2">

            <p className="text-gray-700 leading-relaxed text-lg">
              Established in 1964, Devi Ahilya Vishwavidyalaya (DAVV), Indore is one
              of the most prestigious universities in Madhya Pradesh. Supported by
              the University Grants Commission (UGC) and Government of Madhya Pradesh,
              DAVV offers multidisciplinary programs across Management, Information
              Technology, Engineering, Biotechnology, Commerce, Law, and many more fields.

              <br /><br />

              The university is known for its academic excellence, highly qualified
              faculty members, research contributions, and strong industry collaborations.
              DAVV provides modern infrastructure, advanced laboratories, libraries,
              innovation centers, and an enriching environment for students.

              <br /><br />

              With thousands of students and numerous affiliated institutions, DAVV
              continues to shape future professionals and leaders through quality
              education and holistic development.
            </p>

          </div>

        </div>

      </div>

      {/* ================= IIPS SECTION ================= */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">

        {/* HEADING */}
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-10">
          International Institute of Professional Studies (IIPS)
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10">

          {/* TEXT */}
          <div className="w-full md:w-1/2">

            <p className="text-gray-700 leading-relaxed text-lg">
              Established in 1992 under Devi Ahilya Vishwavidyalaya (DAVV), the
              International Institute of Professional Studies (IIPS) is one of the
              leading institutes in Central India for Management and Computer Science education.

              <br /><br />

              IIPS offers integrated programs in areas such as MBA, MCA, BBA, B.Com,
              and Computer Science with a strong emphasis on industry-oriented learning,
              innovation, practical exposure, and personality development.

              <br /><br />

              The institute is widely recognized for its excellent placement record,
              experienced faculty, modern infrastructure, and dynamic academic environment.
              Students at IIPS gain exposure to seminars, workshops, internships,
              live projects, and corporate interactions that prepare them for successful careers.

              <br /><br />

              With a blend of technology and management education, IIPS continues to
              produce skilled professionals contributing across various industries globally.
            </p>

          </div>

          {/* IMAGE */}
          <div className="w-full md:w-1/2">
            <img
              src="/iips.jpeg"
              alt="IIPS"
              className="w-full h-[450px] object-cover rounded-xl"
            />
          </div>

        </div>

      </div>
     {/* ================= KEY HIGHLIGHTS ================= */}

<div className="bg-white rounded-2xl shadow-lg p-10">

  {/* HEADING */}
  <h2 className="text-4xl font-bold text-blue-900 text-center mb-14">
    Key Highlights
  </h2>

  {/* HIGHLIGHT FRAMES */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

    {/* FRAME 1 */}
    <div
      className="relative h-[320px] flex flex-col justify-center items-center text-center p-8 bg-cover bg-center"
      style={{
        backgroundImage: "url('/frame.jpeg')"
      }}
    >

      <h3 className="text-5xl font-extrabold text-blue-900 mb-4">
        #49
      </h3>

      <p className="text-lg font-semibold text-gray-800 leading-relaxed">
        Ranked among State Public Universities in India
      </p>

      <p className="text-sm text-gray-600 mt-2">
        NIRF 2025
      </p>

    </div>

    {/* FRAME 2 */}
    <div
      className="relative h-[320px] flex flex-col justify-center items-center text-center p-8 bg-cover bg-center"
      style={{
        backgroundImage: "url('/frame.jpeg')"
      }}
    >

      <h3 className="text-5xl font-extrabold text-blue-900 mb-4">
        NAAC A+
      </h3>

      <p className="text-lg font-semibold text-gray-800 leading-relaxed">
        Accredited with excellence in academics,
        infrastructure, and research
      </p>

    </div>

    {/* FRAME 3 */}
    <div
      className="relative h-[320px] flex flex-col justify-center items-center text-center p-8 bg-cover bg-center"
      style={{
        backgroundImage: "url('/frame.jpeg')"
      }}
    >

      <h3 className="text-3xl font-extrabold text-blue-900 mb-4 leading-snug">
        Centre with Potential for Excellence
      </h3>

      <p className="text-lg font-semibold text-gray-800 leading-relaxed">
        Recognized by UGC in Management Studies
      </p>

    </div>

  </div>

</div>
    </div>



  );
}
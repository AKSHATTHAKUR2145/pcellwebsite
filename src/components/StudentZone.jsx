export default function StudentZone() {
  return (
    <div className="p-10 space-y-6">

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold text-blue-900 mb-3">
          Student Zone
        </h2>
        <p className="text-gray-600">
          Welcome to the Student Zone. Here students can access placement
          resources, company updates, internship opportunities and career
          guidance provided by the Placement Cell.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="font-semibold">Placement Updates</p>
          <p className="text-sm text-gray-500">Latest company visits</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="font-semibold">Internship Opportunities</p>
          <p className="text-sm text-gray-500">Available internships</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="font-semibold">Preparation Material</p>
          <p className="text-sm text-gray-500">Interview resources</p>
        </div>

      </div>

    </div>
  );
}
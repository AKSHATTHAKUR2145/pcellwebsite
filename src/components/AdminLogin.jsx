import { useState } from "react";

export default function AdminLogin({ setIsAdmin, setPage }) {
    

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const admins = [
    {
      user: "Akshat",
      pass: "Akshat@123"
    },
    {
      user: "Anika",
      pass: "Anika@123"
    }
  ];

  const handleLogin = () => {

  const validAdmin = admins.find(
  (admin) =>
    admin.user.toLowerCase() === userId.toLowerCase() &&
    admin.pass === password
);

    if (validAdmin) {
      alert("Login Successful");
      setIsAdmin(true);
      setPage("home");
    } else {
      alert("Wrong User ID or Password");
    }

  };

  return (
    <div className="flex justify-center items-center p-20">

      <div className="bg-white shadow p-8 rounded-xl w-80">

        <h2 className="text-xl font-bold text-blue-900 mb-4 text-center">
          Admin Login
        </h2>

        <input
          type="text"
          placeholder="User ID"
          className="border p-2 w-full mb-3 rounded"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-900 text-white w-full py-2 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "1234") {
        localStorage.setItem("adminAuth", "true");

        // 🟢 مهم: نوديه على الداشبورد مباشرة
        navigate("/admin/dashboard");
      } else {
        alert("Wrong username or password");
      }

      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="border p-6 w-80 bg-white shadow">

        <h1 className="text-xl mb-4 font-bold text-center">
          Admin Login
        </h1>

        <input
          placeholder="Username"
          className="border w-full p-2 mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-black text-white w-full py-2 hover:bg-gray-800 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  );
};

export default AdminLogin;
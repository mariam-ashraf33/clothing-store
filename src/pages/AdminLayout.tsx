import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin-login");
  };

  return (
    <div>
      <div className="flex justify-between p-4 border-b">
        <h2>Admin Panel</h2>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1"
        >
          Logout
        </button>
      </div>

      <Outlet />
    </div>
  );
};

export default AdminLayout;

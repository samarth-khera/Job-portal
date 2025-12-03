import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const defaultAvatar =
  "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* AVATAR BUTTON */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 hover:opacity-90 transition"
      >
        <img
          src={user?.avatar || defaultAvatar}
          alt="profile"
          className="w-10 h-10 rounded-full border object-cover"
        />
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg border z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b">
            <p className="font-semibold text-sm">{user?.name || "Unknown User"}</p>
            <p className="text-xs text-gray-500">{user?.email || "No email"}</p>
          </div>

          {/* View Profile */}
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100"
          >
            <UserIcon className="w-4 h-4" />
            View Profile
          </Link>

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              window.location.href = "/login"; // forces redirect
            }}
            className="flex items-center w-full gap-2 px-4 py-3 text-sm hover:bg-red-100 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

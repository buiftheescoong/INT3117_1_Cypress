import React from "react";
import { Link } from "react-router-dom";

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.setItem("isAdmin", false);
  window.location.reload();
};


const SidebarItem = ({ href, Icon, text }) => {
  return (
    <Link to={href} className="hover:bg-blue-300 p-2 rounded flex items-center space-x-2" 
    onClick={(e) => {
      if(text == "Logout"){
        e.preventDefault()
        handleLogout();
        setTimeout(() => {
          navigate("/");
        }, 200);
      }
    }}>
      {Icon && <Icon className="text-xl" />} {/* Hiển thị Icon nếu tồn tại */}
      <span>{text}</span>
    </Link>
  );
};

export default SidebarItem;

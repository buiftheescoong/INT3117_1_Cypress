import React from "react";
import SidebarItem from "./SidebarItem.jsx";
import { FaPlane, FaBook, FaRegPaperPlane, FaBuilding, FaTags, FaSignOutAlt, FaHome } from "react-icons/fa";
import logo from "../../assets/images/imagelogo.png"; 

const Sidebar = () => {
    
    return (

        <aside className="w-64 bg-[#00008B] text-white flex h-full fixed flex-col rounded-xl overflow-auto shadow-2xl">
           
            <div className="p-4 flex justify-left">
                <img src={logo} alt="Logo" className="h-12 w-auto" /> 
            </div>
            <nav className="flex flex-col space-y-2 px-4">
                <SidebarItem href="/admin" Icon={FaHome} text="Home" />
                <SidebarItem href="/admin/flights" Icon={FaPlane} text="Manage Flights" />
                <SidebarItem href="/admin/bookings" Icon={FaBook} text="Manage Bookings" />
                <SidebarItem href="/admin/aircrafts" Icon={FaRegPaperPlane} text="Manage Aircrafts" />
                <SidebarItem href="/admin/airports" Icon={FaBuilding} text="Manage Airport" />
                <SidebarItem href="/admin/promotions" Icon={FaTags} text="Promotions" />
                <SidebarItem href="/" Icon={FaSignOutAlt} text="Logout" />
            </nav>
        </aside>
    );
}

export default Sidebar;

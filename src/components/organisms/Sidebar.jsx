import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", path: "/", icon: "LayoutDashboard" },
    { name: "Projects", path: "/projects", icon: "FolderKanban" },
    { name: "Board", path: "/board", icon: "Kanban" },
    { name: "Team", path: "/team", icon: "Users" }
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-60 bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <ApperIcon name="Zap" className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Workstream
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-l-4 border-primary"
                  : "text-secondary hover:bg-gray-50 hover:text-gray-900"
              )
            }
          >
            {({ isActive }) => (
              <>
                <ApperIcon name={item.icon} className="w-5 h-5" />
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-1">Need Help?</h4>
          <p className="text-xs text-secondary mb-3">Check our documentation</p>
          <button className="text-xs font-semibold text-primary hover:text-primary-dark">
            Learn More →
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
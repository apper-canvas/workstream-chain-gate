import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const MobileSidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { name: "Dashboard", path: "/", icon: "LayoutDashboard" },
    { name: "Projects", path: "/projects", icon: "FolderKanban" },
    { name: "Board", path: "/board", icon: "Kanban" },
    { name: "Team", path: "/team", icon: "Users" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <ApperIcon name="Zap" className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Workstream
                </span>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={onClose}
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
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
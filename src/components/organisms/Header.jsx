import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ onMenuClick, showCreateButton, onCreateClick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <ApperIcon name="Menu" className="w-6 h-6" />
          </button>

          <div className="hidden md:block w-80">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, tasks..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {showCreateButton && (
            <Button variant="primary" onClick={onCreateClick} size="sm">
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Create</span>
            </Button>
          )}

          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <ApperIcon name="Bell" className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
          </button>

          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:shadow-lg transition-shadow">
            JD
          </div>
        </div>
      </div>

      <div className="md:hidden px-4 pb-3">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects, tasks..."
        />
      </div>
    </header>
  );
};

export default Header;
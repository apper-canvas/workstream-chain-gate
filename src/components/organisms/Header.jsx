import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { useSelector } from "react-redux";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import { AuthContext } from "@/App";

const Header = ({ onMenuClick, showCreateButton, onCreateClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleInviteMember = () => {
    setDropdownOpen(false);
    navigate('/team/invite');
  };
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

          <Button variant="secondary" onClick={logout} size="sm">
            <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>

<div className="relative" ref={dropdownRef}>
            <Avatar 
              name={user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'User'} 
              size="md"
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            test - {dropdownOpen}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-gray-300 py-2 z-[9999]">
                <button
                  onClick={handleInviteMember}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors"
                >
                  <ApperIcon name="UserPlus" className="w-4 h-4" />
                  <span>Invite member</span>
                </button>
              </div>
            )}
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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiOutlineDocumentReport, HiOutlineCog } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white transition-width duration-300 ${
          isMinimized ? "w-16" : "w-64"
        } relative`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white"
        >
          {isMinimized ? ">" : "<"}
        </button>
        <div className="flex items-center justify-center h-16">
          <h1
            className={`text-lg font-bold transition-opacity duration-300 ${
              isMinimized ? "opacity-0" : "opacity-100"
            }`}
          >
            My App
          </h1>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link
                to="/"
                className={`flex items-center p-2 hover:bg-gray-700 ${
                  isMinimized ? "justify-center" : ""
                }`}
              >
                <MdOutlineDashboard className="w-6 h-6" />
                <span
                  className={`ml-2 transition-opacity duration-300 ${
                    isMinimized ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/report"
                className={`flex items-center p-2 hover:bg-gray-700 ${
                  isMinimized ? "justify-center" : ""
                }`}
              >
                <HiOutlineDocumentReport className="w-6 h-6" />
                <span
                  className={`ml-1 text-xs transition-opacity duration-300 ${
                    isMinimized ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Laporan Harian
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/master-gerbang"
                className={`flex items-center p-2 hover:bg-gray-700 ${
                  isMinimized ? "justify-center" : ""
                }`}
              >
                <HiOutlineCog className="w-6 h-6" />
                <span
                  className={`ml-2 transition-opacity duration-300 ${
                    isMinimized ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Master Gerbang
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Navbar */}
        <div className="flex items-center justify-between h-16 bg-white shadow">
          <div className="flex items-center ml-4">
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center focus:outline-none">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="rounded-full"
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/logout"
                        className={`block px-4 py-2 text-sm text-gray-700 ${
                          active && "bg-gray-100"
                        }`}
                      >
                        <BiLogOut className="inline-block w-4 h-4 mr-2" />
                        Logout
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        {/* Children */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

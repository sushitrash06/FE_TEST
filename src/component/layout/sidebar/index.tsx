import React, { useEffect, useRef, useState, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./sidebarLinkGroup";
import { MdDashboard } from "react-icons/md";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdMenu,
  IoMdSettings,
} from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const menuItems = [
  {
    label: "Dashboard",
    icon: MdDashboard,
    path: "/",
    isActive: (pathname: string) =>
      pathname === "/",
  },
  {
    label: "Laporan Lain",
    icon: TbReportAnalytics,
    path: "#",
    isActive: (pathname: string) => pathname.includes("/forms"),
    subMenu: [
      {
        label: "Laporan Harian",
        path: "report",
      },
    ],
  },
  {
    label: "Master Gerbang",
    icon: IoMdSettings,
    path: "master-gerbang",
    isActive: (pathname: string) => pathname.includes("tables"),
  },
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { pathname } = useLocation();

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const sidebarRef = useRef<HTMLElement | null>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState(
    localStorage.getItem("sidebar-expanded") === "true"
  );

  const closeSidebarOnOutsideClick = useCallback(
    ({ target }: MouseEvent) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        triggerRef.current &&
        !sidebarRef.current.contains(target as Node) &&
        !triggerRef.current.contains(target as Node)
      ) {
        setSidebarOpen(false);
      }
    },
    [sidebarOpen, setSidebarOpen]
  );

  const closeSidebarOnEscapeKey = useCallback(
    ({ key }: KeyboardEvent) => {
      if (sidebarOpen && key === "Escape") {
        setSidebarOpen(false);
      }
    },
    [sidebarOpen, setSidebarOpen]
  );

  useEffect(() => {
    document.addEventListener("click", closeSidebarOnOutsideClick);
    document.addEventListener("keydown", closeSidebarOnEscapeKey);

    return () => {
      document.removeEventListener("click", closeSidebarOnOutsideClick);
      document.removeEventListener("keydown", closeSidebarOnEscapeKey);
    };
  }, [closeSidebarOnOutsideClick, closeSidebarOnEscapeKey]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", String(sidebarExpanded));
    document.body.classList.toggle("sidebar-expanded", sidebarExpanded);
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebarRef}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#E4E9F2] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex text-[#001429] items-center justify-between gap-2 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img
            className="max-w-[200px] mx-5"
            src={"/assets/images/Jasa_Marga_logo.webp"}
            alt="logo"
          />
        </NavLink>

        {/* Sidebar toggle button (for mobile view) */}
        <button
          ref={triggerRef}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <IoMdMenu />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="px-4 lg:mt-9 lg:px-6">
          <ul className="mb-6 flex flex-col gap-1.5">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.subMenu ? (
                  <SidebarLinkGroup activeCondition={item.isActive(pathname)}>
                    {(handleClick, open) => (
                      <>
                        <NavLink
                          to={item.path}
                          className={`group rounded-lg relative flex justify-between items-center gap-2.5 px-4 py-2 font-medium text-[#001429] duration-300 ease-in-out hover:bg-[#00458F] hover:text-whiten ${
                            item.isActive(pathname)
                              ? "bg-[#00458F] !text-blue-600"
                              : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center">
                            <item.icon className="text-title-md mr-2" />
                            <p>{item.label}</p>
                          </div>
                          {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </NavLink>

                        {/* Dropdown Menu */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && "hidden"
                          }`}
                        >
                          <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                            {item.subMenu.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <NavLink
                                  to={subItem.path}
                                  className={({ isActive }) =>
                                    `group relative items-center rounded-lg font-medium text-[#001429] duration-300 ease-in-out hover:text-blue-900 ${
                                      isActive ? "!text-blue-900" : ""
                                    }`
                                  }
                                >
                                  {subItem.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </SidebarLinkGroup>
                ) : (
                  <NavLink
                    to={item.path}
                    className={`group rounded-lg relative flex items-center gap-2.5 px-4 py-2 font-medium text-[#001429] duration-300 ease-in-out hover:bg-[#00458F] hover:text-white ${
                      item.isActive(pathname) ? "bg-[#00458F] text-whiten" : ""
                    }`}
                  >
                    <item.icon />
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

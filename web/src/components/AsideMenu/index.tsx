import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  MdGroup,
  MdLockPerson,
  MdLogout,
  MdOutlineFilterVintage,
  MdOutlineQuestionMark,
  MdPieChart,
} from "react-icons/md";

interface MenuAsideProps {
  isMenuOpen: boolean;
}

export default ({ isMenuOpen }: MenuAsideProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [activeLink] = useState(() => {
    const textOriginal = window.location.pathname;
    const textRemoved = import.meta.env.BASE_URL;
    return textOriginal.replace(textRemoved, "");
  });

  /**
   * Dynamic links loaded according to the project/user
   */
  const menu = [
    {
      href: "/home",
      title: "Dashboard",
      icon: <MdPieChart className="w-6 h-6 custom--svg" />,
    },
    {
      href: "/user",
      title: "Users",
      icon: <MdGroup className="w-6 h-6 custom--svg" />,
    },
    {
      href: "/role",
      title: "Roles",
      icon: <MdLockPerson className="w-6 h-6 custom--svg" />,
    },
  ];

  /**
   * Common sticky links for all
   */
  const menuHardLink = [
    {
      href: "/faq",
      title: "FAQ's",
      icon: <MdOutlineQuestionMark className="w-6 h-6 custom--svg" />,
    },
    {
      href: "/components",
      title: "Components",
      icon: <MdOutlineFilterVintage className="w-6 h-6 custom--svg" />,
    },
  ];

  return (
    <aside
      id="sidebar"
      className={`fixed z-20 h-full top-0 left-0 pt-16 flex flex-shrink-0 flex-col transition-width duration-150 ease-in-out
      ${isMenuOpen ? "w-64" : "w-0"}`}
      aria-label="Sidebar"
    >
      <div className="custom--bg relative flex-1 flex flex-col min-h-0 border-r pt-0">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="custom--bg flex-1 px-3 divide-y space-y-1">
            <div className="space-y-2 pb-2">
              {menu.map((item: any, index: any) => (
                <Link
                  key={index}
                  to={item.href}
                  className={`custom--link rounded-lg flex items-center p-2 ${
                    activeLink === item.href &&
                    "text-gray-900 bg-gray-200 dark:bg-gray-600 dark:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
            <div className="space-y-2 pt-2">
              {menuHardLink.map((item: any, index: any) => (
                <Link
                  key={index}
                  to={item.href}
                  className={`custom--link rounded-lg flex items-center p-2 ${
                    activeLink === item.href &&
                    "text-gray-900 bg-gray-200 dark:bg-gray-600 dark:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    {item.title}
                  </span>
                </Link>
              ))}
              <button
                onClick={() => [signOut(), navigate("/")]}
                className="custom--link rounded-lg flex items-center p-2 text-left w-full"
              >
                <MdLogout className="w-6 h-6 custom--svg" />
                <span className="ml-3 flex-1 whitespace-nowrap">Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

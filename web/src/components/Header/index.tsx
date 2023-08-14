import Tooltip from "../Tooltip";
import Dropdown from "../Dropdown";
import DarkMode from "../DarkMode";
import Fullscreen from "../Fullscreen";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import SearchButton from "../SearchButton";
import { MdMenu, MdSearch } from "react-icons/md";

const Header = ({ handleMenuToggle }: any) => {
  return (
    <nav className="bg-white dark:bg-gray-800 dark:border-gray-700 border-b border-gray-200 dark:border-gray-700  fixed z-30 w-full">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              onClick={handleMenuToggle}
              className="mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
            >
              <MdMenu className="w-6 h-6" />
            </button>
            <Link
              to="/home"
              className="text-xl font-bold flex items-center lg:ml-2.5"
            >
              <img src={Logo} className="h-6 mr-2" alt="Company Logo" />
              <span className="self-center whitespace-nowrap dark:text-gray-200">
                Dashboard
              </span>
            </Link>
            <form action="#" method="GET" className="hidden lg:block lg:pl-32">
              <SearchButton placeholder="Search" />
            </form>
          </div>
          <div className="flex items-center">
            <button
              id="toggleSidebarMobileSearch"
              type="button"
              className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
            >
              <span className="sr-only">Search</span>
              <MdSearch className="w-6 h-6" />
            </button>
            <Tooltip tooltip="Toggle Fullscreen" direction="bottom">
              <Fullscreen />
            </Tooltip>
            <Tooltip tooltip="Toggle dark mode" direction="bottom">
              <DarkMode />
            </Tooltip>
            <Dropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="hidden lg:flex">
      <div className="relative">
        <button
          className="flex flex-row items-center w-full custom--btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src="https://placekitten.com/30/30"
            className="rounded-full mr-1 w-30 h-30"
          />
          <span className="dark:text-gray-200">User</span>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform dark:text-gray-200 ${
              isOpen && "rotate-180"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        {isOpen && (
          <div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
            <div className="px-2 py-2 rounded-md shadow custom--bg">
              <Link
                to="/profile"
                className="block px-4 py-2 mt-2 custom--link rounded-lg"
              >
                Profile
              </Link>
              <button
                onClick={() => [signOut(), navigate("/")]}
                className="custom--link block px-4 py-2 mt-2 custom--link rounded-lg text-left w-full"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;

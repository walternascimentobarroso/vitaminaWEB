import { Link } from "react-router-dom";

const Breadcrumb = ({ links }: any) => {
  return (
    <nav
      className="bg-white text-gray-700 dark:bg-gray-800 flex shadow py-3 px-5 rounded-lg mb-4"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {links.map((link: any, index: any) => (
          <li className="flex items-center" key={index}>
            {index != 0 && (
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
            {index !== links.length - 1 ? (
              <Link
                className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium dark:text-gray-200 dark:hover:text-white"
                to={link.href}
              >
                {link.label}
              </Link>
            ) : (
              <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium dark:text-gray-500">
                {link.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

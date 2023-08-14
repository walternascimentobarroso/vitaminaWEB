import { MdSearch } from "react-icons/md";

export default ({ placeholder = "", onChange = () => {} }: any) => {
  return (
    <>
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MdSearch className="w-5 h-5 text-gray-500" />
        </div>
        <input
          type="text"
          id="table-search"
          className="block p-2 pl-10 text-sm text-gray-900 
          border border-gray-300 rounded-lg w-80 bg-gray-50 
          focus:ring-blue-500 focus:border-blue-500 
          focus:ring-cyan-600 focus:border-cyan-600
          dark:bg-gray-700 dark:border-gray-600 
          dark:placeholder-gray-400 dark:text-white 
          dark:focus:ring-blue-500 dark:focus:border-blue-500
          w-full pl-10 p-2.5"
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </>
  );
};

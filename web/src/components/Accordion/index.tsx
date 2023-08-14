import { MdExpandMore } from "react-icons/md";

export default ({ title, children }: any) => {
  return (
    <details className="group py-5">
      <summary className="dark:text-white flex justify-between items-center font-medium cursor-pointer list-none">
        <span>{title}</span>
        <span className="transition group-open:rotate-180">
          <MdExpandMore className="w-6 h-6" />
        </span>
      </summary>
      <p className="text-neutral-600 dark:text-gray-500 mt-3 group-open:animate-fadeIn">
        {children}
      </p>
    </details>
  );
};

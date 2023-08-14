import { MdClose, MdOutlineDangerous } from "react-icons/md";

export default ({ type, message, onClick }: any) => {
  return (
    <div
      className="flex justify-between items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
      role="alert"
    >
      <strong className="font-bold pr-2">
        <MdOutlineDangerous className="h-8 w-8 text-red-500" />
      </strong>
      <span className="block sm:inline">{message}</span>
      <button onClick={onClick}>
        <MdClose className="h-6 w-6 text-red-500" />
      </button>
    </div>
  );
};

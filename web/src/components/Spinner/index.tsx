export default () => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center z-50`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 z-30}`}
      ></div>
      <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-blue-100 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-100 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-100 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

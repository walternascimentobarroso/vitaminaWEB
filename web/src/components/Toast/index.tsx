import React, { useCallback, useEffect } from "react";

interface ToastItem {
  id: number;
  title: string;
  description: string;
  type?: "danger" | "warning" | "success" | "info";
}

interface ToastProps {
  toasties: ToastItem[];
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  setList: any;
}

const Toast: React.FC<ToastProps> = ({ toasties, position, setList }) => {
  const deleteToast = useCallback(
    (id: number) =>
      setList((prevList: any) => prevList.filter((e: any) => e.id !== id)),
    [setList]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (toasties.length) {
        deleteToast(toasties[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [toasties, deleteToast]);

  const type = (type: any) => {
    switch (type) {
      case "danger":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "success":
        return "bg-green-500";
      case "info":
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div
      className={`fixed z-30 
                ${position === "top-right" && "top-4 right-4"}
                ${position === "top-left" && "top-4 left-4"}
                ${position === "bottom-right" && "bottom-4 right-4"}
                ${position === "bottom-left" && "bottom-4 left-4"}
                `}
    >
      {toasties.map((toast, i) => (
        <div
          key={i}
          className={`mb-4 rounded-md shadow-md text-black opacity-90 transition duration-300 hover:shadow-lg 
          ${type(toast.type)}`}
        >
          <button
            className={`float-right bg-transparent border-none text-white opacity-80 cursor-pointer p-2`}
            onClick={() => deleteToast(toast.id)}
          >
            X
          </button>
          <div className="flex items-center p-2">
            <p className="font-semibold text-lg">{toast.title}</p>
          </div>
          <div className="p-2">
            <p className="text-sm">{toast.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;

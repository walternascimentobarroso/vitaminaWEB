import { useEffect, useState } from "react";
import { MdBrightness3, MdSunny } from "react-icons/md";

export default () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode: any = localStorage.getItem("darkMode");
    return savedMode !== null
      ? JSON.parse(savedMode)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    window.onload = () => {
      if (darkMode) document.documentElement.classList.toggle("dark");
    };
  }, []);

  const changeDarkMode = () => {
    const savedMode = document.documentElement.classList.toggle("dark");
    setDarkMode(savedMode);
    localStorage.setItem("darkMode", JSON.stringify(savedMode));
  };

  return (
    <button
      type="button"
      aria-label="Color Mode"
      onClick={changeDarkMode}
      className="flex justify-center custom--btn"
    >
      {darkMode ? (
        <MdSunny className="w-5 h-5" />
      ) : (
        <MdBrightness3 className="w-5 h-5" />
      )}
    </button>
  );
};

import { useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

export default () => {
  const [fullscreen, setFullscreen] = useState(
    Boolean(localStorage.getItem("fullscreen"))
  );

  function handleFullscreenClick() {
    if (fullscreen) {
      document.exitFullscreen();
      localStorage.removeItem("fullscreen");
    } else {
      document.documentElement.requestFullscreen();
      localStorage.setItem("fullscreen", "true");
    }
    setFullscreen(!fullscreen);
  }

  return (
    <div>
      <button
        onClick={handleFullscreenClick}
        className="flex justify-center custom--btn"
      >
        {fullscreen ? (
          <MdFullscreenExit className="w-6 h-6" />
        ) : (
          <MdFullscreen className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

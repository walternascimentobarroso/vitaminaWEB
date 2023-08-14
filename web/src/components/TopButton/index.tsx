import { useEffect, useState } from "react";
import { MdOutlineNorth } from "react-icons/md";

const TopButton: any = ({ passRef }: any) => {
  const [show, setShow] = useState(false);

  const checkScroll = () =>
    passRef.current && setShow(passRef.current.scrollTop > 0);

  useEffect(() => {
    passRef.current && passRef.current.addEventListener("scroll", checkScroll);
  }, [passRef]);

  const scrollToTop = () => {
    passRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {show && (
        <button
          onClick={() => scrollToTop()}
          className="fixed bottom-4 right-4 z-50 p-2 rounded-full 
          custom--bg hover:bg-gray-200 dark:hover:bg-gray-600 shadow animate-bounce"
        >
          <MdOutlineNorth className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default TopButton;

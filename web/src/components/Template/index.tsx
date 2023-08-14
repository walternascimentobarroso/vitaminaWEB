import { useRef, useState } from "react";

import Header from "../Header";
import Footer from "../Footer";
import AsideMenu from "../AsideMenu";
import TopButton from "../TopButton";

const Template = ({ children }: any) => {
  const contentRef: any = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(() => {
    const menuOpen = localStorage.getItem("isMenuOpen");
    return menuOpen ? JSON.parse(menuOpen) : false;
  });

  const handleMenuToggle = () => {
    const savedMode = !isMenuOpen;
    setIsMenuOpen(savedMode);
    localStorage.setItem("isMenuOpen", JSON.stringify(savedMode));
  };
  return (
    <>
      <Header handleMenuToggle={handleMenuToggle} />
      <div className="flex overflow-hidden bg-white dark:bg-gray-700 pt-16">
        <AsideMenu isMenuOpen={isMenuOpen} />
        <div
          className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
          id="sidebarBackdrop"
        ></div>
        <div
          className={`w-full bg-gray-50 dark:bg-gray-700 relative overflow-y-auto
          flex flex-col h-[calc(100vh-74px)] transition-width duration-700 ease-in-out
          ${isMenuOpen && "lg:ml-64"}`}
          ref={contentRef}
        >
          <main className="flex-grow">
            <div className="pt-6 px-4">
              <div className="w-full grid grid-cols-1">{children}</div>
              <TopButton passRef={contentRef} />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Template;

import { useState } from "react";
import QuickSwapLogo from "../QuickSwapLogo";
import NavButtons from "./NavButtons";
import NavDrawer from "./NavDrawer";

function Navbar(props) {
  const [isNavDrawerShown, setIsNavDrawerShown] = useState(false);

  const toggleNavDrawerShown = () => {
    setIsNavDrawerShown((prev) => !prev);
  };

  return (
    <nav className="z-50 h-16 shadow-md shadow-gray-900/20 fixed top-0 flex justify-between items-center bg-gray-50 w-full">
      <QuickSwapLogo />
      {isNavDrawerShown && (
        <NavDrawer closeNavDrawer={toggleNavDrawerShown} {...props} />
      )}
      {!isNavDrawerShown && (
        <NavButtons openNavDrawer={toggleNavDrawerShown} {...props} />
      )}
    </nav>
  );
}

export default Navbar;

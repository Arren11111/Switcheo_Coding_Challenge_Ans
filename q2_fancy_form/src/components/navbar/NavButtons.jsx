import { RxHamburgerMenu } from "react-icons/rx";
import NavButton from "./NavButton";

function NavButtons({ pages, handleNavClick, openNavDrawer }) {
  return (
    <>
      <div className="h-full justify-center items-center hidden md:flex">
        {pages.map((page) => (
          <NavButton title={page} key={page} handleNavClick={handleNavClick} />
        ))}
      </div>
      <button
        onClick={openNavDrawer}
        className="md:hidden h-full text-lg px-8 py-2 hover:bg-gray-400/20 hover:font-semibold active:bg-gray-600/50 transition duration-00 ease-in"
      >
        <RxHamburgerMenu />
      </button>
    </>
  );
}

export default NavButtons;

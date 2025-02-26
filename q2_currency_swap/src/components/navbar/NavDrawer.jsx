import QuickSwapLogo from "../QuickSwapLogo";
import NavDrawerButton from "./NavDrawerButton";

function NavDrawer({ pages, handleNavClick, closeNavDrawer }) {
  return (
    <div
      onClick={closeNavDrawer}
      className="absolute top-0 w-screen h-screen bg-zinc-950/90"
    >
      <div className="absolute top-0 left-0 w-1/4 max-w-60 h-screen bg-zinc-950 flex flex-col items-center">
        <div className="hidden md:block py-8 text-zinc-300">
          <QuickSwapLogo />
        </div>
        {pages.map((page) => (
          <NavDrawerButton
            title={page}
            handleNavClick={handleNavClick}
            key={page}
          />
        ))}
      </div>
    </div>
  );
}

export default NavDrawer;

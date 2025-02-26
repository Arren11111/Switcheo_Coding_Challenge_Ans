function NavDrawerButton({ title, handleNavClick }) {
  const handleClick = () => {
    handleNavClick(title);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-lg text-zinc-400 px-4 py-8 hover:bg-zinc-400/20 hover:text-zinc-300 hover:font-semibold active:bg-gray-600/50 transition duration-200 ease-in"
    >
      {title}
    </button>
  );
}

export default NavDrawerButton;

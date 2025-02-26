function NavButton({ title, handleNavClick }) {
  const handleClick = () => {
    handleNavClick(title);
  };
  return (
    <button
      onClick={handleClick}
      className="h-full text-lg px-8 py-2 hover:bg-gray-400/20 hover:font-semibold active:bg-gray-600/50 transition duration-00 ease-in"
    >
      {title}
    </button>
  );
}

export default NavButton;

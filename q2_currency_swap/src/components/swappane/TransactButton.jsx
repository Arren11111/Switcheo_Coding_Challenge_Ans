function TransactButton({ handleClick, title }) {
  return (
    <button
      onClick={handleClick}
      type="button"
      className="block appearance-none focus:outline-none text-lg text-zinc-100 bg-zinc-600 p-4 rounded-3xl mx-auto my-8 hover:bg-zinc-500 active:bg-zinc-700 active:text-zinc-200 transition duration-150"
    >
      {title}
    </button>
  );
}

export default TransactButton;

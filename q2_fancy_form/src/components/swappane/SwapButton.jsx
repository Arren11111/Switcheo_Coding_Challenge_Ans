import { MdOutlineSwapCalls } from "react-icons/md";

function SwapButton({ handleSwap }) {
  return (
    <button
      type="button"
      className="absolute left-1/2 top-1/2 -translate-1/2 bg-zinc-100 border-1 border-zinc-300 p-4 rounded-full text-3xl focus:outline-none hover:bg-zinc-300 active:bg-zinc-400 transition duration-150"
      onClick={handleSwap}
    >
      <MdOutlineSwapCalls />
    </button>
  );
}

export default SwapButton;

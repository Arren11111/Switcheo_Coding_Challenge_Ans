import { useState } from "react";
import { toast } from "react-toastify";
import TransactButton from "./TransactButton";
import TransactionProcessingScreen from "./TransactionProcessingScreen";
import TransactionSummary from "./TransactionSummary";

function TransactOverlay({ ref, resetForm, ...props }) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = () => {
    setWalletConnected(true);
  };
  const confirmTransaction = () => {
    // Show loading overlay
    setIsLoading(true);

    setTimeout(() => {
      resetForm();
      setWalletConnected(false);
      setIsLoading(false);
      ref.current.close();

      toast.success("Transaction successfully processed!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }, 3000);
  };

  const handleClick = () => {
    walletConnected ? confirmTransaction() : connectWallet();
  };
  return (
    <dialog
      ref={ref}
      className="focus:outline-none mx-auto my-auto w-lg h-4/5 rounded-4xl bg-zinc-900/90 backdrop-blur-md shadow-xl shadow-zinc-700"
    >
      {isLoading && <TransactionProcessingScreen />}

      <h2 className="text-3xl text-zinc-300 w-full text-center my-8">
        Confirm Details
      </h2>
      {walletConnected && <TransactionSummary {...props} />}
      <TransactButton
        handleClick={handleClick}
        title={walletConnected ? "Confirm Transaction" : "Connect Wallet"}
      />
    </dialog>
  );
}

export default TransactOverlay;

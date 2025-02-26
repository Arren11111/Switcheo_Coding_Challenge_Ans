function TransactionProcessingScreen() {
  return (
    /* With the help of Github Copilot */
    <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm flex flex-col justify-center items-center rounded-4xl z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zinc-500 mb-4"></div>
      <p className="text-xl text-zinc-400">Processing Transaction...</p>
    </div>
  );
}

export default TransactionProcessingScreen;

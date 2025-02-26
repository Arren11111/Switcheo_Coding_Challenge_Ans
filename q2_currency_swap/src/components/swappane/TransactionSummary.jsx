function TransactionSummary({
  buyAmount,
  sellAmount,
  buyCurrency,
  sellCurrency,
}) {
  return (
    <div className="mt-8">
      <p className="text-xl text-zinc-400 w-full my-8 px-8">
        Tokens Sold: {sellAmount} {sellCurrency.name}
      </p>
      <p className="text-xl text-zinc-400 w-full my-8 px-8">
        Tokens Bought: {buyAmount} {buyCurrency.name}
      </p>
    </div>
  );
}

export default TransactionSummary;

import { useRef, useState } from "react";
import exchangeRates from "../../util/ExchangeRates.json";
import SwapButton from "./SwapButton";
import TransactButton from "./TransactButton";
import TransactionCard from "./TransactionCard";
import TransactOverlay from "./TransactOverlay";

function SwapPane() {
  //Note sellAmount and buyAmount are in USD and stored as strings
  const [sellAmount, setSellAmount] = useState("");
  const [sellCurrency, setSellCurrency] = useState({
    name: undefined,
    price: undefined,
  });
  const [buyAmount, setBuyAmount] = useState("");
  const [buyCurrency, setBuyCurrency] = useState({
    name: undefined,
    price: undefined,
  });
  const modal = useRef();

  // Handling the amount and currency changes

  const handleSellAmountChange = (event) => {
    const newSellAmount = event.target.value;
    setSellAmount(newSellAmount);
    if (Number(newSellAmount) && sellCurrency.price && buyCurrency.price) {
      const newBuyAmount =
        (Number(newSellAmount) * sellCurrency.price) / buyCurrency.price;
      setBuyAmount(newBuyAmount.toFixed(7));
    } else {
      setBuyAmount("");
    }
  };

  const handleBuyAmountChange = (event) => {
    const newBuyAmount = event.target.value;
    setBuyAmount(newBuyAmount);
    if (Number(newBuyAmount) && buyCurrency.price && sellCurrency.price) {
      const newSellAmount =
        (Number(newBuyAmount) * buyCurrency.price) / sellCurrency.price;
      setSellAmount(newSellAmount.toFixed(7));
    } else {
      setSellAmount("");
    }
  };

  const handleSellCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    const newPrice = exchangeRates.find(
      (entry) => entry.currency === newCurrency
    )?.price;

    setSellCurrency({
      name: newCurrency,
      price: newPrice ? Number(newPrice.toFixed(7)) : undefined,
    });

    // Recalculate buy amount if we have all values
    if (sellAmount && newPrice && buyCurrency.price) {
      const newBuyAmount =
        (Number(sellAmount) * Number(newPrice)) / buyCurrency.price;
      setBuyAmount(newBuyAmount.toFixed(7));
    }
  };

  const handleBuyCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    const newPrice = exchangeRates.find(
      (entry) => entry.currency === newCurrency
    )?.price;

    setBuyCurrency({
      name: newCurrency,
      price: newPrice ? Number(newPrice.toFixed(7)) : undefined,
    });

    // Recalculate sell amount if we have all values
    if (buyAmount && newPrice && sellCurrency.price) {
      const newSellAmount =
        (Number(buyAmount) * Number(newPrice)) / sellCurrency.price;
      setSellAmount(newSellAmount.toFixed(7));
    }
  };

  const handleSwap = () => {
    let tmp = sellAmount;
    setSellAmount(buyAmount);
    setBuyAmount(tmp);
    tmp = sellCurrency;
    setSellCurrency(buyCurrency);
    setBuyCurrency(tmp);
  };

  // Handling the transaction modal
  const showModal = () => modal.current.showModal();

  const resetForm = () => {
    setSellAmount("");
    setSellCurrency({
      name: undefined,
      price: undefined,
    });
    setBuyAmount("");
    setBuyCurrency({
      name: undefined,
      price: undefined,
    });
  };

  return (
    <form className="my-32 max-w-xl mx-auto px-8">
      <h2 className="text-4xl text-zinc-800 my-8">Crypto Exchange</h2>
      <section className="relative">
        <TransactionCard
          amount={sellAmount}
          currency={sellCurrency}
          handleAmountChange={handleSellAmountChange}
          handleCurrencyChange={handleSellCurrencyChange}
          title="Sell"
        />
        <SwapButton handleSwap={handleSwap} />
        <TransactionCard
          amount={buyAmount}
          currency={buyCurrency}
          handleAmountChange={handleBuyAmountChange}
          handleCurrencyChange={handleBuyCurrencyChange}
          title="Buy"
        />
      </section>
      <TransactButton
        handleClick={showModal}
        title={"Complete your transaction"}
      />
      <TransactOverlay
        ref={modal}
        resetForm={resetForm}
        buyAmount={buyAmount}
        buyCurrency={buyCurrency}
        sellAmount={sellAmount}
        sellCurrency={sellCurrency}
      />
    </form>
  );
}

export default SwapPane;

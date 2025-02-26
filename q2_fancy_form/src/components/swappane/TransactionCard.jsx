import exchangeRates from "../../util/ExchangeRates.json";

function TransactionCard({
  title,
  amount,
  currency,
  handleAmountChange,
  handleCurrencyChange,
}) {
  return (
    <div className="min-w-sm border-1 border-zinc-500/30 rounded-3xl flex flex-col justify-center gap-4 px-4 py-4">
      <label htmlFor={`${title}Amount`}>
        <h3 className="text-zinc-900 text-lg">{title}</h3>
      </label>
      <div className="flex justify-between -my-2">
        <input
          type="text"
          id={`${title}Amount`}
          name={`${title}Amount`}
          value={amount}
          onChange={handleAmountChange}
          className="text-4xl appearance-none focus:outline-none w-1/2"
        ></input>
        <div className="flex items-center">
          {currency.name && (
            <img
              src={
                exchangeRates.find((rate) => rate.currency === currency.name)
                  ?.icon
              }
              alt={currency.name}
              className="w-8 h-8 mr-1"
            />
          )}
          <select
            id={`${title}Currency`}
            name={`${title}Currency`}
            value={currency.name || ""}
            onChange={handleCurrencyChange}
            className="bg-zinc-100 rounded-lg p-2 focus:outline-none"
          >
            <option value="">Select</option>
            {exchangeRates.map((rate) => (
              <option key={rate.currency} value={rate.currency}>
                {rate.currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-sm text-zinc-900">1 token : USD {currency.price}</p>
    </div>
  );
}

export default TransactionCard;

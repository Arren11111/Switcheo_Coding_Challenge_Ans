import exchangeRate from "../util/ExchangeRates.json";
import TokenTab from "./TokenTab";
function Tokens() {
  return (
    <section className="w-2/3 min-w-sm mx-auto my-10">
      <h2 className="text-4xl text-zinc-800 my-12 text-center">
        Check Out Our Diverse Selection of Tokens
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {exchangeRate.map((entry) => (
          <TokenTab
            icon={entry.icon}
            title={entry.currency}
            key={entry.currency}
          />
        ))}
      </div>
    </section>
  );
}

export default Tokens;

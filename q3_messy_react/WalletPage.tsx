import React, { useEffect, useMemo, useState } from "react";

interface WalletBalance {
  blockchain: string; //changed currency to blockchain
  amount: number;
}
interface FormattedWalletBalance {
  blockchain: string; //changed currency to blockchain
  amount: number;
  formatted: string;
}

interface WalletRowProps {
  className: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
  blockchain: string;
}

interface Props {
  children?: React.ReactNode;
}

class Datasource {
  // TODO: Implement datasource class
  constructor(private url: string) {}

  async getPrices(): Promise<Record<string, number>> {
    const response = await fetch(this.url);
    return response.json();
  }
}

function useWalletBalances(): WalletBalance[] {
  const balances: WalletBalance[] = [
    { blockchain: "Ethereum", amount: 0.5 },
    { blockchain: "Osmosis", amount: 10.23 },
    { blockchain: "Arbitrum", amount: 1.1 },
    { blockchain: "Zilliqa", amount: 2000 },
    { blockchain: "Neo", amount: 15.2 },
    { blockchain: "Bitcoin", amount: 0.01 },
    { blockchain: "Solana", amount: 5 },
    { blockchain: "Cardano", amount: 100 },
    { blockchain: "Avalanche", amount: 0 }, // Zero balance (to be filtered out)
    { blockchain: "Polkadot", amount: -0.1 }, // Negative balance (to be filtered out)
  ];

  //In the real app we would use useState and useEffect to fetch and store the data
  return balances;
}

//Sample styles for the classes variable
const classes = {
  row: "flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50",
  amount: "font-medium text-gray-900",
  blockchain: "text-sm text-gray-500",
  usdValue: "text-right text-gray-700",
  formatted: "text-sm text-gray-500 italic",
};

const WalletRow: React.FC<WalletRowProps> = ({
  className,
  amount,
  usdValue,
  formattedAmount,
  blockchain,
}) => {
  return (
    <div className={className}>
      <div>
        <div className={classes.amount}>{amount}</div>
        <div className={classes.blockchain}>{blockchain}</div>
      </div>
      <div>
        <div className={classes.usdValue}>${usdValue.toFixed(2)}</div>
        <div className={classes.formatted}>{formattedAmount}</div>
      </div>
    </div>
  );
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const datasource = new Datasource(
      "https://interview.switcheo.com/prices.json"
    );
    datasource
      .getPrices()
      .then((prices) => {
        setPrices(prices);
      })
      .catch((error) => {
        console.error(error); //changed console.err to console.error
      });
  }, []);

  const getPriority = (
    blockchain: "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo" | string //better type safety
  ): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (balancePriority > -99 && balance.amount > 0) {
          //lhsPriority is undefined, should be balancePriority. should return true for positive balances instead of negative and 0 balances
          return true;
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        } else {
          return 0;
        }
      });
  }, [balances]); //prices should not trigger a re-render

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  //use formattedBalances instead of sortedBalances
  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.blockchain] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={`${balance.blockchain}-${balance.amount}`} //Changed key to use blockchain and amount for more unique combinations
          amount={balance.amount}
          blockchain={balance.blockchain} //Makes sense to display which blockchain the balance is for
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};

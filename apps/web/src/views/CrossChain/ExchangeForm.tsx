import React, { useState } from 'react';

interface ExchangeFormProps {
  fromCurrency: string;
  currencyList: any[];
  onCurrencyPairSelected: (pair: any) => void;
}

const ExchangeForm: React.FC<ExchangeFormProps> = ({ fromCurrency, currencyList, onCurrencyPairSelected }) => {
  const [toCurrency, setToCurrency] = useState<string>(''); // You can add more state variables as needed
  const [amount, setAmount] = useState<number>(0);

  const handleCurrencyPairSelected = () => {
    const selectedPair = { fromCurrency, toCurrency, amount };
    onCurrencyPairSelected(selectedPair);
  };

  return (
    <div>
      <h3>Exchange Form</h3>
      <label>
        To Currency:
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencyList.map((currency) => (
            <option key={currency.ticker} value={currency.ticker}>
              {currency.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </label>
      <br />
      <button onClick={handleCurrencyPairSelected}>Exchange</button>
    </div>
  );
};

export default ExchangeForm;
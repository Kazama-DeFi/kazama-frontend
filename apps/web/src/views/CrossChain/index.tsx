import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useModal } from '@kazamaswap/uikit';
import Container from 'components/Layout/Container';
import Page from 'components/Layout/Page';
import CurrencyList from './CurrencyList';
import FromChart from './FromChart';
import ToChart from './ToChart';


const CurrencyContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #191e2d;
  border-radius: 0.25rem;
  padding: 20px;
`;

const ChartContainer = styled.div`
  flex: 1;
  /* Add styles for the left div here */
`;

const SwapContainer = styled.div`
  flex: 1;
  /* Add styles for the right div here */
`;

const TradeBox = styled.div`
  background: #191e2d;
  border-radius: 0.25rem;
  padding: 10px;
  text-align: center;
  max-width: 500px;
`

const CurrencyPickBox = styled.div`
  background: #21252b;
  border: 1px solid #21252b;
  border-radius: 0.25rem;
  display: flex;
  padding: 10px;
`;

const FromInput = styled.div`
  flex-direction: row;
`

const CurrencyBox = styled.div`
  flex-direction: row;
`

const CrossChain = () => {
  const [selectedFrom, setSelectedFrom] = useState<any | null>(null);
  const [selectedTo, setSelectedTo] = useState<any | null>(null);
  const [minExchangeAmount, setMinExchangeAmount] = useState<number | null>(null);
  const [exchangeAmount, setExchangeAmount] = useState<number | null>(null);
  const [estimatedAmount, setEstimatedAmount] = useState<number | null>(null);
  const [transactionSpeedForecast, setTransactionSpeedForecast] = useState<string | null>(null);
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [refundAddress, setRefundAddress] = useState('');
  const [extraId, setExtraId] = useState('');
  const [refundExtraId, setRefundExtraId] = useState('');
  const [depositAddress, setDepositAddress] = useState<string | null>(null);
  const [priceData, setPriceData] = useState([]);

  // Define the function for selecting "From" currency
  const handleSelectFrom = (currency: any) => {
    setSelectedFrom(currency);
  };

  // Define the function for selecting "To" currency
  const handleSelectTo = (currency: any) => {
    setSelectedTo(currency);
  };

  const handleConfirmationChange = () => {
    setConfirmationChecked(!confirmationChecked);
  };

  const handleWalletAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(event.target.value);
  };

  const handleCheckboxChange = () => {
    setConfirmationChecked((prevChecked) => !prevChecked);
  };

  // Use useModal with the defined functions
  const [selectFrom] = useModal(<CurrencyList onDone={handleSelectFrom} />);
  const [selectTo] = useModal(<CurrencyList onDone={handleSelectTo} />);

  // Set default values if not selected
  if (!selectedFrom) {
    setSelectedFrom({
      ticker: 'btc',
      name: 'Bitcoin',
      image: 'https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg',
    });
  }

  if (!selectedTo) {
    setSelectedTo({
      ticker: 'xmr',
      name: 'Monero',
      image: 'https://content-api.changenow.io/uploads/xmr_f7131e8067.svg',
    });
  }

  useEffect(() => {
    // Fetch minimum exchange amount when both currencies are selected
    if (selectedFrom && selectedTo) {
      fetchMinExchangeAmount(selectedFrom.ticker, selectedTo.ticker);
    }
  }, [selectedFrom, selectedTo]);

  useEffect(() => {
    console.log("Fetching estimated exchange amount...");
    if (exchangeAmount !== null && selectedFrom && selectedTo) {
      console.log("Parameters:", exchangeAmount, selectedFrom.ticker, selectedTo.ticker);
      fetchEstimatedExchangeAmount(exchangeAmount, selectedFrom.ticker, selectedTo.ticker);
    } else {
      console.log("Resetting estimated values...");
      setEstimatedAmount(null);
      setTransactionSpeedForecast(null);
    }
  }, [exchangeAmount, selectedFrom, selectedTo]);

  const fetchMinExchangeAmount = async (fromTicker: string, toTicker: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_KAZAMA_CHANGENOW_KEY; // Replace with your actual API key
      const response = await fetch(
        `https://api.changenow.io/v1/min-amount/${fromTicker}_${toTicker}?api_key=${apiKey}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch minimum exchange amount. Status: ${response.status}`);
      }

      const data = await response.json();
      setMinExchangeAmount(data.minAmount);
    } catch (error) {
      console.error('Error fetching minimum exchange amount:', error);
    }
  };

  // Handle exchange amount input change
  const handleExchangeAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = parseFloat(value);

    // Check if the numeric value is valid (not NaN)
    if (!isNaN(numericValue)) {
      setExchangeAmount(numericValue);
    } else {
      // Handle invalid input (e.g., clear the input)
      setExchangeAmount(null);
    }
  };

  const fetchEstimatedExchangeAmount = async (sendAmount: number, fromTicker: string, toTicker: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_KAZAMA_CHANGENOW_KEY; // Replace with your actual API key
      const response = await fetch(
        `https://api.changenow.io/v1/exchange-amount/${sendAmount}/${fromTicker}_${toTicker}?api_key=${apiKey}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch estimated exchange amount. Status: ${response.status}`);
      }

      const data = await response.json();
      setEstimatedAmount(data.estimatedAmount);
      setTransactionSpeedForecast(data.transactionSpeedForecast);
    } catch (error) {
      console.error('Error fetching estimated exchange amount:', error);
    }
  };

  // Add this useEffect to fetch estimated exchange amount when exchangeAmount changes
  useEffect(() => {
    if (exchangeAmount !== null && selectedFrom && selectedTo) {
      fetchEstimatedExchangeAmount(exchangeAmount, selectedFrom.ticker, selectedTo.ticker);
    }
  }, [exchangeAmount, selectedFrom, selectedTo]);

  const handleCreateExchangeTransaction = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_KAZAMA_CHANGENOW_KEY; // Replace with your actual API key
      const fromCurrency = selectedFrom?.ticker || '';
      const toCurrency = selectedTo?.ticker || '';

      if (!fromCurrency || !toCurrency || !walletAddress || !exchangeAmount) {
        // Handle missing information
        console.error('Missing required information');
        return;
      }

      const requestBody = {
        from: fromCurrency,
        to: toCurrency,
        amount: exchangeAmount.toString(),
        address: walletAddress,
        extraId: extraId, // You can include the extra ID if needed
        refundAddress: refundAddress, // Include the refund address if needed
        refundExtraId: refundExtraId, // Include the refund extra ID if needed
        userId: '', // Include the user ID if needed
        payload: '', // Include the payload if needed
        contactEmail: '', // Include the contact email if needed
      };

      const response = await fetch(`https://api.changenow.io/v1/transactions/${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error creating exchange transaction:', errorData);
        // You can handle the error further or display a user-friendly message
        return;
      }

      const data = await response.json();

      // Extract necessary information from the response
      const { id, payinAddress, payoutAddress, payinExtraId, payoutExtraId } = data;

      setDepositAddress(data.payinAddress);

      // Use the extracted information as needed (e.g., store in state, display to the user)
      console.log('Exchange Transaction Details:', { id, payinAddress, payoutAddress, payinExtraId, payoutExtraId });
      
      // Proceed to the next step, if needed
    } catch (error) {
      console.error('Error creating exchange transaction:', error);
    }
  };

  return (
    <><Page style={{ marginTop: '64px', maxWidth: '1100px' }}>
      <CurrencyContainer style={{marginBottom: "10px"}}>
        <ChartContainer>
          {selectedFrom && (
            <FromChart ticker={selectedFrom.name.toLowerCase()} />
          )}
        </ChartContainer>
        <SwapContainer>
          <div style={{display: "flex", flexDirection: "column", background: "#21252b", borderRadius: "0.25rem"}}>
            <div style={{padding: "20px"}}>
              Select sending currency
            </div>
            <div style={{background: "#21252b", padding: "20px", margin: "15px", borderRadius: "0.25rem"}}>
            <img src={selectedFrom.image} alt={selectedTo.ticker} style={{ width: '30px', height: '30px' }} />
            </div>
            <div>
2
            </div>
          </div>
        </SwapContainer>
      </CurrencyContainer>

      <CurrencyContainer>
        <ChartContainer>
          {selectedTo && (
            <FromChart ticker={selectedTo.name.toLowerCase()} />
          )}
        </ChartContainer>
        <SwapContainer>
          3
        </SwapContainer>
      </CurrencyContainer>
    </Page>
    
    
    
    
    <Page style={{ marginTop: '64px' }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          background: "#191e2d",
          flexWrap: "wrap",
          alignContent: "center"
        }}>
          <div>
            1
          </div>
          <div>
            2
          </div>
        </div>
        <CurrencyContainer>
          <div style={{ flexDirection: "row" }}>
            <div>
              {selectedFrom && (
                <FromChart ticker={selectedFrom.name.toLowerCase()} />
              )}
            </div>
            <div>
              {selectedFrom && (
                <FromChart ticker={selectedTo.name.toLowerCase()} />
              )}
            </div>
          </div>
          {selectedFrom && (
            selectedFrom.name
          )}
          <div>

          </div>

          <TradeBox>
            {/* Box for selecting "From" currency */}
            <CurrencyPickBox>
              <FromInput>
                <CurrencyBox>
                  <div>
                    {/* <img src={selectedFrom.image} alt={selectedFrom.ticker} style={{ width: '30px', height: '30px' }} />  */}
                  </div>
                  <div>
                    {selectedFrom && (
                      <div onClick={selectFrom} style={{ cursor: 'pointer' }}>
                        <span>{selectedFrom.name}</span>
                      </div>
                    )}
                  </div>
                </CurrencyBox>
              </FromInput>

              {/* Input field for exchange amount */}
              <div>
                <input
                  type="number"
                  value={exchangeAmount !== null ? exchangeAmount : ''}
                  onChange={handleExchangeAmountChange}
                  step="any" />
              </div>
            </CurrencyPickBox>
            {/* Box for selecting "To" currency */}
            <CurrencyPickBox>
              <div>
                {selectedTo && (
                  <div onClick={selectTo} style={{ cursor: 'pointer' }}>
                    <img src={selectedTo.image} alt={selectedTo.ticker} style={{ width: '30px', height: '30px' }} />
                    <span>{selectedTo.name}</span>
                  </div>
                )}
              </div>
            </CurrencyPickBox>
            {/* Check if exchange amount is greater than or equal to the minimum exchange amount */}
            {exchangeAmount !== null && exchangeAmount < (minExchangeAmount || 0) && (
              <p style={{ color: 'red' }}>Exchange amount must be greater than or equal to the minimum exchange amount.</p>
            )}
            {/* Display estimated exchange amount */}
            {estimatedAmount !== null && (
              <div>
                <p>Estimated Exchange Amount: {estimatedAmount} {selectedTo?.ticker.toUpperCase()}</p>
                {transactionSpeedForecast && <p>Transaction Speed Forecast: {transactionSpeedForecast}</p>}
              </div>
            )}
            {/* Checkbox for confirmation */}
            <div>
              <input type="checkbox" checked={confirmationChecked} onChange={handleCheckboxChange} />
              <label htmlFor="confirmation">I confirm that I agree with the estimated exchange amount.</label>
            </div>
            {/* Wallet address input (conditionally rendered) */}
            {confirmationChecked && (
              <div>
                <label htmlFor="walletAddress">Wallet Address:</label>
                <input
                  type="text"
                  id="walletAddress"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)} />
              </div>
            )}
            {/* Refund address input */}
            {confirmationChecked && (
              <div>
                <label htmlFor="refundAddress">Enter Refund Address:</label>
                <input
                  type="text"
                  id="refundAddress"
                  value={refundAddress}
                  onChange={(e) => setRefundAddress(e.target.value)} />
              </div>
            )}
            {/* Extra ID input */}
            {confirmationChecked && (
              <div>
                <label htmlFor="extraId">Enter Extra ID:</label>
                <input
                  type="text"
                  id="extraId"
                  value={extraId}
                  onChange={(e) => setExtraId(e.target.value)} />
              </div>
            )}

            {/* Refund Extra ID input */}
            {confirmationChecked && (
              <div>
                <label htmlFor="refundExtraId">Enter Refund Extra ID:</label>
                <input
                  type="text"
                  id="refundExtraId"
                  value={refundExtraId}
                  onChange={(e) => setRefundExtraId(e.target.value)} />
              </div>
            )}

            {/* Button for the next step (e.g., create exchange transaction) */}
            <button disabled={!confirmationChecked} onClick={handleCreateExchangeTransaction}>Proceed</button>
            {/* Deposit address display */}
            {depositAddress && (
              <div>
                <p>Deposit Address: {depositAddress}</p>
              </div>
            )}
          </TradeBox>
        </CurrencyContainer>
        {/* Display minimum exchange amount */}
        {minExchangeAmount !== null && (
          <div>
            <p>Minimum Exchange Amount: {minExchangeAmount || 0} {selectedFrom?.ticker.toUpperCase()}</p>
          </div>
        )}
      </Page></>
    
  );
};

export default CrossChain;
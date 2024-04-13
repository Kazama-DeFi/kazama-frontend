import React, { useState, useEffect } from "react";
import { CurrencyModal, SearchIcon } from "@kazamaswap/uikit";
import styled from "styled-components";
import Page from "components/Layout/Page";
import { getCurrencyList } from "./lists/NotFixed";

const StyledModal = styled(CurrencyModal)`
  ${({ theme }) => theme.mediaQueries.md} {
    width: 80vw;
    max-width: 750px;
    max-height: 750px;
    border-radius: 0.25rem;
    background: #21252b;
    border-bottom: 2px solid #11141e;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 20px, rgba(255, 255, 255, 0.04) 0px 1px 0px inset, rgba(0, 0, 0, 0.25) 0px -4px 0px inset;
  }
`;

const CurrencyContainer = styled.div`
  max-height: 580px;
  overflow-y: auto;
  padding-right: 8px;
`;

const CurrencyBox = styled.div`
  background: #1a1e23;
  border: 1px solid #1a1e23;
  padding: 10px;
  border-radius: 0.25rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #2c3047; /* Change the background color on hover */
    color: #fff; /* Change the text color on hover */
  }
`;

const Searchbar = styled.div`
position: sticky;
top: 0;
background: #21252b;
display: flex;
z-index: 1;
padding: 8px;
`;

const SearchInput = styled.input`
background: #21252b;
border: 1px transparent;
`;

interface ListProps {
  onDismiss?: () => void;
  onDone?: (currency: any) => void;
}

interface Currency {
  image: string;
  ticker: string;
  name: string;
}

const CurrencyList: React.FC<React.PropsWithChildren<ListProps>> = ({
  onDismiss,
  onDone,
}) => {
  const [currencyList, setCurrencyList] = useState<any[]>([]);
  const [filteredCurrencyList, setFilteredCurrencyList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<any | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string>("All");

  const networks = [
    "All Networks",
    "Ethereum",
    "Smart Chain",
    "Arbitrum",
    "Tron Network",
    "Base Network",
  ];

  const customOrder = {
    btc: 1,
    eth: 2,
    bnbbsc: 3,
    sol: 4,
    xmr: 5,
    ltc: 6,
    ada: 7,
    dot: 8,
    pls: 9,
    op: 10,
    xrp: 11,
    etc: 12,
    usdterc20: 13,
    usdc: 14,
    avax: 15,
    link: 16,
    bch: 17,
    trx: 18,
    shib: 19,
    uni: 20,
    manta: 21,
    pepe: 22,
    jup: 23,
    fil: 24,
    "1inch": 25,
    matic: 26,
    ape: 27,
    crv: 28,
    cake: 29,
    dash: 30,
    floki: 31,
    ethw: 32,
    raysol: 34,
    hex: 35,
    atom: 36,
    imx: 37,
    near: 38,
    xlm: 39,
    zec: 40,
    arb: 41,
    mkr: 42,
    rune: 43,
    hntsol: 44,
    egld: 45,
    aave: 46,
    tusd: 47,
    ftmmainnet: 48,
    pyth: 49,
    eos: 50,
    kava: 51,
    akt: 52,
    grt: 53,
    apt: 54,
    icp: 55,
    ton: 56,
    bnbmainnet: 57,
    inj: 58,
    ksm: 59,
    doge: 60,
    dai: 61,
  };

  const handleNetworkChange = (selected: string) => {
    setSelectedNetwork(selected);

    // Update the filtered currency list based on the selected network
    if (selected === "All Networks") {
      setFilteredCurrencyList(currencyList);
    } else if (selected === "Ethereum") {
      const ethList = currencyList.filter(
        (currency) =>
          currency.ticker.toLowerCase().includes("erc20") ||
          currency.name.toLowerCase().includes("erc20")
      );
      setFilteredCurrencyList(ethList);
    } else if (selected === "Smart Chain") {
      const bscList = currencyList.filter(
        (currency) =>
          currency.ticker.toLowerCase().includes("bep20") ||
          currency.ticker.toLowerCase().includes("bsc") ||
          currency.name.toLowerCase().includes("bep20") ||
          currency.name.toLowerCase().includes("bsc")
      );
      setFilteredCurrencyList(bscList);
    } else if (selected === "Base Network") {
      const baseList = currencyList.filter(
        (currency) =>
          currency.ticker.toLowerCase().includes("base") ||
          currency.name.toLowerCase().includes("base")
      );
      setFilteredCurrencyList(baseList);
    } else if (selected === "Arbitrum") {
      const arbList = currencyList.filter(
        (currency) =>
          currency.ticker.toLowerCase().includes("arbitrum") ||
          currency.name.toLowerCase().includes("arbitrum")
      );
      setFilteredCurrencyList(arbList);
    } else if (selected === "Tron Network") {
      const tronList = currencyList.filter(
        (currency) =>
          currency.ticker.toLowerCase().includes("trc20") ||
          currency.ticker.toLowerCase().includes("trx") ||
          currency.name.toLowerCase().includes("trc20") ||
          currency.name.toLowerCase().includes("trx")
      );
      setFilteredCurrencyList(tronList);
    }
  };

  const topCurrencies: Currency[] = filteredCurrencyList
    .filter((currency) => customOrder[currency.ticker] !== undefined)
    .sort((a, b) => customOrder[a.ticker] - customOrder[b.ticker]);

  const remainingCurrencies: Currency[] = filteredCurrencyList.filter(
    (currency) => customOrder[currency.ticker] === undefined
  );

  useEffect(() => {
    const fetchCurrencyList = async () => {
      try {
        setLoading(true);
        const list = await getCurrencyList();
        setCurrencyList(list);
        setFilteredCurrencyList(list);
      } catch (error) {
        console.error("Error fetching currency list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencyList();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);

    const filteredList = currencyList.filter(
      (currency) =>
        currency.ticker.toLowerCase().includes(value.toLowerCase()) ||
        currency.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCurrencyList(filteredList);
  };

  const handleCurrencySelect = (currency: any) => {
    setSelectedCurrency(currency);
    onDone?.(currency); // Pass the selected currency to onDone callback
    onDismiss?.(); // Dismiss the modal after selecting a currency
  };

  return (
    <StyledModal title="Select currency" onDismiss={onDismiss}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div
            style={{
              position: "sticky",
              top: "-25px",
              borderRadius: "4px",
              border: "1px solid #1a1e23",
              marginBottom: "10px",
            }}
          >
            <Searchbar>
              <SearchIcon mr="7px" ml="7px" />
              <SearchInput
                type="text"
                placeholder="Search currencies ..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: "100%" }}
              />
            </Searchbar>
          </div>
          <CurrencyContainer>
            <div>
              {/* <label htmlFor="network">Select Network:</label>
      <select
        id="network"
        value={selectedNetwork}
        onChange={(e) => handleNetworkChange(e.target.value)}
      >
        {networks.map((network) => (
          <option key={network} value={network}>
            {network}
          </option>
        ))}
      </select> */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                  gap: "8px",
                }}
              >
                {/* Display the top currencies with the custom order */}
                {topCurrencies.map((currency) => (
                  <CurrencyBox
                    key={currency.ticker}
                    onClick={() => handleCurrencySelect(currency)}
                  >
                    <img
                      src={currency.image}
                      alt={currency.ticker}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginBottom: "10px",
                      }}
                    />
                    <br />
                    {currency.name}
                  </CurrencyBox>
                ))}

                {/* Display the remaining currencies */}
                {remainingCurrencies.map((currency) => (
                  <CurrencyBox
                    key={currency.ticker}
                    onClick={() => handleCurrencySelect(currency)}
                  >
                    <img
                      src={currency.image}
                      alt={currency.ticker}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginBottom: "10px",
                      }}
                    />
                    <br />
                    {currency.name}
                  </CurrencyBox>
                ))}
              </div>
            </div>
          </CurrencyContainer>
        </>
      )}
    </StyledModal>
  );
};

export default CurrencyList;
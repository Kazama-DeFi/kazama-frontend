import axios from "axios";
import styled from "styled-components";
import { NATIVE, WNATIVE } from '@kazamaswap/sdk'
import { ChainId } from '@kazamaswap/chains'
import { FetchStatus } from 'config/constants/types'
import { getFullDisplayBalance, formatBigIntToFixed } from '@kazamaswap/utils/formatBalance'
import { useEffect, useState, useRef } from "react";
import { Flex, Image, BscNetworkIcon, ChevronDownIcon, ChevronFilledIcon, Text, UpIcon } from "@kazamaswap/uikit";
import { getBalance } from "utils/apiRoutes";
import { useAccount, useBalance } from "wagmi";
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTokenBalance, { 
  useBSCUSDCBalance, 
  useBSCUSDTBalance, 
  useBSCBTCBalance,
  useBSCETHBalance,
  useBSCDAIBalance,
  useBSCAPEBalance,
  useBSCSHIBABalance
} from 'hooks/useTokenBalance'

const BalanceBox = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 5px;
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: inline-flex;
  height: 40px;
  padding-left: 8px;
  padding-right: 8px;
  position: relative;
  margin-right: 10px;

  &:hover {
    opacity: 0.65;
  }
`

const Dropdown = styled.div<{ isOpen: boolean }>`
position: absolute;
    width: 380px;
    z-index: 49999;
    right: -125px;
    top: 100%;
    margin-top: 11px;
    background: #21252b;
    border: 1px solid rgba(0, 0, 0, 0.35);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 8px -4px, rgba(0, 0, 0, 0.18) 0px 0px 20px 0px, rgba(0, 0, 0, 0.35) 0px 40px 34px -16px;
    border-radius: 0.25rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
`;

const TokenInfo = styled.div`
  display: flex;
  align-items: center;
`;

const TokenDetails = styled.div`
  margin-top: 10px;
`;

const BscNetwork = styled(BscNetworkIcon)`
width: 26px;
margin-right: 5px;
`;

const Container = styled.div`
  position: relative;
`;

const TokenContainerOdd = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px 8px 12px;
  background: #171c2a;
  height: 55px;
`;

const TokenContainerEven = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px 8px 12px;
  height: 55px;
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  width: 50px;
`;

const TokenInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px; /* Adjust margin as needed */
`;

const MarketChangesDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 10px; /* Adjust margin as needed */
`;

const BalanceDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const BalanceValueDiv = styled.div`
  margin-top: 3px; /* Adjust margin as needed */
  font-size: 13px;
`;

const DataContainer = styled.div`
max-height: 600px;
overflow: auto;
`

const StyledChevronClosed = styled(ChevronFilledIcon)`
  width: 12px;
  margin-left: 5px;
`

const StyledChevronOpen = styled(ChevronFilledIcon)`
  transform: rotate(180deg);
  width: 12px;
  margin-left: 5px;
`

const WalletBalance: React.FC = () => {

    // Set constants
    const { account, chainId, chain } = useActiveWeb3React()
    const wNativeToken = WNATIVE[chainId]
    const nativeBalance = useBalance({ address: account })
    const { balance: wNativeBalance } = useTokenBalance(wNativeToken?.address)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [tokenPrices, setTokenPrices] = useState<Record<string, { usd: number; usd_24h_change: number }>>({});
    const [previousTokenPrices, setPreviousTokenPrices] = useState<Record<string, { usd: number; usd_24h_change: number }>>({});
    type TokenPrices = Record<string, { usd: number; usd_24h_change: number }>;
  
    useEffect(() => {
      const fetchTokenPrices = async () => {
        try {
          const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,usd-coin,tether,bitcoin,ethereum,dai,apecoin,shiba-inu&vs_currencies=usd&include_24hr_change=true&include_price_change=true');
          const data = response.data;
    
          // Extract price values from nested objects
          const prices: Record<string, { usd: number; usd_24h_change: number }> = {};
          for (const token in data) {
            if (data.hasOwnProperty(token)) {
              prices[token] = data[token];
            }
          }
    
          setPreviousTokenPrices(tokenPrices);
          setTokenPrices(prices);
        } catch (error) {
          console.error('Error fetching token prices:', error);
        }
      };
    
      fetchTokenPrices();
    }, [isOpen]);
  
    const calculatePercentageChange = (currentPrice: number, previousPrice: number) => {
      return ((currentPrice - previousPrice) / previousPrice) * 100;
    };

    // Token balances BSC
    const { balance: usdcBscBalance } = useBSCUSDCBalance()
    const { balance: usdtBscBalance } = useBSCUSDTBalance()
    const { balance: btcBscBalance } = useBSCBTCBalance()
    const { balance: ethBscBalance } = useBSCETHBalance()
    const { balance: daiBscBalance } = useBSCDAIBalance()
    const { balance: apeBscBalance } = useBSCAPEBalance()
    const { balance: shibaBscBalance } = useBSCAPEBalance()

// Calculate total value including 24-hour price change
const totalValueWithChange =
  (Number(nativeBalance?.data?.value) * tokenPrices['binancecoin']?.usd || 0) +
  (Number(wNativeBalance) * tokenPrices['binancecoin']?.usd || 0) +
  (Number(usdcBscBalance) * tokenPrices['usd-coin']?.usd || 0) +
  (Number(usdtBscBalance) * tokenPrices['tether']?.usd || 0) +
  (Number(btcBscBalance) * tokenPrices['bitcoin']?.usd || 0) +
  (Number(ethBscBalance) * tokenPrices['ethereum']?.usd || 0) +
  (Number(daiBscBalance) * tokenPrices['dai']?.usd || 0) +
  (Number(shibaBscBalance) * tokenPrices['shiba-inu']?.usd || 0) +
  (Number(apeBscBalance) * tokenPrices['apecoin']?.usd || 0);

// Calculate total value change based on 24-hour price change
const totalValueChange =
  (Number(nativeBalance?.data?.value) * tokenPrices['binancecoin']?.usd_24h_change || 0) +
  (Number(wNativeBalance) * tokenPrices['binancecoin']?.usd_24h_change || 0) +
  (Number(usdcBscBalance) * tokenPrices['usd-coin']?.usd_24h_change || 0) +
  (Number(usdtBscBalance) * tokenPrices['tether']?.usd_24h_change || 0) +
  (Number(btcBscBalance) * tokenPrices['bitcoin']?.usd_24h_change || 0) +
  (Number(ethBscBalance) * tokenPrices['ethereum']?.usd_24h_change || 0) +
  (Number(daiBscBalance) * tokenPrices['dai']?.usd_24h_change || 0) +
  (Number(shibaBscBalance) * tokenPrices['shiba-inu']?.usd_24h_change || 0) +
  (Number(apeBscBalance) * tokenPrices['apecoin']?.usd_24h_change || 0);

  // Determine if the total value change is positive or negative
  const valueChangeSign = totalValueChange >= 0 ? '+' : '-';

  // Native coin logo
  let nativeCoinLogo;

  // Function to format a number as a dollar amount
  const formatDollarAmount = (amount) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

  // Format the total value with change
  const formattedTotalValueWithChange = `${formatDollarAmount(totalValueWithChange)} / ${valueChangeSign}${formatDollarAmount(Math.abs(totalValueChange))}`;

    // Display info based on network
    const DisplayInfo = () => {

    }

    // Handle outside clicks
    const handleClickOutside = (event: Event) => {
      if (dropdownRef.current && !(dropdownRef.current.contains(event.target as Node))) {
        setIsOpen(false);
      }
    };

    // Handle icon
    const NetworkIcon = () => {
      if (chainId === 56) {
        return (
          <BscNetwork />
        )
      }

      return (
        <Text>Yo</Text>
      )
    }

    // Handle colors
    const getColorForChange = (change: number): string => {
      return change >= 0 ? 'green' : 'rgb(255, 73, 73)';
    };

    // Icon Up
    const MarketUpIcon = styled(UpIcon)`
    fill: rgb(16, 217, 96);
    width: 11px;
    `

    // Icon Down
    const MarketDownIcon = styled(UpIcon)`
    fill: rgb(255, 73, 73);
    transform: rotate(180deg);
    width: 11px;
    `

    const MarketBox = styled.div<{ change: number }>`
    background: ${props =>
      props.change > 0 ? 'rgba(16, 217, 96, 0.233)' :
      props.change < 0 ? 'rgba(255, 73, 73, 0.253)' :
      null};
    border-radius: 3px;
    padding: 4px 6px 6px 4px;
    font-size: 13px;
    width: 70px;
    text-align: center;
    align-items: center;
    align-content: center;
    color: ${props =>
      props.change > 0 ? 'rgb(16, 217, 96)' :
      props.change < 0 ? 'rgb(255, 73, 73)' :
      'orange'};
  `;

    const LogoImage = styled.img`
    height: 25px; /* Set the desired height */
   `;

   // Handle up/down icon
   const GetIcon = (change: number): JSX.Element => {
    return change >= 0 ? <MarketUpIcon /> : <MarketDownIcon />;
  };

  // Get native coin logo
  const GetNativeIcon = () => {
    if (chainId === 56) {
      nativeCoinLogo = "https://assets.kazama.io/tokens/symbol/bnb.png"
    }
    if (chainId === 1) {
      nativeCoinLogo = "https://assets.kazama.io/tokens/symbol/eth.png"
    }
  }

  const calculatePriceChange = (tokenName: string) => {
    const currentPrice = tokenPrices[tokenName].usd;
    const percentageChange = tokenPrices[tokenName].usd_24h_change;
    const priceChange = (currentPrice * percentageChange) / 100; // Convert percentage change to USD
    
    const formattedChange = priceChange.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    // Check if the change is not zero and not negative
    if (priceChange !== 0 && priceChange < 0) {
      // Remove the negative sign
      const absoluteChange = formattedChange.substring(2);
      // Check if the absolute change after the dollar sign and the first digit is negative
      if (absoluteChange.charAt(3) === '-') {
        return formattedChange.substring(0, 3) + formattedChange.substring(4);
      }
    }
    
    return formattedChange;
  };

    return (
      <Container>
        <BalanceBox onClick={() => setIsOpen(!isOpen)} style={{fontSize: "14px", fontFamily: "Flama Bold"}}>
        <NetworkIcon />
        {formatBigIntToFixed(nativeBalance?.data?.value ?? 5n, 5)}
        {isOpen ? (
          <StyledChevronOpen />
        ) : (
          <StyledChevronClosed />
        )}
        </BalanceBox>
        {isOpen && (
                <Dropdown ref={dropdownRef} isOpen={isOpen}>
                    <div style={{fontFamily: "Industry-Black", fontSize: "18px", padding: "20px"}}>
    YOUR ASSETS
  </div>
<DataContainer>
<TokenContainerOdd>
  <LogoDiv>
   <LogoImage src="https://assets.kazama.io/tokens/symbol/bnb.png" />
    <TokenInfoDiv>
      <div>BNB</div>
      <div style={{fontSize: "13px", marginTop: "3px"}}>${tokenPrices['binancecoin'].usd}</div>
    </TokenInfoDiv>
  </LogoDiv>
  <MarketChangesDiv>
    <div>
      <MarketBox change={tokenPrices['binancecoin'].usd_24h_change}>
        {GetIcon(tokenPrices['binancecoin'].usd_24h_change)} {tokenPrices['binancecoin'].usd_24h_change.toFixed(2)}%
      </MarketBox>
    </div>
  </MarketChangesDiv>
  <BalanceDiv>
    <div>{formatBigIntToFixed(BigInt(nativeBalance?.data?.value ?? 5n), 5)}</div>
    <BalanceValueDiv>
      ${(Number(nativeBalance) * tokenPrices['binancecoin'].usd / 1e18).toFixed(2)}
    </BalanceValueDiv>
  </BalanceDiv>
</TokenContainerOdd>

<TokenContainerEven>
  <LogoDiv>
   <LogoImage src="https://assets.kazama.io/tokens/symbol/bnb.png" />
    <TokenInfoDiv>
      <div>WBNB</div>
      <div style={{fontSize: "13px", marginTop: "3px"}}>${tokenPrices['binancecoin'].usd}</div>
    </TokenInfoDiv>
  </LogoDiv>
  <MarketChangesDiv>
    <div>
      <MarketBox change={tokenPrices['binancecoin'].usd_24h_change}>
        {GetIcon(tokenPrices['binancecoin'].usd_24h_change)} {tokenPrices['binancecoin'].usd_24h_change.toFixed(2)}%
      </MarketBox>
    </div>
  </MarketChangesDiv>
  <BalanceDiv>
    <div>{formatBigIntToFixed(BigInt(nativeBalance?.data?.value ?? 5n), 5)}</div>
    <BalanceValueDiv>
      ${(Number(nativeBalance) * tokenPrices['binancecoin'].usd / 1e18).toFixed(2)}
    </BalanceValueDiv>
  </BalanceDiv>
</TokenContainerEven>

<TokenContainerOdd>
  <LogoDiv>
   <LogoImage src="https://assets.kazama.io/tokens/symbol/kazama.png" />
    <TokenInfoDiv>
      <div>KAZAMA</div>
      {/* <div style={{fontSize: "13px"}}>${tokenPrices['binancecoin'].usd}</div> */}
      <div style={{fontSize: "13px", marginTop: "3px"}}>$0.00</div>
    </TokenInfoDiv>
  </LogoDiv>
  <MarketChangesDiv>
    <div>
      {/* <MarketBox change={tokenPrices['binancecoin'].usd_24h_change}>
        {GetIcon(tokenPrices['binancecoin'].usd_24h_change)} {tokenPrices['binancecoin'].usd_24h_change.toFixed(2)}%
      </MarketBox> */}
      <MarketBox change={0} />
    </div>
  </MarketChangesDiv>
  <BalanceDiv>
    <div>{formatBigIntToFixed(BigInt(nativeBalance?.data?.value ?? 5n), 5)}</div>
    <BalanceValueDiv>
      {/* ${(Number(nativeBalance) * tokenPrices['binancecoin'].usd / 1e18).toFixed(2)} */}
      $0.00
    </BalanceValueDiv>
  </BalanceDiv>
</TokenContainerOdd>

<TokenContainerEven>
  <LogoDiv>
   <LogoImage src="https://assets.kazama.io/tokens/symbol/wbtc.png" />
    <TokenInfoDiv>
      <div>BTC</div>
      <div style={{fontSize: "13px", marginTop: "3px"}}>${tokenPrices['bitcoin'].usd}</div>
    </TokenInfoDiv>
  </LogoDiv>
  <MarketChangesDiv>
    <div>
      <MarketBox change={tokenPrices['bitcoin'].usd_24h_change}>
        {GetIcon(tokenPrices['bitcoin'].usd_24h_change)} {tokenPrices['bitcoin'].usd_24h_change.toFixed(2)}%
      </MarketBox>
    </div>
  </MarketChangesDiv>
  <BalanceDiv>
    <div>{formatBigIntToFixed(btcBscBalance, 5)}</div>
    <BalanceValueDiv>
      ${(Number(btcBscBalance) * tokenPrices['bitcoin'].usd / 1e18).toFixed(2)}
    </BalanceValueDiv>
  </BalanceDiv>
</TokenContainerEven>

<TokenContainerOdd>
  <LogoDiv>
   <LogoImage src="https://assets.kazama.io/tokens/symbol/eth.png" />
    <TokenInfoDiv>
      <div>ETH</div>
      <div style={{fontSize: "13px", marginTop: "3px"}}>${tokenPrices['ethereum'].usd}</div>
    </TokenInfoDiv>
  </LogoDiv>
  <MarketChangesDiv>
    <div>
      <MarketBox change={tokenPrices['ethereum'].usd_24h_change}>
        {GetIcon(tokenPrices['ethereum'].usd_24h_change)} {tokenPrices['ethereum'].usd_24h_change.toFixed(2)}%
      </MarketBox>
    </div>
  </MarketChangesDiv>
  <BalanceDiv>
    <div>{formatBigIntToFixed(ethBscBalance, 5)}</div>
    <BalanceValueDiv>
      ${(Number(ethBscBalance) * tokenPrices['ethereum'].usd / 1e18).toFixed(2)}
    </BalanceValueDiv>
  </BalanceDiv>
</TokenContainerOdd>

<TokenContainerEven>
  <LogoDiv>
   <LogoImage src="https://assets.kazama.io/tokens/symbol/usdt.png" />
    <TokenInfoDiv>
      <div>USDT</div>
      <div style={{fontSize: "13px", marginTop: "3px"}}>${tokenPrices['tether'].usd}</div>
    </TokenInfoDiv>
  </LogoDiv>
  <MarketChangesDiv>
    <div>
      <MarketBox change={tokenPrices['tether'].usd_24h_change}>
        {GetIcon(tokenPrices['tether'].usd_24h_change)} {tokenPrices['tether'].usd_24h_change.toFixed(2)}%
      </MarketBox>
    </div>
  </MarketChangesDiv>
  <BalanceDiv>
    <div>{formatBigIntToFixed(usdtBscBalance, 5)}</div>
    <BalanceValueDiv>
      ${(Number(usdtBscBalance) * tokenPrices['tether'].usd / 1e18).toFixed(2)}
    </BalanceValueDiv>
  </BalanceDiv>
</TokenContainerEven>

<TokenContainerOdd>
  <LogoDiv>
   <LogoImage src="https://assets.kazama.io/tokens/symbol/usdc.png" />
    <TokenInfoDiv>
      <div>USDC</div>
      <div style={{fontSize: "13px", marginTop: "3px"}}>${tokenPrices['usd-coin'].usd}</div>
    </TokenInfoDiv>
  </LogoDiv>
  <MarketChangesDiv>
    <div>
      <MarketBox change={tokenPrices['usd-coin'].usd_24h_change}>
        {GetIcon(tokenPrices['usd-coin'].usd_24h_change)} {tokenPrices['usd-coin'].usd_24h_change.toFixed(2)}%
      </MarketBox>
    </div>
  </MarketChangesDiv>
  <BalanceDiv>
    <div>{formatBigIntToFixed(usdcBscBalance, 5)}</div>
    <BalanceValueDiv>
      ${(Number(usdcBscBalance) * tokenPrices['usd-coin'].usd / 1e18).toFixed(2)}
    </BalanceValueDiv>
  </BalanceDiv>
</TokenContainerOdd>

<TokenContainerEven>
  <LogoDiv>
   <LogoImage src="https://assets.kazama.io/tokens/symbol/dai.png" />
    <TokenInfoDiv>
      <div>DAI</div>
      <div style={{fontSize: "13px", marginTop: "3px"}}>${tokenPrices['dai'].usd}</div>
    </TokenInfoDiv>
  </LogoDiv>
  <MarketChangesDiv>
    <div>
      <MarketBox change={tokenPrices['dai'].usd_24h_change}>
        {GetIcon(tokenPrices['dai'].usd_24h_change)} {tokenPrices['dai'].usd_24h_change.toFixed(2)}%
      </MarketBox>
    </div>
  </MarketChangesDiv>
  <BalanceDiv>
    <div>{formatBigIntToFixed(daiBscBalance, 5)}</div>
    <BalanceValueDiv>
      ${(Number(daiBscBalance) * tokenPrices['usd-coin'].usd / 1e18).toFixed(2)}
    </BalanceValueDiv>
  </BalanceDiv>
</TokenContainerEven>

<TokenContainerOdd>
  <LogoDiv>
   <LogoImage src="https://assets.kazama.io/tokens/symbol/apecoin.png" />
    <TokenInfoDiv>
      <div>APE</div>
      <div style={{fontSize: "13px", marginTop: "3px"}}>${tokenPrices['apecoin'].usd}</div>
    </TokenInfoDiv>
  </LogoDiv>
  <MarketChangesDiv>
    <div>
      <MarketBox change={tokenPrices['apecoin'].usd_24h_change}>
        {GetIcon(tokenPrices['apecoin'].usd_24h_change)} {tokenPrices['apecoin'].usd_24h_change.toFixed(2)}%
      </MarketBox>
    </div>
  </MarketChangesDiv>
  <BalanceDiv>
    <div>{formatBigIntToFixed(apeBscBalance, 5)}</div>
    <BalanceValueDiv>
      ${(Number(apeBscBalance) * tokenPrices['apecoin'].usd / 1e18).toFixed(2)}
    </BalanceValueDiv>
  </BalanceDiv>
</TokenContainerOdd>

<TokenContainerEven>
  <LogoDiv>
   <LogoImage src="https://assets.kazama.io/tokens/symbol/shiba.png" />
    <TokenInfoDiv>
      <div>SHIBA</div>
      <div style={{fontSize: "13px", marginTop: "3px"}}>${tokenPrices['shiba-inu'].usd}</div>
    </TokenInfoDiv>
  </LogoDiv>
  <MarketChangesDiv>
    <div>
      <MarketBox change={tokenPrices['shiba-inu'].usd_24h_change}>
        {GetIcon(tokenPrices['shiba-inu'].usd_24h_change)} {tokenPrices['shiba-inu'].usd_24h_change.toFixed(2)}%
      </MarketBox>
    </div>
  </MarketChangesDiv>
  <BalanceDiv>
    <div>{formatBigIntToFixed(shibaBscBalance, 5)}</div>
    <BalanceValueDiv>
      ${(Number(shibaBscBalance) * tokenPrices['shiba-inu'].usd / 1e18).toFixed(2)}
    </BalanceValueDiv>
  </BalanceDiv>
</TokenContainerEven>
</DataContainer>
                  {/* <div>
                    total value: {formattedTotalValueWithChange}
                  </div> */}
                </Dropdown>
              )}
      </Container>
    )
}

export default WalletBalance
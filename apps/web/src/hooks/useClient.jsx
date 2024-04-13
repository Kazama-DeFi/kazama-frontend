// define and export `useClient` hook somewhere in your codebase
// or keep it in the `src/App.js`, up to you

import { useEffect, useState } from "react";
import { useInterval } from '@kazamaswap/hooks';

export const useFetchTokenFromApi = (name) => {
  const [token, setToken] = useState('')
  useEffect(() => {
    const api = async () => {
      const res = await fetch("https://kazama-chat-app.herokuapp.com/token",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: name
          })
        })

      res.json().then((data) => {
        setToken(data);
      })
    }
    api();
  }, [name])
  return token;
};

export const useFetchTokens = () => {
  const [tokenInfo, setTokenInfo] = useState([{logoUrl: '', tokenTicker: '', tokenPrice: '', percentChange: '', contractAddress: ''}])
  useEffect(() => {
    const api = async () => {
      const res = await fetch("https://ape-swap-api.herokuapp.com/tokens/trending",
        {
          method: "get",
          headers: { "Content-Type": "application/json" }
        })

      res.json().then((data) => {
        setTokenInfo(data);
      })
    }
    api();
  }, [])
  return tokenInfo;
};

export const useFetchBurnTxs = () => {
  const [txs, setTxs] = useState([{transactionHash: '', blockTimestamp: '', fromAddress: '', toAddress: '', value: 0, type: ''}])
  useEffect(() => {
    const api = async () => {
      const res = await fetch("https://burnapi.kazamaswap.finance/getTransactions",
        {
          method: "get",
          headers: { "Content-Type": "application/json" }
        })

      console.log(res)
      res.json().then((data) => {
        setTxs(data.lastestTxs);
      })
    }
    api();
  }, [])  
  return txs;
};

export const useFetchDistributor = () => {
  const [txs, setTxs] = useState([{transactionHash: '', blockTimestamp: '', fromAddress: '', toAddress: '', value: 0, type: ''}])
  useEffect(() => {
    const api = async () => {
      const res = await fetch("https://busd-distributor-api.kazamaswap.finance/getTransactions",
        {
          method: "get",
          headers: { "Content-Type": "application/json" }
        })

      console.log(res)
      res.json().then((data) => {
        setTxs(data.lastestTxs);
      })
    }
    api();
  }, [])  
  return txs;
};

export const useStakingApi = () => {
  const [txs, setTxs] = useState([{transactionHash: '', blockTimestamp: '', fromAddress: '', toAddress: '', value: 0, type: ''}])
  useEffect(() => {
    const api = async () => {
      const res = await fetch("http://161.35.97.240/getStaking",
        {
          method: "get",
          headers: { "Content-Type": "application/json" }
        })

      console.log(res)
      res.json().then((data) => {
        setTxs(data.lastestTxs);
      })
    }
    api();
  }, [])  
  return txs;
};

export const useSaleApi = () => {
  const [txs, setTxs] = useState([{transactionHash: '', blockTimestamp: '', fromAddress: '', toAddress: '', value: 0, type: ''}])
  useEffect(() => {
    const api = async () => {
      const res = await fetch("https://sale-api-zeta.vercel.app/getStaking",
        {
          method: "get",
          headers: { "Content-Type": "application/json" }
        })

      console.log(res)
      res.json().then((data) => {
        setTxs(data.lastestTxs);
      })
    }
    api();
  }, [])  
  return txs;
};

export const useFetchTxs = () => {
  const [txs, setTxs] = useState([{transactionHash: '', blockTimestamp: '', fromAddress: '', toAddress: '', value: 0, type: ''}])
  useEffect(() => {
    const api = async () => {
      const res = await fetch("https://sale-api-zeta.vercel.app/getStaking",
        {
          method: "get",
          headers: { "Content-Type": "application/json" }
        })

      console.log(res)
      res.json().then((data) => {
        setTxs(data.lastestTxs);
      })
    }
    api();
  }, [])  
  return txs;
};
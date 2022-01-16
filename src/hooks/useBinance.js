import React from 'react';
import { useLocation } from 'react-router-dom';

const bidReducer = (acc, val, index) => {
  acc.push({
    title: `Buy ${index + 1}`,
    price: val.price || val[0],
    amount: val.amount || val[1]
  });
  return acc;
};

const API_KEYS = {
  sell: 'a',
  buy: 'b'
};

const useBinance = apiKey => {
  const [bids, setBids] = React.useState([]);
  const { search } = useLocation();

  React.useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com/stream?streams=btcusdt@depth');

    ws.onmessage = function(event) {
      const json = JSON.parse(event.data);
      try {
        const items = json.data[API_KEYS[apiKey]];

        setBids(prevState => [...items, ...prevState].slice(0, 100).reduce(bidReducer, []));
      } catch (err) {
        // console.log(err);
      }
    };

    return () => {
      ws.close();
    };
  }, [apiKey, search]);

  return {
    bids
  };
};

export default useBinance;

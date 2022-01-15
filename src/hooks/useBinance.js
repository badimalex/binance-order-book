import React from 'react';

const bidReducer = (acc, val, index) => {
  acc.push({
    title: `Buy ${index + 1}`,
    price: val[0],
    amount: val[1],
  });
  return acc;
};

const API_KEYS = {
  sell: 'a',
  buy: 'b',
};

const useBinance = (apiKey) => {
  const [bids, setBids] = React.useState([]);

  React.useEffect(() => {
    const ws = new WebSocket(
      'wss://stream.binance.com/stream?streams=btcusdt@depth'
    );

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        setBids(json.data[API_KEYS[apiKey]].slice(0, 5).reduce(bidReducer, []));
      } catch (err) {
        console.log(err);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return {
    bids,
  };
};

export default useBinance;

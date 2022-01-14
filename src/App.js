import React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Select from './components/Select';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './App.css';

const bidReducer = (acc, val, index) => {
  acc.push({
    title: `Buy ${index + 1}`,
    price: val[0],
    amount: val[1],
  });
  return acc;
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BasicTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Side</TableCell>
            <TableCell>Price (USDT)</TableCell>
            <TableCell>Amount (BTC)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const TABS = {
  'buy-order': 0,
  'sell-order': 1
}

const DEPTH = {
  15: 15,
  30: 30,
  50: 50,
  100: 100,
}
const GROUP = {
  0: 0,
  1: 1,
  2: 2,
}

const query = new URLSearchParams(window.location.search);
const defaultTab = TABS[query.get('tab')] || TABS['buy-order'];
const defaultDepth = DEPTH[query.get('depth')] || 15;
const defaultGroup = GROUP[query.get('group')] || 2;

function App() {
  const [value, setValue] = React.useState(defaultTab);
  const [bids, setBids] = React.useState([]);
  const [bidsa, setBidsa] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const ws = new WebSocket(
      'wss://stream.binance.com/stream?streams=btcusdt@depth'
    );

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        setBidsa(json.data.a.slice(0, 5).reduce(bidReducer, []));
        setBids(json.data.b.slice(0, 5).reduce(bidReducer, []));
      } catch (err) {
        console.log(err);
      }
    };

    return () => {
      ws.close();
    };
  });

  return (
    <div className="container">
      <div className="header">
        <div className="header-title">
          <h3>Order Book</h3>
        </div>
        <div className="header-settings">
          <Select
            style={{marginRight: '12px'}}
            title="Depth"
            defaultValue={defaultDepth}
            items={[
              { value: 15, label: 15 },
              { value: 30, label: 30 },
              { value: 50, label: 50 },
              { value: 100, label: 100 },
            ]}
          />
          <Select
            title="Group"
            defaultValue={defaultGroup}
            items={[
              { value: 0, label: `0 decimals` },
              { value: 1, label: `1 decimals` },
              { value: 2, label: `2 decimals` },
            ]}
          />
        </div>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Buy Order" {...a11yProps(0)} />
          <Tab label="Sell Order" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BasicTable rows={bids} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BasicTable rows={bidsa} />
      </TabPanel>
    </div>
  );
}

export default App;

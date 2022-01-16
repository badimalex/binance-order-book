import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Select from '../components/Select';

export const DEPTH = {
  15: 15,
  30: 30,
  50: 50,
  100: 100
};

export const GROUP = {
  0: '0',
  1: '1',
  2: '2'
};

function App(props) {
  const navigate = useNavigate();

  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const group = GROUP[query.get('group')] || 2;
  const depth = DEPTH[query.get('depth')] || 15;

  return (
    <div className="container">
      <div className="header">
        <div className="header-title">
          <h3>Order Book</h3>
        </div>
        <div className="header-settings">
          <Select
            style={{ marginRight: '12px' }}
            title="Depth"
            defaultValue={depth}
            onChange={depth => {
              const uriObj = {
                group,
                depth
              };
              const qs = new URLSearchParams(uriObj);
              navigate({ search: `?${qs.toString()}` });
            }}
            items={[
              { value: 15, label: 15 },
              { value: 30, label: 30 },
              { value: 50, label: 50 },
              { value: 100, label: 100 }
            ]}
          />
          <Select
            title="Group"
            defaultValue={group}
            onChange={group => {
              const uriObj = {
                group,
                depth
              };
              const qs = new URLSearchParams(uriObj);
              navigate({ search: `?${qs.toString()}` });
            }}
            items={[
              { value: 0, label: '0 decimals' },
              { value: 1, label: '1 decimals' },
              { value: 2, label: '2 decimals' }
            ]}
          />
        </div>
      </div>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={props.activeTab}>
          <Tab label="Buy Order" component={Link} to={`/buy-order${search}`} />
          <Tab label="Sell Order" component={Link} to={`/sell-order${search}`} />
        </Tabs>
      </Box>
      {props.children}
    </div>
  );
}

export default App;

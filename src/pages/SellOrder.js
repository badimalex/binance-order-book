import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import BasicTable from '../components/BasicTable';
import TabPanel from '../components/TabPanel';
import useBinance from '../hooks/useBinance';
import OrderLayout from '../layouts/OrderLayout';

function App() {
  const { bids } = useBinance('sell');

  return (
    <OrderLayout activeTab={1}>
      <TabPanel value={1} index={1}>
        {bids.length > 0 ? (
          <BasicTable title="Sell" rows={bids} />
        ) : (
          <CircularProgress />
        )}
      </TabPanel>
    </OrderLayout>
  );
}

export default App;

import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import BasicTable from '../components/BasicTable';
import TabPanel from '../components/TabPanel';
import useBinance from '../hooks/useBinance';
import OrderLayout from '../layouts/OrderLayout';

function App() {
  const { bids } = useBinance('buy');

  return (
    <OrderLayout activeTab={0}>
      <TabPanel value={0} index={0}>
        {bids.length > 0 ? (
          <BasicTable title="Buy" rows={bids} />
        ) : (
          <CircularProgress />
        )}
      </TabPanel>
    </OrderLayout>
  );
}

export default App;

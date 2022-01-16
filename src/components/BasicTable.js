import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useLocation } from 'react-router-dom';
import { GROUP, DEPTH } from '../layouts/OrderLayout';

import React from 'react';

function BasicTable({ rows }) {
  const { search } = useLocation();

  const query = new URLSearchParams(search);
  const group = GROUP[query.get('group')] || 2;
  const depth = DEPTH[query.get('depth')] || 15;

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
          {rows.slice(0, depth).map((item, i) => {
            const price = new Intl.NumberFormat('en-US', {
              minimumFractionDigits: group,
              maximumFractionDigits: group
            }).format(item.price);

            return (
              <TableRow key={i}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell>{item.amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;

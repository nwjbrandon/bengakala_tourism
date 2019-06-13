import React from 'react';
import './css/Tabular.css';
import NestedTable from './NestedTable';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function totalCost(costArr) {
  const total = costArr.reduce((total, num) => total + num, 0)
  return total
}

export default function MasterTable({ customer, costList }) {
  const t = customer.transport
  const d = customer.duration

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Qty</TableCell>
          <TableCell>Price</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{ customer.home.type }</TableCell>
          <TableCell>{ customer.home.number }</TableCell>
          <TableCell> ${ costList[0] } </TableCell>
        </TableRow>
        <TableRow>
          <TableCell> { customer.mealPlan.type }</TableCell>
          <TableCell> customer.groupSize }</TableCell>
          <TableCell>${ costList[1] }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Transport</TableCell>
          <TableCell children={<NestedTable />}/>
          <TableCell>${ costList[2] }</TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell> Total </TableCell>
          <TableCell> ${totalCost(costList)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

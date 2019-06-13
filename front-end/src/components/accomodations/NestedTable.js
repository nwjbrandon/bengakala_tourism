import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default NestedTable = (props) => {
  <Table>
    <TableBody>
      <TableRow>
        <TableCell>Vans</TableCell>
        <TableCell>{t.type.van}</TableCell>
        <TableCell>  ${t.type.van * t.price[0] * d}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cars</TableCell>
        <TableCell>{t.type.car}</TableCell>
        <TableCell>  ${t.type.car * t.price[1] * d}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Motorbikes</TableCell>
        <TableCell>{t.type.motorbike}</TableCell>
        <TableCell>  ${t.type.motorbike * t.price[2] * d}</TableCell>
      </TableRow>
    </TableBody>
  </Table>  
}

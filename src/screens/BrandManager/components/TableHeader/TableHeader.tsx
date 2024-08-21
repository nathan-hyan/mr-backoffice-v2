import { TableCell, TableHead, TableRow } from '@mui/material';

function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell align='left'>Id Interno</TableCell>

        <TableCell width='80%'>Marca</TableCell>

        <TableCell align='right' />
      </TableRow>
    </TableHead>
  );
}
export default TableHeader;

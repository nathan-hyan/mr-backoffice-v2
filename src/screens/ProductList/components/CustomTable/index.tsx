import { ChangeEvent, useState } from 'react';
import { Table } from '@mui/material';

import { GACategories, GATypes } from '~constants/gaTagTypes';
import { useProducts } from '~contexts/Products';
import useGATag from '~hooks/useGATag';

import styles from './styles.module.scss';

import Row from './components/Row';

function CustomTable() {
  const { tagAction } = useGATag(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const { productList } = useProducts();

  const handleChangePage = (_event: unknown, newPage: number) => {
    tagAction(GACategories.Event, GATypes.Click, `Changed to page ${newPage}`);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    tagAction(
      GACategories.Event,
      GATypes.Click,
      `Changed rows per page to ${+event.target.value}`
    );
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <Table
          sx={{
            '& td, & th': { border: 'none' },
            '& tbody tr': { borderBottom: '1px solid #ddd' },
          }}
        >
          <thead>
            <Row header='show' />
          </thead>
          <tbody>
            {productList &&
              productList
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <Row
                    header='hidden'
                    data={product}
                    key={product.id + product.internalId}
                  />
                ))}
          </tbody>
        </Table>
      </div>
      <hr />
      <div className={styles.pagination}>
        <span>Rows per page:</span>
        <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
          {[3, 5, 10, 25].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          className={styles.buttonPagination}
          type='button'
          onClick={() => handleChangePage(null, page - 1)}
          disabled={page === 0}
        >
          Prev
        </button>
        <span>Page {page + 1}</span>
        <button
          className={styles.buttonPagination}
          type='button'
          onClick={() => handleChangePage(null, page + 1)}
          disabled={(page + 1) * rowsPerPage >= (productList?.length || 0)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomTable;

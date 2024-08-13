import { ChangeEvent, useState } from 'react';

import { GACategories, GATypes } from '~constants/gaTagTypes';

import { useGATag } from '.';

function usePagination<T>(data: T[]) {
  const { tagAction } = useGATag(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const splittedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return {
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
    data: splittedData,
  };
}
export default usePagination;

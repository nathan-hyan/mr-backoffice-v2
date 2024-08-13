import { useGATag } from '~hooks';

import { CustomTable, SearchBox } from './components';

function ProductList() {
  useGATag();

  return (
    <>
      <SearchBox />
      <CustomTable />
    </>
  );
}
export default ProductList;

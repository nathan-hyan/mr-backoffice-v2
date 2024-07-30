import { useGATag } from '~hooks';
import CustomTable from './components/CustomTable';
import SearchBox from './components/SearchBox';
import SortByBox from './components/SortByBox';

function ProductList() {
  useGATag();

  return (
    <>
      <SearchBox />
      <SortByBox />
      <CustomTable />
    </>
  );
}
export default ProductList;

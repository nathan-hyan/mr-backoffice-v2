import {
  Box,
  Breadcrumbs,
  ImageList,
  ImageListItem,
  List,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Product } from 'types/data';

import CustomListItem from '~components/CustomListItem';
import useBrandTranslator from '~hooks/useBrandTranslator';
import { objectIterator } from '~utils/objectIterator';
import { timestampTranslator } from '~utils/timestampTranslator';

import { prepareDataForDisplay, translatePrices } from './ProductDetail.utils';

interface Props {
  data: Product;
  category?: string;
  subCategory?: string;
}

function ProductDetail({ data, category, subCategory }: Props) {
  const { translateBrand } = useBrandTranslator();
  return (
    <Box
      sx={{
        margin: 1,
        display: 'flex',
        gap: 3,
        alignItems: 'flex-start',
        justifyItems: 'flex-start',
      }}
    >
      <ImageList cols={2} sx={{ width: '25%', height: 300 }}>
        {data.imageURL.map((image) => (
          <ImageListItem key={image + new Date()}>
            <img alt={data.name} src={image} loading='lazy' />
          </ImageListItem>
        ))}
      </ImageList>
      <Box sx={{ width: '75%' }}>
        <Breadcrumbs separator='>'>
          {[
            <Typography key={1}>{category}</Typography>,
            <Typography key={2}>{subCategory}</Typography>,
          ]}
        </Breadcrumbs>

        <Typography variant='h2'>{data.name}</Typography>
        <Typography variant='body2' mb={3}>
          {data.description}
        </Typography>

        <List
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 3,
          }}
        >
          <List sx={{ display: 'flex', width: '100%', gap: 3, p: 0 }}>
            {objectIterator(data.prices).map(({ key, value: { value } }) => (
              <CustomListItem
                width='calc(25% - 24px)'
                title={translatePrices(key as keyof Product['prices'])}
                value={`$${(Number(value) || 0).toFixed(2)}`}
              />
            ))}
          </List>

          <List sx={{ display: 'flex', width: '100%', gap: 3, p: 0 }}>
            <CustomListItem
              width='calc(50% - 24px)'
              title='Fecha de creación'
              value={timestampTranslator(data.createdAt)}
            />

            <CustomListItem
              width='calc(50% - 24px)'
              title='Fecha de modificación'
              value={timestampTranslator(data.updatedAt)}
            />
          </List>

          {prepareDataForDisplay(data, translateBrand).map(
            ({ title, value }) => (
              <CustomListItem
                width='calc(50% - 24px)'
                title={title}
                value={value}
              />
            )
          )}

          {data.specifications.length > 0 ? (
            <TableContainer component={Paper}>
              <Table aria-label='simple table' size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Titulo</TableCell>
                    <TableCell>Descripcion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.specifications.map((row) => (
                    <TableRow
                      key={row.title}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}

          {data.providerProductCode.length > 0 ? (
            <TableContainer component={Paper}>
              <Table aria-label='simple table' size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>ID Proveedor</TableCell>
                    <TableCell>Nombre</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.providerProductCode.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </List>
      </Box>
    </Box>
  );
}
ProductDetail.defaultProps = {
  category: 'Error',
  subCategory: 'Error',
};

export default ProductDetail;

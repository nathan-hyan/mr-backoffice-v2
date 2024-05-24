import { useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Divider,
  FormControlLabel,
  FormGroup,
  ImageList,
  ImageListItem,
  List,
  Paper,
  Rating,
  Switch,
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
import { FirestoreCollections } from '~constants/firebase';
import useBrandTranslator from '~hooks/useBrandTranslator';
import useFirestore from '~hooks/useFirestore';
import { objectIterator } from '~utils/objectIterator';
import { timestampTranslator } from '~utils/timestampTranslator';

import {
  getAverageRating,
  prepareDataForDisplay,
  translatePrices,
  translateStock,
} from './ProductDetail.utils';

interface Props {
  data: Product;
  category?: string;
  subCategory?: string;
}

function ProductDetail({ data, category, subCategory }: Props) {
  const { translateBrand } = useBrandTranslator();
  const { updateDocument, updateLoading } = useFirestore<Product>(
    FirestoreCollections.Products
  );
  const [showInStore, setShowInStore] = useState(data.showInStore || false);

  const handleShowInStoreToggle = () => {
    setShowInStore((prevState) => {
      updateDocument(data.id, { ...data, showInStore: !prevState });
      return !prevState;
    });
  };

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
      <Box sx={{ width: '25%' }}>
        <ImageList cols={2} sx={{ height: 300 }}>
          {data.imageURL.map((image) => (
            <ImageListItem key={image + new Date()}>
              <img alt={data.name} src={image} loading='lazy' />
            </ImageListItem>
          ))}
        </ImageList>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                disabled={updateLoading}
                onChange={handleShowInStoreToggle}
                checked={showInStore}
              />
            }
            label='Mostrar en tienda'
          />
        </FormGroup>
        <Divider sx={{ my: 3 }} />
        {data.userFeedback && data.userFeedback.length > 0 ? (
          <>
            <Box>
              <Typography component='legend'>Rating de los clientes</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: 1,
                }}
              >
                <Rating
                  name='simple-controlled'
                  value={getAverageRating(data.userFeedback)}
                  readOnly
                  precision={0.25}
                />
                <Typography variant='caption' m={0} p={0}>
                  ({getAverageRating(data.userFeedback)},{' '}
                  {data.userFeedback.length}{' '}
                  {data.userFeedback.length > 1 ? 'comentarios' : 'comentario'})
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                flexDirection: 'column',
                maxHeight: '15rem',
                p: 1,
                mb: 3,
                overflowY: 'scroll',
              }}
            >
              {data.userFeedback.map(({ comment }) => (
                <Paper sx={{ p: 3 }} elevation={3}>
                  <Typography>{comment}</Typography>
                </Paper>
              ))}
            </Box>
          </>
        ) : null}
      </Box>
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
                key={key}
                width='calc(25% - 24px)'
                title={translatePrices(key as keyof Product['prices'])}
                value={`$${(Number(value) || 0).toFixed(2)}`}
              />
            ))}
          </List>

          <List sx={{ display: 'flex', width: '100%', gap: 3, p: 0 }}>
            {objectIterator(data.stock).map(({ key, value }) => (
              <CustomListItem
                key={key}
                width='calc(25% - 24px)'
                title={translateStock(key as keyof Product['stock'])}
                value={String(value)}
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

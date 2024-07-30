import { useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
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
import type { Product } from 'types/data';

import CustomListItem from '~components/CustomListItem/CustomListItem';
import { FirestoreCollections } from '~constants/firebase';
import { useFirestore } from '~hooks';
import calculateNumberWithPercentage from '~utils/addPercentage';
import { objectIterator } from '~utils/objectIterator';
import { timestampTranslator } from '~utils/timestampTranslator';

import {
  getAverageRating,
  prepareDataForDisplay,
  translateStock,
} from './ProductDetail.utils';
import { styles } from './ProductDetails.styles';

interface Props {
  data: Product;
  category?: string;
  subCategory?: string;
}

function ProductDetail({
  data,
  category = 'Error',
  subCategory = 'Error',
}: Props) {
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

  const stockInfo = objectIterator(data.stock).filter(
    ({ key }) => key !== 'noPhysicalStock'
  );

  const hasUserFeedback = data.userFeedback && data.userFeedback.length > 0;
  const comentariosText =
    data.userFeedback.length > 1 ? 'comentarios' : 'comentario';
  const hasPhysicalStock = !data.stock.noPhysicalStock;
  const hasProviderProductCode = data.providerProductCode.length > 0;

  return (
    <Box sx={styles.container}>
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
        {hasUserFeedback ? (
          <>
            <Box>
              <Typography component='legend'>Rating de los clientes</Typography>
              <Box sx={styles.ratingBox}>
                <Rating
                  name='simple-controlled'
                  value={getAverageRating(data.userFeedback)}
                  readOnly
                  precision={0.25}
                />
                <Typography variant='caption' m={0} p={0}>
                  ({getAverageRating(data.userFeedback)},{' '}
                  {data.userFeedback.length} {comentariosText})
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={styles.userFeedback}>
              {data.userFeedback.map(({ comment }) => (
                <Paper key={comment + new Date()} sx={{ p: 3 }} elevation={3}>
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

        <List sx={styles.descriptionContainer}>
          <Grid container sx={styles.fullWidthCard}>
            <Grid
              item
              xs={12}
              sx={{
                bgcolor: 'background.paper',
                p: 2,
              }}
            >
              <Typography variant='body1'>Precio Costo</Typography>
              <Typography variant='body2' color='lightgray'>
                ${data.prices.cost.value}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                bgcolor: 'background.paper',
                p: 2,
              }}
            >
              <Typography variant='body1'>
                Precio Retail ({data.prices.retail?.value || 0}%)
              </Typography>
              <Typography variant='body2' color='lightgray'>
                $
                {calculateNumberWithPercentage(
                  data.prices.cost?.value,
                  data.prices.retail?.value || 0,
                  'incr'
                ).toFixed(2)}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                bgcolor: 'background.paper',
                p: 2,
              }}
            >
              <Typography variant='body1'>
                Precio Online ({data.prices.online?.value || 0}%)
              </Typography>
              <Typography variant='body2' color='lightgray'>
                $
                {calculateNumberWithPercentage(
                  data.prices.cost?.value,
                  data.prices.online?.value || 0,
                  'incr'
                ).toFixed(2)}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                bgcolor: 'background.paper',
                p: 2,
              }}
            >
              <Typography variant='body1'>
                Precio Mayorista 1 ({data.prices.mayo1?.value || 0}%)
              </Typography>
              <Typography variant='body2' color='lightgray'>
                $
                {calculateNumberWithPercentage(
                  data.prices.cost?.value,
                  data.prices.mayo1?.value || 0,
                  'incr'
                ).toFixed(2)}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                bgcolor: 'background.paper',
                p: 2,
              }}
            >
              <Typography variant='body1'>
                Precio Mayorista 2 ({data.prices.mayo2?.value || 0}%)
              </Typography>
              <Typography variant='body2' color='lightgray'>
                $
                {calculateNumberWithPercentage(
                  data.prices.cost?.value,
                  data.prices.mayo2?.value || 0,
                  'incr'
                ).toFixed(2)}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                bgcolor: 'background.paper',
                p: 2,
              }}
            >
              <Typography variant='body1'>
                Precio Mayorista 3 ({data.prices.mayo3?.value || 0}%)
              </Typography>
              <Typography variant='body2' color='lightgray'>
                $
                {calculateNumberWithPercentage(
                  data.prices.cost?.value,
                  data.prices.mayo3?.value || 0,
                  'incr'
                ).toFixed(2)}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                bgcolor: 'background.paper',
                p: 2,
              }}
            >
              <Typography variant='body1'>
                Precio Mayorista 4 ({data.prices.mayo4?.value || 0}%)
              </Typography>
              <Typography variant='body2' color='lightgray'>
                $
                {calculateNumberWithPercentage(
                  data.prices.cost?.value,
                  data.prices.mayo4?.value || 0,
                  'incr'
                ).toFixed(2)}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                bgcolor: 'background.paper',
                p: 2,
              }}
            >
              <Typography variant='body1'>
                Precio Revendedor ({data.prices.reseller?.value || 0}%)
              </Typography>
              <Typography variant='body2' color='lightgray'>
                $
                {calculateNumberWithPercentage(
                  data.prices.cost?.value,
                  data.prices.reseller?.value || 0,
                  'incr'
                ).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>

          <List sx={styles.fullWidthCard}>
            {hasPhysicalStock ? (
              stockInfo.map(({ key, value }) => (
                <CustomListItem
                  key={key}
                  width={`calc((100% / ${stockInfo.length}) - 24px)`}
                  title={translateStock(key as keyof Product['stock'])}
                  value={String(value)}
                />
              ))
            ) : (
              <CustomListItem
                width='calc(100% - 24px)'
                title='Sin stock físico'
                value=''
              />
            )}
          </List>

          <List sx={styles.fullWidthCard}>
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

          {prepareDataForDisplay(data).map(({ title, value }) => (
            <CustomListItem
              key={title}
              width='calc(50% - 24px)'
              title={title}
              value={value}
            />
          ))}

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

          {hasProviderProductCode ? (
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

export default ProductDetail;

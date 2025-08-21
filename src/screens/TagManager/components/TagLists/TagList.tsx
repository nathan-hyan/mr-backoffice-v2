import { Fragment, useState } from 'react';
import { DeleteForeverRounded, EditRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import { Tag } from 'types/data';
import { Nullable } from 'vite-env';

import CustomMenu from '~components/CustomMenu';

import DeleteAlert from '../../../../components/DeleteAlert';

interface Props {
  removeDocument: (documentId: string, callback?: () => void) => void;
  data: Tag[];
  selectedTagId: Nullable<string>;
  openModal: (tag?: Tag) => void;
}

function TagList({ removeDocument, data, selectedTagId, openModal }: Props) {
  const [markedForDeletion, setMarkedForDeletion] =
    useState<Nullable<string>>(null);

  const handleDeleteTag = () => {
    if (markedForDeletion) {
      removeDocument(markedForDeletion);
    }
    setMarkedForDeletion(null);
  };

  const handleEditTag = (tag: Tag) => {
    openModal(tag);
  };

  return (
    <>
      <DeleteAlert
        open={Boolean(markedForDeletion)}
        onClose={() => setMarkedForDeletion(null)}
        onDelete={handleDeleteTag}
        stringToMatch={
          markedForDeletion
            ? data.find(({ id }) => id === markedForDeletion)?.tag || ''
            : ''
        }
      />
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='button'>Lista de Tags</Typography>
            <CustomMenu>
              <MenuItem onClick={() => openModal()}>Agregar un tag</MenuItem>
              {data.length > 0 && selectedTagId && (
                <>
                  <MenuItem
                    onClick={() =>
                      handleEditTag(
                        data.find(({ id }) => id === selectedTagId)!
                      )
                    }
                  >
                    Modificar tag
                  </MenuItem>
                  <MenuItem onClick={() => setMarkedForDeletion(selectedTagId)}>
                    Quitar tag
                  </MenuItem>
                </>
              )}
            </CustomMenu>
          </Box>
          <List>
            {data.length > 0 ? (
              data.map((tag, index) => (
                <Fragment key={tag.id}>
                  <ListItemButton
                    selected={tag.id === selectedTagId}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <ListItemText>{tag.tag}</ListItemText>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size='small'
                        color='primary'
                        onClick={() => openModal(tag)}
                      >
                        <EditRounded />
                      </IconButton>
                      <IconButton
                        size='small'
                        color='error'
                        onClick={() => setMarkedForDeletion(tag.id!)}
                      >
                        <DeleteForeverRounded />
                      </IconButton>
                    </Box>
                  </ListItemButton>
                  {index + 1 !== data.length && <Divider />}
                </Fragment>
              ))
            ) : (
              <>
                <ListItemText sx={{ textAlign: 'center', mb: 3 }}>
                  No se encontraron tags
                </ListItemText>
                <ListItemText sx={{ textAlign: 'center' }}>
                  <Button variant='contained' onClick={() => openModal()}>
                    Agregar un tag
                  </Button>
                </ListItemText>
              </>
            )}
          </List>
        </Paper>
      </Grid>
    </>
  );
}

export default TagList;

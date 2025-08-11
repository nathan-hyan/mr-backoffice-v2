import { Fragment, useState } from 'react';
import { ArrowForward } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Switch,
  Typography,
} from '@mui/material';
import { Department } from 'types/data';
import { Nullable } from 'vite-env';

import CustomMenu from '~components/CustomMenu';

import DeleteAlert from '../../../../components/DeleteAlert';

interface Props {
  data: Department[];
  selectedDepartment: Nullable<Department>;
  handleSelectDepartment: (dep: Department) => void;

  openModal: (dep?: Department) => void;
  removeDepartment: (id: string) => void;

  onToggleActive: (id: string, isActive: boolean) => void;
}

function DepartmentList({
  data,
  selectedDepartment,
  handleSelectDepartment,
  openModal,
  removeDepartment,
  onToggleActive,
}: Props) {
  const [markedForDeletion, setMarkedForDeletion] =
    useState<Nullable<string>>(null);

  const handleDeleteDepartment = () => {
    if (markedForDeletion) removeDepartment(markedForDeletion);
    setMarkedForDeletion(null);
  };

  const handleEditDepartment = (dep: Department) => {
    openModal(dep);
  };

  return (
    <>
      <DeleteAlert
        open={Boolean(markedForDeletion)}
        onClose={() => setMarkedForDeletion(null)}
        onDelete={handleDeleteDepartment}
        stringToMatch={
          markedForDeletion
            ? data.find(({ id }) => id === markedForDeletion)?.name || ''
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
            <Typography variant='button'>Lista de Departamentos</Typography>
            <CustomMenu>
              <MenuItem onClick={() => openModal()}>
                Agregar un departamento
              </MenuItem>
              {data.length > 0 && selectedDepartment?.id && (
                <>
                  <MenuItem
                    onClick={() => handleEditDepartment(selectedDepartment)}
                  >
                    Modificar departamento
                  </MenuItem>
                  <MenuItem
                    onClick={() => setMarkedForDeletion(selectedDepartment.id!)}
                  >
                    Quitar departamento
                  </MenuItem>
                </>
              )}
            </CustomMenu>
          </Box>
          <List>
            {data.length > 0 ? (
              data.map((dep, index) => (
                <Fragment key={dep.internalId}>
                  <ListItemButton
                    selected={dep.internalId === selectedDepartment?.internalId}
                    onClick={() => handleSelectDepartment(dep)}
                  >
                    <ListItemIcon>
                      <ArrowForward />
                    </ListItemIcon>
                    <Avatar
                      src={dep.imageURL?.[0] || undefined}
                      sx={{ width: 32, height: 32, mr: 1 }}
                    />
                    <ListItemText>{dep.name}</ListItemText>

                    <Switch
                      checked={dep.active}
                      onChange={() => onToggleActive(dep.id!, !dep.active)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </ListItemButton>
                  {index + 1 !== data.length && <Divider />}
                </Fragment>
              ))
            ) : (
              <>
                <ListItemText sx={{ textAlign: 'center', mb: 3 }}>
                  No se encontraron departamentos
                </ListItemText>
                <ListItemText sx={{ textAlign: 'center' }}>
                  <Button variant='contained' onClick={() => openModal()}>
                    Agregar un departamento
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

export default DepartmentList;

import { Fragment } from 'react';
import { ArrowForward } from '@mui/icons-material';
import {
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
  Typography,
} from '@mui/material';
import { Department } from 'types/data';

import CustomMenu from '~components/CustomMenu';

interface Props {
  data: Department[];
  selectedDepartment: Department | null;
  handleSelectDepartment: (dep: Department) => void;
  openModal: () => void;
}

function DepartmentList({
  data,
  selectedDepartment,
  handleSelectDepartment,
  openModal,
}: Props) {
  return (
    <Grid item xs={12}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='button'>Lista de Departamentos</Typography>
          <CustomMenu>
            <MenuItem onClick={openModal}>Agregar un departamento</MenuItem>
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
                  <ListItemText>{dep.name}</ListItemText>
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
                <Button variant='contained' onClick={openModal}>
                  Agregar un departamento
                </Button>
              </ListItemText>
            </>
          )}
        </List>
      </Paper>
    </Grid>
  );
}

export default DepartmentList;

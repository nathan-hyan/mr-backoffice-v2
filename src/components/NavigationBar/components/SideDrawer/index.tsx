import { useNavigate } from 'react-router-dom';
import { Divider, Drawer, List, Typography } from '@mui/material';

import { ROUTES } from '~config/routes';

import Option from './components/Option';

interface Props {
  drawer: boolean;
  handleDrawer: () => void;
}

function SideDrawer({ drawer, handleDrawer }: Props) {
  const navigate = useNavigate();

  const handleNavigate = (whereTo: string) => () => {
    navigate(whereTo);
    handleDrawer();
  };

  return (
    <Drawer anchor='left' open={drawer} onClose={handleDrawer}>
      <List sx={{ width: 300 }}>
        <Typography
          variant='h5'
          sx={{
            textAlign: 'center',
            py: 2,
            fontWeight: 'bold',
          }}
        >
          StockOS v2
        </Typography>
        <Divider />

        {ROUTES.map(
          ({ id, path, title, icon }) =>
            icon && (
              <Option
                key={id}
                handleNavigate={handleNavigate(path)}
                icon={icon}
                title={title}
              />
            )
        )}
      </List>
    </Drawer>
  );
}

export default SideDrawer;

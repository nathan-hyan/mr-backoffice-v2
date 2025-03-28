import { useNavigate } from 'react-router-dom';
import { Divider, Drawer, List, Typography } from '@mui/material';

import {
  ROUTES,
  ROUTESA,
  ROUTESB,
  ROUTESC,
  ROUTESD,
  ROUTESE,
  ROUTESF,
} from '~config/routes';

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
      <List sx={{ width: 300, backgroundColor: 'white', color: 'black' }}>
        <Typography
          variant='h5'
          sx={{
            textAlign: 'center',
            py: 2,
            fontWeight: 'bold',
            backgroundColor: 'white',
            color: 'black',
          }}
        >
          StockOS v2
        </Typography>
        <Divider sx={{ backgroundColor: 'black' }} />

        {ROUTES.map(({ id, path, title, icon }) =>
          icon ? (
            <Option
              key={`route-${id}`}
              handleNavigate={handleNavigate(path)}
              icon={icon}
              title={title}
            />
          ) : null
        )}

        <div>
          <Typography variant='h6' sx={{ px: 2, mt: 2, fontSize: '15px' }}>
            POINT OF SALE
          </Typography>
          {ROUTESA.map(({ id, path, title, icon }) =>
            icon ? (
              <Option
                key={`routeA-${id}`}
                handleNavigate={handleNavigate(path)}
                icon={icon}
                title={title}
              />
            ) : null
          )}
        </div>

        <div>
          <Typography variant='h6' sx={{ px: 2, mt: 2, fontSize: '15px' }}>
            INVENTARIO
          </Typography>
          {ROUTESB.map(({ id, path, title, icon }) =>
            icon ? (
              <Option
                key={`routeB-${id}`}
                handleNavigate={handleNavigate(path)}
                icon={icon}
                title={title}
              />
            ) : null
          )}
        </div>

        <div>
          <Typography variant='h6' sx={{ px: 2, mt: 2, fontSize: '15px' }}>
            CLIENTES
          </Typography>
          {ROUTESC.map(({ id, path, title, icon }) =>
            icon ? (
              <Option
                key={`routeC-${id}`}
                handleNavigate={handleNavigate(path)}
                icon={icon}
                title={title}
              />
            ) : null
          )}
        </div>

        <div>
          <Typography variant='h6' sx={{ px: 2, mt: 2, fontSize: '15px' }}>
            PROVEEDORES
          </Typography>
          {ROUTESD.map(({ id, path, title, icon }) =>
            icon ? (
              <Option
                key={`routeD-${id}`}
                handleNavigate={handleNavigate(path)}
                icon={icon}
                title={title}
              />
            ) : null
          )}
        </div>

        <div>
          <Typography variant='h6' sx={{ px: 2, mt: 2, fontSize: '15px' }}>
            ECOMMERCE
          </Typography>
          {ROUTESE.map(({ id, path, title, icon }) =>
            icon ? (
              <Option
                key={`routeE-${id}`}
                handleNavigate={handleNavigate(path)}
                icon={icon}
                title={title}
              />
            ) : null
          )}
        </div>

        <div>
          <Typography variant='h6' sx={{ px: 2, mt: 2, fontSize: '15px' }}>
            ANALYTICS
          </Typography>
          {ROUTESF.map(({ id, path, title, icon }) =>
            icon ? (
              <Option
                key={`routeF-${id}`}
                handleNavigate={handleNavigate(path)}
                icon={icon}
                title={title}
              />
            ) : null
          )}
        </div>
      </List>
    </Drawer>
  );
}

export default SideDrawer;

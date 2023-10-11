import { useNavigate } from 'react-router-dom';
import { AttachMoney } from '@mui/icons-material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PrintIcon from '@mui/icons-material/Print';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';

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
        <Drawer anchor="left" open={drawer} onClose={handleDrawer}>
            <List sx={{ width: 300 }}>
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        py: 2,
                        fontWeight: 'bold',
                    }}
                >
                    StockOS v2
                </Typography>
                <Divider />

                <ListItem disablePadding>
                    <ListItemButton onClick={handleNavigate('/products')}>
                        <ListItemIcon>
                            <FormatListNumberedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Listado de Productos" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleNavigate('/cart')}>
                        <ListItemIcon>
                            <ShoppingCartCheckoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Carrito" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleNavigate('/printList')}>
                        <ListItemIcon>
                            <PrintIcon />
                        </ListItemIcon>
                        <ListItemText primary="Imprimir list. productos" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleNavigate('/priceModifier')}>
                        <ListItemIcon>
                            <AttachMoney />
                        </ListItemIcon>
                        <ListItemText primary="Modificar precios en lote" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}

export default SideDrawer;

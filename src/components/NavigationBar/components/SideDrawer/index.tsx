import { useNavigate } from 'react-router-dom';
import { Divider, Drawer, List, Typography } from '@mui/material';

import Option from './components/Option';
import { OPTIONS } from './constants';

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

                {OPTIONS.map(({ id, whereTo, title, icon }) => (
                    <Option
                        key={id}
                        handleNavigate={handleNavigate(whereTo)}
                        icon={icon}
                        title={title}
                    />
                ))}
            </List>
        </Drawer>
    );
}

export default SideDrawer;

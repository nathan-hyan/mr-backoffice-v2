import { ReactNode } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

interface Props {
  handleNavigate: () => void;
  title: string;
  icon: ReactNode;
}

function Option({ handleNavigate, title, icon }: Props) {
  return (
    <ListItem
      sx={{
        backgroundColor: 'white',
        color: 'black',
      }}
      disablePadding
    >
      <ListItemButton
        sx={{
          padding: '5px',
        }}
        onClick={handleNavigate}
      >
        <ListItemIcon
          sx={{
            color: 'black',
            fontSize: '10px',
            paddingLeft: '20px',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          sx={{
            margin: '0px',
          }}
          primary={title}
        />
      </ListItemButton>
    </ListItem>
  );
}
export default Option;

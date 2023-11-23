import { ListItem, ListItemText } from '@mui/material';

interface Props {
  title: string;
  value: string;
  width?: string;
}

function CustomListItem({ title, value, width }: Props) {
  return (
    <ListItem sx={{ bgcolor: 'background.paper', width }}>
      <ListItemText primary={title} secondary={value} />
    </ListItem>
  );
}

CustomListItem.defaultProps = {
  width: undefined,
};

export default CustomListItem;

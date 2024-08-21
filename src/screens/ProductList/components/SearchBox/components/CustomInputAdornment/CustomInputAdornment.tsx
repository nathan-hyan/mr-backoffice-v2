import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton, InputAdornment } from '@mui/material';

function CustomInputAdornment() {
  return (
    <InputAdornment position='end'>
      <IconButton color='warning' type='reset'>
        <HighlightOffIcon />
      </IconButton>
      <IconButton color='primary' type='submit'>
        <ArrowForwardIcon />
      </IconButton>
    </InputAdornment>
  );
}
export default CustomInputAdornment;

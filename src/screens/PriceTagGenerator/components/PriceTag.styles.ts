import { colors, SxProps, Theme } from '@mui/material';

import mrLogo from '~assets/logo-black.svg';

const { green, amber, pink, common, grey } = colors;

let color: string;

export const container: SxProps<Theme> = {
  display: 'flex',
  border: '1px solid black',
  maxWidth: '365px',
};

export const infoSide: SxProps<Theme> = {
  width: '60%',
  backgroundColor: grey[100],
  color: common.black,
  p: 1,
};

export const productName: SxProps<Theme> = {
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: '4',
  lineClamp: '4',
  WebkitBoxOrient: 'vertical',
  height: 'calc(1.5rem * 2)',
  lineHeight: '0.8rem',
  fontWeight: '700',
};

export const priceSide: (
  variant?: 'green' | 'pink' | 'yellow'
) => SxProps<Theme> = (variant) => {
  switch (variant) {
    case 'green':
      color = green['500'];
      break;

    case 'pink':
      color = pink['300'];
      break;

    case 'yellow':
    default:
      color = amber['500'];
      break;
  }

  return {
    width: '40%',
    backgroundColor: color,
    backgroundImage: `url(${mrLogo})`,
    backgroundSize: '20%',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: '5%',
    backgroundPositionX: '95%',
    color: common.black,
    p: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    a: {
      color: common.black,
      textDecoration: 'none',
    },
  };
};

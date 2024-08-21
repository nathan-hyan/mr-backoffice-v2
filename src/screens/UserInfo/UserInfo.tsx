import { Paper, Typography } from '@mui/material';

import useUserContext from '~contexts/User';
import { roleTranslator } from '~utils/roleTranslator';

function UserInfo() {
  const { user } = useUserContext();

  return (
    <Paper sx={{ p: 3 }}>
      <Typography>Privilegios: {roleTranslator(user?.role)}</Typography>
    </Paper>
  );
}
export default UserInfo;

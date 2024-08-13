import { UserRoles } from '~constants/firebase';

function roleTranslator(role?: UserRoles) {
  switch (role) {
    case UserRoles.Admin:
      return 'Administrador';

    case UserRoles.Employee:
      return 'Emplead@';

    case UserRoles.Customer:
    default:
      return 'Cliente';
  }
}

export default roleTranslator;

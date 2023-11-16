import { UserRoles } from '~constants/firebase';

export function roleTranslator(role?: UserRoles) {
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

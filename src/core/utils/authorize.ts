import { UserAccessRole, UserEntity } from 'modules/user/user.entity';

/**
 * isSalesman
 * @param { accessRole } User
 * @return boolean
 */
export function isSalesman({ accessRole }: UserEntity): boolean {
  return accessRole === UserAccessRole.Salesman;
}

/**
 * isAdmin
 * @param { accessRole } User
 * @return boolean
 */
export function isAdmin({ accessRole }: UserEntity): boolean {
  return (
    accessRole === UserAccessRole.Admin ||
    accessRole === UserAccessRole.SuperAdmin
  );
}

/**
 * isSuperAdmin Checking if requested user is an Super admin
 * @param { accessRole } User
 * @return boolean
 */
export function isSuperAdmin({ accessRole }: UserEntity): boolean {
  return accessRole === UserAccessRole.SuperAdmin;
}

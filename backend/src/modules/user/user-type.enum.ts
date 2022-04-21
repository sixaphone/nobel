export enum UserType {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  WORKER = 'WORKER',
  FINANCE = 'FINANCE',
  LOGISTIC = 'LOGISTIC',
}

export const ACCESSIBLE_TYPES = {
  [UserType.ADMIN]: Object.values(UserType),
  [UserType.MANAGER]: [
    UserType.MANAGER,
    UserType.WORKER,
    UserType.FINANCE,
    UserType.LOGISTIC,
  ],
};

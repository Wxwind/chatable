export enum AccountType {
  PHONE = 'phone',
  EMAIL = 'email',
  INVALID = 'invalid',
}

export function getAccountType(value: string): AccountType {
  const phoneRegex = /^1[3-9]\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (phoneRegex.test(value)) return AccountType.PHONE;
  if (emailRegex.test(value)) return AccountType.EMAIL;
  return AccountType.INVALID;
}

export function isEmpty(strValue: string) {
  if (strValue?.length > 0) {
    return false;
  } else {
    return true;
  }
}
export function isLessThenMinimumLength(value: string, minLength: number) {
  return value.length < minLength;
}
export function isValidEmail(email: string) {
  return email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+([.]{1})+[a-z]{2,}$/);
}

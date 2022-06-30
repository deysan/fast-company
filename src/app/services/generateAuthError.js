export function generateAuthError(message) {
  switch (message) {
    case 'USER_DISABLED':
      return 'Учетная запись пользователя отключена администратором.';
    case 'EMAIL_NOT_FOUND':
    case 'INVALID_PASSWORD':
    case 'INVALID_EMAIL':
      return 'Неверный email или пароль';
    case 'EMAIL_EXISTS':
      return 'Пользователь с таким Email уже существует';
    default:
      return 'Слишком много попыток входа, попробуйте позже';
  }
}

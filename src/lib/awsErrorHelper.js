export function handleError(code) {
    switch (code) {
        case 'UsernameExistsException':
            return 'Пользователь с указанным адресом электронной почты уже существует.'
        case 'NotAuthorizedException':
            return 'Неверное имя пользователя или пароль.'
        case 'UserNotFoundException':
            return 'Пользователь не существует.'
        default:
            return 'Произошла ошибка и мы не смогли получить ваши данные ... Печально.'
    }
}
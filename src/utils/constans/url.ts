export const URL = ' https://marathon-api.clevertec.ru';
export const IMAGE_API = 'https://training-api.clevertec.ru';

export const Path = {
    Root: '/',
    Main: '/main',
    Login: '/auth',
    Register: '/auth/registration',
    Result: '/result',
    ResulError: '/result/error',
    ErrorLogin: '/result/error-login',
    RegistrationSucsses: '/result/success',
    ErrorUserExsist: '/result/error-user-exist',
    CheckEmailNoExsist: '/result/error-check-email-no-exist',
    CheckEmail: '/result/error-check-email',
    ConfirmEmail: '/auth/confirm-email',
    ChangePasword: '/auth/change-password',
    ErrorChangePassword: '/result/error-change-password',
    SuccsesChangePasword: '/result/success-change-password',
    Feetbacks: '/feedbacks',
    Calendar: '/main/calendar',
    Profile: '/profile',
    Settings: '/settings',
    MyTrenings: '/training',
    Achievement: '/achievements',
} as const;

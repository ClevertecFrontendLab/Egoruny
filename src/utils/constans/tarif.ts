export const tarifsOpportunities = [
    {
        text: 'Статистика за месяц',
        includeInFree: true,
    },
    {
        text: 'Статистика за всё время',
        includeInFree: false,
    },
    {
        text: 'Совместные тренировки',
        includeInFree: true,
    },
    {
        text: 'Участие в марафонах',
        includeInFree: false,
    },
    {
        text: 'Приложение iOS',
        includeInFree: false,
    },
    {
        text: 'Приложение Android',
        includeInFree: false,
    },
    {
        text: 'Индивидуальный Chat GPT',
        includeInFree: false,
    },
];

export const tariffOptions = [
    {
        text: 'Открыт для совместных тренировок',
        tooltip: 'включеная функция позволит участвовать в совместных тренировках',
        name: 'readyForJointTraining',
        availableInPro: false,
        dataTestId: 'tariff-trainings',
        dataTestIdTooltip: 'tariff-trainings-icon',
    },
    {
        text: 'Уведомления',
        tooltip: 'включеная функция позволит получать уведомления об активностях',
        name: 'sendNotification',
        availableInPro: false,
        dataTestId: 'tariff-notifications',
        dataTestIdTooltip: 'tariff-notifications-icon',
    },
    {
        text: 'Тёмная тема',
        tooltip: 'темная тема доступна для PRO tarif',
        availableInPro: true,
        dataTestId: 'tariff-theme',
        dataTestIdTooltip: 'tariff-theme-icon',
    },
];

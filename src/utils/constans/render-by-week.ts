import moment, { Moment } from 'moment';

export const renderLoadByWeek = (data) => {
    const groupeData = [];

    const sortedData = data.sort(
        (a, b) => moment(a.date, 'DD.MM').valueOf() - moment(b.date, 'DD.MM').valueOf(),
    );

    let weekStart: Moment | null = null;
    let weekEnd: Moment | null = null;
    let weekData = [];

    sortedData.forEach((item) => {
        const itemDate = moment(item.date, 'DD.MM');

        if (weekStart === null) {
            weekStart = itemDate.clone().startOf('isoWeek');
            weekEnd = itemDate.clone().endOf('isoWeek');
        }

        if (itemDate.isBetween(weekStart, weekEnd, null, '[]')) {
            weekData.push(item);
        } else {
            groupeData.push({
                weekStart: weekStart,
                weekEnd: weekEnd,
                data: weekData,
            });

            weekStart = itemDate.clone().startOf('isoWeek');
            weekEnd = itemDate.clone().endOf('isoWeek');
            weekData = [item];
        }
    });

    groupeData.push({
        weekStart: weekStart,
        weekEnd: weekEnd,
        data: weekData,
    });

    return groupeData;
};

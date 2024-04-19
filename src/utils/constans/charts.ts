import { Moment } from 'moment';

export const pieConfig = (
    exerciseArray: Array<{ name: string | undefined; count: number; date: string | Moment }>,
) => ({
    data: exerciseArray,
    angleField: 'count',
    colorField: 'name',
    innerRadius: 0.35,
    radius: 0.6,
    label: {
        text: 'name',
        connector: false,
        position: 'outside',
        transform: [
            {
                type: 'contrastReverse',
            },
        ],
        textAlign: 'center',
        style: {
            fontSize: 14,
            fill: '#262626FF',
            fontWeight: 400,
        },
        offset: 45,
    },
    legend: false,
    scale: { color: { palette: 'set3' } },
});

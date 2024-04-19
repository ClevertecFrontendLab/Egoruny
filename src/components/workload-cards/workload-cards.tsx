import { Card, Typography } from 'antd';
import {
    totalLoadForPeriod,
    getTotalApproaches,
    getTotalReplays,
} from '@utils/constans/achievements-helper';

import style from './workload-cards.module.css';

const { Title, Text } = Typography;

const cardTitle = {
    totalLoad: <span>Общая нагрузка, кг</span>,
    dailyLoad: <span>Нагрузка в день, кг</span>,
    totalApproaches: <span>Количество повторений, раз</span>,
    totalReplays: <span>Подходы,раз</span>,
};
const WorkloadCards = ({ dataSource, isMonth }) => {
    const dayinWeek = 7;
    const dayinMonth = 28;
    const dayInPeriod = isMonth ? dayinMonth : dayinWeek;
    const totalLoad = totalLoadForPeriod(dataSource);

    const divisionResult = totalLoad / dayInPeriod;
    const dailyLoad = divisionResult % 1 === 0 ? divisionResult : divisionResult.toFixed(1);

    const cardDataSourse = [
        {
            description: cardTitle.totalLoad,
            key: 'totalLoad',
            value: totalLoadForPeriod(dataSource),
        },
        { description: cardTitle.dailyLoad, key: 'dailyLoad', value: dailyLoad },
        {
            description: cardTitle.totalApproaches,
            key: 'totalApproaches',
            value: getTotalReplays(dataSource),
        },
        {
            description: cardTitle.totalReplays,
            key: 'totalReplays',
            value: getTotalApproaches(dataSource),
        },
    ];

    return (
        <div className={style.card_wrapper}>
            {cardDataSourse.map(({ description, key, value }) => (
                <Card
                    className={style.work_load_cards}
                    bodyStyle={{ padding: '24px', textAlign: 'center' }}
                    key={key}
                >
                    <div className={style.content_card}>
                        <Title style={{ fontWeight: 700 }}>{value}</Title>
                        <div className={style.text}>
                            <Text type='secondary'>{description}</Text>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default WorkloadCards;

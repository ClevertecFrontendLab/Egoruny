import { Typography } from 'antd';
import { getToppPactice, getTopExesise } from '@utils/constans/achievements-helper';

import style from './top-practice-exesise.module.css';

const { Text, Title } = Typography;

const TopPracticeExesise = ({ selectedFilter, filterTranings }) => {
    const isShowTrening = selectedFilter === 'Все';
    const TopExesise = getTopExesise(filterTranings)
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                {isShowTrening && (
                    <div className={style.top_practice_exesise}>
                        <Text type='secondary'>
                            Самая частая
                            <br />
                            тренировка
                        </Text>
                        <Title level={3} style={{ marginTop: 0 }}>
                            {getToppPactice(filterTranings)}
                        </Title>
                    </div>
                )}

                <div className={style.top_practice_exesise}>
                    <div className={style.text}>
                        <Text type='secondary'>Самое частое упражнение</Text>
                    </div>
                    <Title level={3} style={{ marginTop: 0 }}>
                        {TopExesise.name}
                    </Title>
                </div>
            </div>
        </div>
    );
};

export default TopPracticeExesise;

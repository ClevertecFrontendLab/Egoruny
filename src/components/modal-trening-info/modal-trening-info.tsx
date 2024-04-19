import { Card, Badge, Button, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { PeriodOptions } from '@utils/constans/options';
import moment from 'moment';
import style from './modal-trening-info.module.css';
import { bageColors } from '@utils/constans/bageColors';

const { Text } = Typography;

const ModalTrenngInfo = ({ treningName, exesise, period, date, onClose }) => {
    return (
        <Card
            data-test-id='joint-training-review-card'
            className={style.info_card}
            bodyStyle={{ padding: '0' }}
        >
            <div className={style.header}>
                <Badge color={bageColors.get(treningName)} text={treningName} />
                <Button icon={<CloseOutlined />} className={style.close_btn} onClick={onClose} />
            </div>
            <div className={style.exercises_wrapper}>
                <div className={style.period_date}>
                    <div className={style.period}>
                        {period ? PeriodOptions[period - 1].label : ''}
                    </div>
                    <div className={style.date}>{moment(date).format('DD.MM.YYYY')}</div>
                </div>
                <div className={style.exercises}>
                    {exesise.map(({ approaches, replays, weight, name }) => (
                        <div className={style.exercise}>
                            <div>
                                <Text type='secondary'>{name}</Text>
                            </div>
                            <div className={style.replays}>
                                {approaches} x ({replays})
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default ModalTrenngInfo;

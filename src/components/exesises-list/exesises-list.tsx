import { Badge, List, Typography } from 'antd';
import moment from 'moment';
import { dayOfWeek } from '../../utils/constans/dayOfWeek';

import 'moment/locale/ru';

import style from './exesises-list.module.css';

const { Text } = Typography;

const ExesisesList = ({ dataSourse, isMonth }) => {
    const dataExesises = [...dataSourse].sort((a, b) => {
        const dayA = moment(a.date, 'DD.MM').isoWeekday();
        const dayB = moment(b.date, 'DD.MM').isoWeekday();
        return dayA - dayB;
    });

    return (
        <div className={style.wrapper_week}>
            <div className={style.title}>
                Самые частые упражнения
                <br /> по дням недели {isMonth && 'за месяц'}
            </div>
            <List
                itemLayout='horizontal'
                dataSource={dataExesises}
                renderItem={({ date, name }, index) => {
                    const weekDay = dayOfWeek(moment(date, 'DD.MM').format('dddd'));
                    return (
                        <List.Item>
                            <div className={style.render_item_exesises}>
                                <Badge count={index + 1} color='#FF4D4F' />
                                <Text type='secondary'>{weekDay}</Text>

                                <Text style={{ fontWeight: 700 }}>{name}</Text>
                            </div>
                        </List.Item>
                    );
                }}
            ></List>
        </div>
    );
};

export default ExesisesList;

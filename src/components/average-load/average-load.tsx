import { Badge, Collapse, ConfigProvider, List, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useAppSelector } from '@redux/configure-store';
import moment, { Moment } from 'moment';
import style from './average-load.module.css';
import { dayOfWeek } from '@utils/constans/dayOfWeek';
import { renderLoadByWeek } from '@utils/constans/render-by-week';
import PanelContent from '@components/panel-content/panel-content';
import { desctopVersionSelect } from '@redux/slise/select';

const { Panel } = Collapse;
const { Text, Title } = Typography;

const AvargeLoad = ({ dataSourse, isMonth }) => {
    const desctopVersion = useAppSelector(desctopVersionSelect);
    const colorBadge = '#2F54EBFF';
    const dataSourseSort = [...dataSourse].sort((a, b) => {
        const dayA = moment(a.date, 'DD.MM').isoWeekday();
        const dayB = moment(b.date, 'DD.MM').isoWeekday();
        return dayA - dayB;
    });

    const panelRender = renderLoadByWeek(dataSourse);
    moment.locale('ru');
    const panelDataRender = panelRender.map((weekData, index) => ({
        key: `week${index + 1}`,
        header: `${'Неделя'} ${
            weekData.weekStart && (weekData.weekStart as Moment).format('DD.MM')
        } - ${weekData.weekEnd && (weekData.weekEnd as Moment).format('DD.MM')}`,
        data: weekData.data,
    }));

    const panelKeys = ['week1', 'week2', 'week3', 'week4'];

    return !isMonth ? (
        <div className={style.wrapper_week}>
            <div className={style.title}>
                Средняя нагрузка <br />
                по дням недели
            </div>

            <List
                itemLayout='horizontal'
                dataSource={dataSourseSort}
                renderItem={(item, index) => {
                    const weekDay = dayOfWeek(moment(item.date, 'DD.MM').format('dddd'));
                    const getColor = item.value;
                    return (
                        <List.Item>
                            <div className={style.render_item}>
                                <Badge
                                    count={index + 1}
                                    style={{
                                        backgroundColor: getColor ? colorBadge : '#F0F5FFFF',
                                        color: getColor ? 'white' : colorBadge,
                                        marginRight: '16px',
                                    }}
                                />
                                <Text type='secondary'>{weekDay}</Text>

                                <Text style={{ fontWeight: 700 }}>
                                    {' '}
                                    {item.value ? `${item.value} кг` : ''}
                                </Text>
                            </div>
                        </List.Item>
                    );
                }}
            ></List>
        </div>
    ) : (
        <Collapse
            className={desctopVersion ? style.collapse_wrapper_flex : ''}
            defaultActiveKey={panelKeys}
            accordion={false}
            bordered={false}
            expandIconPosition='end'
            ghost={true}
            expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
        >
            {panelDataRender.map((panel) => (
                <Panel
                    key={panel.key}
                    header={panel.header}
                    showArrow={!desctopVersion}
                    collapsible={!desctopVersion ? 'header' : 'disabled'}
                >
                    <PanelContent data={panel.data} bageColor={'#2F54EBFF'} />
                </Panel>
            ))}
        </Collapse>
    );
};

export default AvargeLoad;

import { PageHeader, Breadcrumb, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getTariffsStart } from '@redux/slise/tariff-slice';
import { useAppDispatch } from '@redux/configure-store';

import style from './calendar-header.module.css';

const CalendarHeader = () => {
    const dispath = useAppDispatch();

    const onClick = () => dispath(getTariffsStart());

    return (
        <PageHeader style={{ padding: '4px 24px 16px 24px', background: '#f0f5ff' }}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={'/main'}>Главная</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Календарь</Breadcrumb.Item>
            </Breadcrumb>
            <div className={style.set_btn_container}>
                <Button
                    className={style.set_button}
                    icon={<SettingOutlined />}
                    size='middle'
                    type='text'
                    onClick={onClick}
                >
                    <span className={style.button_text}>Настройки</span>
                </Button>
            </div>
        </PageHeader>
    );
};

export default CalendarHeader;

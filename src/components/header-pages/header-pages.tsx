import { PageHeader, Button, Breadcrumb } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { useAppDispatch } from '@redux/configure-store';
import { getTariffsStart } from '@redux/slise/tariff-slice';
import { Path } from '@utils/constans/url';

import style from './header-pages.module.css';

type HeaderPropsType = {
    breadcrumbItem: string;
};

const HeaderPages = ({ breadcrumbItem }: HeaderPropsType) => {
    const dispatch = useAppDispatch();
    const onClick = () => dispatch(getTariffsStart());
    return (
        <PageHeader style={{ padding: '4px 24px 16px 24px', background: '#f0f5ff' }}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={Path.Main}>Главная</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{breadcrumbItem}</Breadcrumb.Item>
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

export default HeaderPages;

import { Layout, PageHeader, Button, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import PrivacyAuthorization from '@components/privacy-authorization/privacy-authorization';
import style from './profile-page.module.css';
import { useAppDispatch, useAppSelector } from '@redux/configure-store';
import { putProfileError, putProfileSaccses } from '@redux/slise/profile-slice';
import { getTariffsStart } from '@redux/slise/tariff-slice';
import CastomAlert from '@components/custom-alert/castom-alert';
const { Title } = Typography;
const { Content } = Layout;
const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const success = useAppSelector((state) => state.profile.isProfileSaccses);
    const onCloseAlert = () => dispatch(putProfileSaccses(false));
    const onClick = () => dispatch(getTariffsStart());
    return (
        <>
            <PageHeader className={style.header}>
                <div className={style.header_wrapper}>
                    <Title level={5}>Профиль</Title>
                    <Button
                        data-test-id='header-settings'
                        onClick={onClick}
                        icon={<SettingOutlined />}
                        className={style.set_button}
                        size='middle'
                        type='text'
                    >
                        <span className={style.button_text}>Настройки</span>
                    </Button>
                </div>
            </PageHeader>
            <Content className={style.wrapper}>
                <PrivacyAuthorization />
                {success && (
                    <CastomAlert
                        message={'Данные профиля успешно обновлены'}
                        onClose={onCloseAlert}
                    />
                )}
            </Content>
        </>
    );
};

export default ProfilePage;

import { Tabs } from 'antd';
import style from './auth.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../../utils/constans/url';
import MenuLogo from '@components/menu-logo/menu-logo';
import SingIn from '../sing-in/sing-in';
import Registration from './registration/registration';
import Load from '../../../components/loader/loader';
import { useAppSelector } from '@redux/configure-store';
import { isLogedSelect } from '@redux/slise/select';

type AuthTab = (typeof AuthTab)[keyof typeof AuthTab];

const AuthTab = {
    Login: 'login',
    Register: 'register',
};

const Auth = ({ tab = 'login' }: { tab?: AuthTab }) => {
    const navigate = useNavigate();
    const isLoged = useAppSelector(isLogedSelect)
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        if (jwt) {
                navigate(Path.Main);
        }
    }, [jwt, navigate]);

    const onChange = (activeKey: string) => {
        switch (activeKey) {
            case AuthTab.Login:
                navigate(Path.Login);
                break;
            case AuthTab.Register:
                navigate(Path.Register);
                break;

            default:
                break;
        }
    };

    return (
        <>

            <div className={style.modal_wrapper}>
            {isLoged && <Load />}
                <div className={style.modal_wrapper_blur}>
                    <div className={style.modal_wrapper_blur_container}>
                        <MenuLogo className />
                        <div className={style.modal_wrapper_blur_container_content}>
                            <Tabs
                            className={style.tabs}
                                activeKey={tab}
                                onChange={onChange}
                                tabBarStyle={{padding: 0 }}
                                hideAdd
                                size='large'
                                centered
                                items={[
                                    {
                                        label: `Вход`,
                                        key: AuthTab.Login,
                                        children: <SingIn />,
                                    },
                                    {
                                        label: `Регистрация`,
                                        key: AuthTab.Register,
                                        children: <Registration />,
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Auth;

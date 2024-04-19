import { Button, Checkbox, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/configure-store';
import { AuthDataType, ValidateStatus } from '../../../utils/constans/type';
import { useState, useEffect } from 'react';
import { postLoginStart, postFogorPsswordStart, setLogin } from '@redux/slise/auth-slise';
import { emailSelect } from '@redux/slise/select';
import { passwordRegExp, emailRegExp } from '@utils/constans/regExp';
import style from './sing-in.module.css';

const SingIn = () => {
    const [form] = Form.useForm();
    const email = useAppSelector(emailSelect);
    const location = useLocation();
    const [emailStatus, setEmailStatus] = useState<ValidateStatus>('');
    const dispatch = useAppDispatch();
    const [isRemember, setUserInLocalStorage] = useState(false);
    const [disabledForgorPass, setdisabledForgorPass] = useState(true);
    const from = !!location.state?.pathname;

    const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value;
        if (emailRegExp.test(emailValue)) {
            setdisabledForgorPass(false);
            setEmailStatus('');
        } else {
            setdisabledForgorPass(true);
            setEmailStatus('error');
        }
    };

    const onSubmit = ({ password, email }: AuthDataType) => {
        dispatch(postLoginStart({ password, email, isRemember, location }));
    };

    const onFogotPassword = () => {
        const emailValue = form.getFieldValue('email');
        if (emailValue) {
            dispatch(setLogin(emailValue));
            dispatch(postFogorPsswordStart({ email: emailValue, location }));
        } else {
            setEmailStatus('error');
        }
    };

    const rememberUser = () => {
        setUserInLocalStorage(!isRemember);
    };

    useEffect(() => {
        if (from) dispatch(postFogorPsswordStart({ email, location }));
    }, [from, dispatch, location, email]);

    const handleGoogleAuth = () => {
        window.location.href = `https://marathon-api.clevertec.ru/auth/google`;
    };

    return (
        <>
            <Form
                form={form}
                name='normal_login'
                onFinish={onSubmit}
                className='login-form'
                size='large'
                initialValues={{ remember: true }}
            >
                <Form.Item
                    validateStatus={emailStatus}
                    className={style.form_input_email}
                    name='email'
                    rules={[{ required: true, pattern: emailRegExp, message: '' }]}
                >
                    <Input
                        data-test-id='login-email'
                        addonBefore='email:'
                        onChange={validateEmail}
                    />
                </Form.Item>

                <Form.Item
                    className={style.form_input_password}
                    name='password'
                    rules={[{ required: true, pattern: passwordRegExp, message: '' }]}
                    dependencies={['password']}
                >
                    <Input.Password
                        data-test-id='login-password'
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        type='password'
                        placeholder='Пароль'
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name='remember' noStyle>
                        <Checkbox
                            data-test-id='login-remember'
                            className={style.form_checkbox}
                            checked={isRemember}
                            onChange={rememberUser}
                        >
                            Запомнить меня
                        </Checkbox>
                    </Form.Item>

                    <Button
                        data-test-id='login-forgot-button'
                        type='link'
                        size='large'
                        className={style.forgot_passowrd_btn}
                        style={{ height: '24px' }}
                        onClick={onFogotPassword}
                        disabled={disabledForgorPass}
                    >
                        Забыли пароль?
                    </Button>
                </Form.Item>

                <div className={style.form_btn_container}>
                    <Form.Item noStyle>
                        <Button
                            type='primary'
                            data-test-id='login-submit-button'
                            htmlType='submit'
                            block
                            className={style.login_form_button}
                        >
                            Войти
                        </Button>
                    </Form.Item>
                    <Form.Item noStyle>
                        <Button
                            icon={<GooglePlusOutlined />}
                            className={style.google_button}
                            size='large'
                            htmlType='submit'
                            block
                            onClick={handleGoogleAuth}
                        >
                            Войти через Google
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
};

export default SingIn;

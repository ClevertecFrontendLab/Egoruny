import { Button, Layout, Typography, Form, Input, Card } from 'antd';
import { postChengePasswordStart, setPassword, setConfirmPassword } from '@redux/slise/auth-slise';
import { useAppDispatch, useAppSelector } from '../../../redux/configure-store';
import { AuthDataType, ValidateStatus } from '../../../utils/constans/type';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Load from '../../../components/loader/loader';
import { passwordRegExp } from '@utils/constans/regExp';
import { confirmPasswordSelect, passwordSelect,isLogedSelect } from '@redux/slise/select';
const { Title } = Typography;

import style from './change-password.module.css';

const ChangePasword = () => {
    const isLoged = useAppSelector(isLogedSelect)
    const password = useAppSelector(passwordSelect);
    const confirmPassword = useAppSelector(confirmPasswordSelect);
    const [form] = Form.useForm();
    const [formStatus, setFormStatus] = useState(true);
    const [passStatus, setPassStatus] = useState<ValidateStatus>('success');
    const [ConfirmpassStatus, setConfirmPassStatus] = useState<ValidateStatus>('success');
    const dispatch = useAppDispatch();
    const location = useLocation();
    const from = !!location.state?.pathname;

    const validatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value;
        const passwordStatus = passwordRegExp.test(passwordValue) ? '' : 'error';
        setPassStatus(passwordStatus);
    };

    useEffect(() => {
        if (passStatus === '' && ConfirmpassStatus === '') {
            setFormStatus(false);
        } else {
            setFormStatus(true);
        }
    }, [passStatus, ConfirmpassStatus, form]);

    const validatePasswordConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const comparePassworValue = form.getFieldValue('password');
        const passwordValueConfirm = event.target.value;
        if (comparePassworValue === passwordValueConfirm) {
            setConfirmPassStatus('');
        } else {
            setConfirmPassStatus('error');
        }
    };

    const onSubmit = ({ password, confirmPassword }: AuthDataType) => {
        dispatch(setConfirmPassword(form.getFieldValue('confirmPassword')));
        dispatch(setPassword(form.getFieldValue('password')));
        dispatch(postChengePasswordStart({ password, confirmPassword, location }));
    };

    useEffect(() => {
        if (from) dispatch(postChengePasswordStart({ password, confirmPassword, location }));
    }, [from, dispatch, location, confirmPassword, password]);

    return (
        <div className={style.result_wrapper}>
            {isLoged && <Load />}
            <div className={style.result_wrapper_blur}>
                <Layout className={style.error_login_wrpper}>
                    <Card className={style.card}>
                        <Title
                            level={3}
                            className={style.card_title}
                            style={{ marginBottom: '32px' }}
                        >
                            Восстановление аккаунта
                        </Title>
                        <Form form={form} onFinish={onSubmit}>
                            <div className={style.inputs_wrapper}>
                                <Form.Item
                                    validateStatus={passStatus}
                                    hasFeedback={false}
                                    help={
                                        <span className={style.form_register_extra}>
                                            Пароль не менее 8 символов, с заглавной буквой и цифрой
                                        </span>
                                    }
                                    name='password'
                                >
                                    <Input.Password
                                        data-test-id='change-password'
                                        onChange={validatePassword}
                                        size='large'
                                        placeholder='Новый пароль'
                                    />
                                </Form.Item>

                                <Form.Item
                                    validateTrigger='onChange'
                                    validateStatus={ConfirmpassStatus}
                                    help={
                                        ConfirmpassStatus === 'error' ? (
                                            <span className={style.form_register_extra}>
                                                Пароли не совпадают
                                            </span>
                                        ) : (
                                            ''
                                        )
                                    }
                                    name='confirmPassword'
                                >
                                    <Input.Password
                                        data-test-id='change-confirm-password'
                                        size='large'
                                        placeholder='Повторите пароль'
                                        onChange={validatePasswordConfirm}
                                    />
                                </Form.Item>
                            </div>
                            <Button
                                data-test-id='change-submit-button'
                                type='primary'
                                htmlType='submit'
                                size='large'
                                block
                                className={style.button_save_password}
                                disabled={formStatus}
                            >
                                Сохранить
                            </Button>
                        </Form>
                    </Card>
                </Layout>
            </div>
        </div>
    );
};

export default ChangePasword;

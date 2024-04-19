import { Input, Typography, Form, Button, DatePicker, FormProps } from 'antd';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@redux/configure-store';
import { putProfileStart } from '@redux/slise/profile-slice';
import moment from 'moment';
import { IMAGE_API } from '@utils/constans/url';
import { passwordRegExp, emailRegExp } from '@utils/constans/regExp';
import { desctopVersionSelect } from '@redux/slise/select';
import { ValidateStatus } from '../../utils/constans/type';
import { setUrl } from '@redux/slise/profile-slice';
import ProfileUpload from '@components/profile-upload/profile-upload';
import ClanedarNotVarificationModal from '@pages/calendar-page/calendar-modal/calendar-not-varification-modal/calendar-not-varification-modal';
import style from './privacy-authorization.module.css';

const { Title } = Typography;
const PrivacyAuthorization = () => {
    const desctopVersion = useAppSelector(desctopVersionSelect);
    const updateUserError = useAppSelector((state) => state.profile.isProfileError);
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [disabled, setDisabled] = useState(true);
    const [passStatus, setPassStatus] = useState<ValidateStatus>('success');
    const [ConfirmpassStatus, setConfirmPassStatus] = useState<ValidateStatus>('success');
    const profile = useAppSelector((state) => state.profile.profile);
    const comparePassworValue = form.getFieldValue('password');

    const validatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value;
        const passStatus = passwordRegExp.test(passwordValue) ? '' : 'error';
        setPassStatus(passStatus);
    };

    const validatePasswordConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValueConfirm = event.target.value;
        const comparePassworStatus = comparePassworValue === passwordValueConfirm ? '' : 'error';
        setConfirmPassStatus(comparePassworStatus);
    };

    const onFinish = (value) => {
        const newValue = value;
        newValue.birthday = moment(newValue.birthday).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        if (newValue.imgSrc.file?.status === 'removed') {
            newValue.imgSrc = '';
        } else {
            newValue.imgSrc = `${IMAGE_API}${newValue.imgSrc.file?.response?.url}`;
        }
        dispatch(putProfileStart(newValue));
        setDisabled(true);
        form.setFieldValue('password', '');
        form.setFieldValue('confirmPassword', '');
    };

    const onFieldsChange: FormProps['onFieldsChange'] = (values) => {
        if (values[0].name[0] === 'imgSrc' && values[0].value?.file.error) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };

    return (
        <>
            <div className={style.wrapper}>
                <Form
                    onFieldsChange={onFieldsChange}
                    initialValues={{
                        ...profile,
                        birthday: profile?.birthday && moment(profile.birthday),
                    }}
                    onFinish={onFinish}
                    form={form}
                >
                    <div className={style.privacy_information}>
                        <ProfileUpload imgSrc={profile?.imgSrc as string} />
                        <div className={style.privacy_information_form}>
                            <Title level={4} style={{ marginBottom: '16px' }}>
                                Личная информация
                            </Title>
                            <Form.Item name='firstName'>
                                <Input placeholder='Имя' size='large' data-test-id='profile-name' />
                            </Form.Item>
                            <Form.Item name='lastName'>
                                <Input
                                    placeholder='Фамилия'
                                    size='large'
                                    data-test-id='profile-surname'
                                />
                            </Form.Item>
                            <Form.Item name='birthday'>
                                <DatePicker
                                    data-test-id='profile-birthday'
                                    format='DD.MM.YYYY'
                                    className={style.datepicker}
                                    placeholder='Дата рождения'
                                    size='large'
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className={style.title}>
                        <Title level={4} style={{ marginBottom: '16px' }}>
                            Приватность и авторизация
                        </Title>
                    </div>
                    <Form.Item
                        rules={[{ required: true, message: '', pattern: emailRegExp }]}
                        name='email'
                    >
                        <Input addonBefore='email:' size='large' data-test-id='profile-email' />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        validateStatus={passStatus}
                        className={style.password}
                        help={
                            <span className={style.help_text}>
                                Пароль не менее 8 символов с заглавной буквой и цифрой
                            </span>
                        }
                        rules={[{ pattern: passwordRegExp }]}
                    >
                        <Input.Password
                            data-test-id='profile-password'
                            placeholder='Пароль'
                            size='large'
                            onChange={validatePassword}
                        />
                    </Form.Item>
                    <Form.Item
                        validateTrigger='onChange'
                        rules={[{ pattern: passwordRegExp }]}
                        help={
                            ConfirmpassStatus === 'error' ? (
                                <span className={style.form_register_extra}>
                                    Пароли не совпадают
                                </span>
                            ) : (
                                ''
                            )
                        }
                        validateStatus={ConfirmpassStatus}
                        className={style.repeat_password}
                        name='confirmPassword'
                    >
                        <Input.Password
                            data-test-id='profile-repeat-password'
                            placeholder='Повторите пароль'
                            size='large'
                            onChange={validatePasswordConfirm}
                        />
                    </Form.Item>
                    <Button
                        data-test-id='profile-submit'
                        disabled={disabled}
                        size='large'
                        className={style.btn_form}
                        htmlType='submit'
                        block={!desctopVersion}
                    >
                        Сохранить изменения
                    </Button>
                </Form>
                {updateUserError && <ClanedarNotVarificationModal />}
            </div>
        </>
    );
};

export default PrivacyAuthorization;

import { Layout, Typography, PageHeader, Button } from 'antd';
import {
    ArrowLeftOutlined,
    CloseCircleOutlined,
    CheckCircleFilled,
    CheckCircleOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import style from './settings-page.module.css';
import { goBack } from 'redux-first-history';
import MyTariff from '@components/my-tariff/my-tariff';
import Options from '@components/options/options';
import CastomDrawer from '@components/drawer/drawer';
import TariffOpportunity from '@components/tariff-opportunity/tariff-opportunity';
import { desctopVersionSelect } from '@redux/slise/select';
import { useAppSelector, useAppDispatch } from '@redux/configure-store';
import { tarifsOpportunities } from '@utils/constans/tarif';
import { postFeedbacksSettingsStart } from '@redux/slise/post-feedbakc-slise';
import { getFeedbacksStart } from '@redux/slise/feedbacks-slise';
import { postTarifStart, setTarifDays } from '@redux/slise/tariff-slice';
import moment from 'moment';
import TarifCosts from '@components/tariff-costs/tariff-cost';
import PostFeedbakcModal from '../../pages/feedbacks-page/modals/post-feedbakc-modal/post-feedbakc-modal';
import TariffModal from '@components/tariff-modal/tariff-modal';

const { Title } = Typography;
const SettingsPage = () => {
    const tarifSuccess = useAppSelector((state) => state.tarif.tariffSuccses);
    const [openModal, setOpenModal] = useState(false);
    const [disbleBtn, setDisableBtn] = useState(true);
    const tarifs = useAppSelector((state) => state.tarif.tariffs);
    const dispatch = useAppDispatch();
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [days, setDays] = useState(0);
    const profile = useAppSelector((state) => state.profile.profile);
    const desctopVersion = useAppSelector(desctopVersionSelect);
    const isProTariffActive = !!useAppSelector((state) => state?.profile?.profile?.tariff);
    const date = moment(profile?.tariff?.expired);
    const month = date.month() + 1;
    const day = date.date();

    const openDrawer = () => {
        setOpenDrawer(true);
    };
    const closeDrawer = () => {
        setOpenDrawer(false);
    };
    const onClick = () => dispatch(goBack());

    const byTariff = () => {
        dispatch(setTarifDays(days));
        dispatch(postTarifStart());
        setOpenDrawer(false);
    };

    const handleopenModal = () => setOpenModal(true);

    const hadleSubmit = ({ message, rating }) =>
        dispatch(postFeedbacksSettingsStart({ message, rating }));

    const getFeedbacks = () => dispatch(getFeedbacksStart());

    const onRadioChange = (event) => {
        setDisableBtn(false);
        setDays(event.target.value);
    };
    return (
        <>
            <PostFeedbakcModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                hadleSubmit={hadleSubmit}
            />
            <PageHeader className={style.settings_header}>
                <div className={style.header_wrapper}>
                    <Button
                        data-test-id='settings-back'
                        onClick={onClick}
                        type='text'
                        icon={<ArrowLeftOutlined />}
                        className={style.go_back_btn}
                    />
                    <Title level={4}>Настройки</Title>
                </div>
            </PageHeader>
            <Layout.Content className={style.wrapper}>
                <Title level={4} style={{ marginBottom: '16px' }}>
                    Мой тариф
                </Title>
                <div className={style.wrapper_content}>
                    <div className={style.tariff_wrapper}>
                        <MyTariff
                            dataTtetId={'free-tariff-card'}
                            isProRarif={false}
                            isActiveProTariff={false}
                            onClickHadler={openDrawer}
                        />
                        <MyTariff
                            dataTtetId={'pro-tariff-card'}
                            month={month}
                            day={day}
                            isProRarif={true}
                            isActiveProTariff={isProTariffActive}
                            onClickHadler={openDrawer}
                            onClick={openDrawer}
                        />
                    </div>
                    <div className={style.swith_field}>
                        <Options isProVersion={isProTariffActive} />
                    </div>
                    <div className={style.settings_footer}>
                        <Button
                            block={!desctopVersion}
                            onClick={handleopenModal}
                            size='large'
                            className={style.settings_footer_btn}
                        >
                            Написать отзыв
                        </Button>
                        <Button
                            block={!desctopVersion}
                            type='link'
                            onClick={getFeedbacks}
                            className={style.settings_footer_btn_link}
                        >
                            Смотреть все отзывы
                        </Button>
                    </div>
                </div>
            </Layout.Content>
            <CastomDrawer
                closable={false}
                title={'Сравнить тарифы'}
                open={isOpenDrawer}
                onClose={closeDrawer}
                desctopVersion={desctopVersion}
                isSettings={true}
                isEdit={false}
                footerContent={
                    !isProTariffActive && (
                        <Button
                            block
                            size='large'
                            disabled={disbleBtn}
                            className={style.footer_btn}
                            onClick={byTariff}
                            data-test-id='tariff-submit'
                        >
                            Выбрать и оплатить
                        </Button>
                    )
                }
            >
                <div className={style.drawer_wrapper}>
                    {isProTariffActive && (
                        <div className={style.active_pro}>
                            Ваш PRO tarif активен до
                            {` ${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}`}
                        </div>
                    )}

                    <div className={style.tarifs}>
                        <div className={style.free}>FREE</div>
                        <div className={style.pro}>
                            PRO{' '}
                            {isProTariffActive && (
                                <CheckCircleOutlined className={style.pro_icon} />
                            )}
                        </div>
                    </div>
                    <div className={style.tariff_container}>
                        {tarifsOpportunities.map(({ text, includeInFree }, index) => (
                            <TariffOpportunity
                                key={index}
                                iconFree={
                                    !includeInFree ? (
                                        <CloseCircleOutlined
                                            style={{ color: '#BFBFBF', fontSize: '18px' }}
                                        />
                                    ) : (
                                        <CheckCircleFilled style={{ fontSize: '18px' }} />
                                    )
                                }
                                iconPro={<CheckCircleFilled style={{ fontSize: '18px' }} />}
                                text={text}
                            />
                        ))}
                    </div>
                    {!isProTariffActive && (
                        <div className={style.costs_wrapper}>
                            <TarifCosts tarifs={tarifs} onChange={onRadioChange} />
                        </div>
                    )}
                </div>
            </CastomDrawer>
            {tarifSuccess && <TariffModal />}
        </>
    );
};

export default SettingsPage;

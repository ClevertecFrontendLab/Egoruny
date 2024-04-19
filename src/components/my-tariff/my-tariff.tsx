import { Card, Button, Typography, Image } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import freeImg from '../../assets/img/cover.svg';
import proImg from '../../assets/img/coverPRO.svg';
import proImgActive from '../../assets/img/coverActivePRO.svg';
import style from './my-taroff.module.css';

const { Paragraph } = Typography;

const MyTariff = ({
    isProRarif,
    onClick,
    isActiveProTariff,
    onClickHadler,
    month,
    day,
    dataTtetId,
}) => {
    return (
        <>
            <Card
                data-test-id={dataTtetId}
                className={style.tarif_card}
                title={
                    <div className={style.card_header}>
                        <div className={style.tarif}>
                            {!isProRarif ? 'FREE tarif' : 'PRO tarif'}
                        </div>
                        <Button type='link' className={style.card_btn} onClick={onClickHadler}>
                            Подробнее
                        </Button>
                    </div>
                }
                cover={
                    isProRarif ? (
                        <Image src={isActiveProTariff ? proImgActive : proImg} alt='alt' />
                    ) : (
                        <Image src={freeImg} alt='alt' />
                    )
                }
            >
                <div className={style.card_body}>
                    {!isProRarif ? (
                        <Paragraph strong style={{ marginBottom: 0, color: '#030852' }}>
                            активен
                        </Paragraph>
                    ) : isActiveProTariff ? (
                        <Paragraph strong style={{ marginBottom: 0, color: '#030852' }}>
                            активен <br />
                            до {`${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}`}
                        </Paragraph>
                    ) : (
                        <Button
                            className={style.active_btn}
                            size='large'
                            onClick={onClick}
                            data-test-id='activate-tariff-btn'
                        >
                            Активировать
                        </Button>
                    )}
                    {!isProRarif && <CheckOutlined />}
                </div>
            </Card>
        </>
    );
};

export default MyTariff;

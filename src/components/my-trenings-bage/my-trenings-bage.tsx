import { useState } from 'react';
import { Badge, Button, Typography, Card } from 'antd';
import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';

import style from './my-trenings-bage.module.css';

const MyTreningsBage = ({ key, text, trein, onClickBtn, isInplimintation }) => {
    const [isOpenModal, setOpenModal] = useState(false);
    const bageColors = new Map([
        ['Силовая', 'yellow'],
        ['Ноги', 'red'],
        ['Руки', 'cyan'],
        ['Грудь', 'green'],
        ['Спина', 'orange'],
    ]);

    return (
        <div className={style.wrapper} key={key}>
            <Badge color={bageColors.get(text)} text={text} />
            <Button
                icon={<DownOutlined />}
                style={{ border: 'none', width: '10px' }}
                onClick={() => setOpenModal(true)}
            />
            {isOpenModal && (
                <Card bodyStyle={{ padding: 0 }} className={style.modal} key={key}>
                    <div
                        className={style.modal_header}
                        style={{ borderBottom: `2px solid ${bageColors.get(text)}` }}
                    >
                        <Button
                            icon={<ArrowLeftOutlined />}
                            onClick={() => setOpenModal(false)}
                            className={style.close_btn}
                        />
                        <Typography.Paragraph
                            style={{
                                marginBottom: 0,
                                color: '#262626',
                                fontFamily: 'Inter',
                                fontWeight: 400,
                            }}
                        >
                            {text}
                        </Typography.Paragraph>
                    </div>
                    <div className={style.exercises}>
                        {trein?.exercises.map(({ name }) => (
                            <Typography.Paragraph type='secondary'>{name}</Typography.Paragraph>
                        ))}
                    </div>
                    <div className={style.footer}>
                        <Button block disabled={isInplimintation} onClick={() => onClickBtn(trein)}>
                            {' '}
                            Добавить упражнения
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default MyTreningsBage;

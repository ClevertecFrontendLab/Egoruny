import { Button, Modal, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import style from './calendar-not-varification-modal.module.css';

const { Title, Text } = Typography;

type ClanedarNotVarificationModalProps = {
    text?:string
    title?:string
    onClose?:() => void
}

const ClanedarNotVarificationModal = ({ text, title,onClose }:ClanedarNotVarificationModalProps) => {
    const [canselModal, setCanselModal] = useState(true);
    const handleCansel = () => {
        setCanselModal(false);

    }
    return (
        <Modal
            className={style.error_modal}
            bodyStyle={{ padding: '32px 32px 24px 32px' }}
            open={canselModal}
            style={{ width: '330px' }}
            afterClose={onClose}
            centered
            footer={null}
            closable={false}
            maskStyle={{ background: 'rgba(121, 156, 212, 0.5)', backdropFilter: 'blur(3px)' }}
        >
            <div className={style.modal_wrapper}>
                <div className={style.modal_title_wrapper}>
                    <div className={style.modal_title_header}>
                        <Button
                            data-test-id='modal-error-user-training-button'
                            onClick={handleCansel}
                            icon={<CloseCircleOutlined />}
                            className={style.close_btn}
                            size='large'
                        />
                        <div className={style.modal_title}>
                            <Title level={4} data-test-id='modal-error-user-training-title'>
                                {' '}
                                {title || 'При сохранении данных произошла ошибка'}{' '}
                            </Title>
                            <Text data-test-id='modal-error-user-training-subtitle'>
                                {text || 'Придётся попробовать ещё раз'}
                            </Text>
                        </div>
                    </div>

                    <div className={style.moda_footer}>
                        <Button
                            data-test-id='modal-error-user-training-button'
                            
                            onClick={handleCansel}
                            className={style.modal_footer_btn}
                            size='large'
                        >
                            Закрыть
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ClanedarNotVarificationModal;

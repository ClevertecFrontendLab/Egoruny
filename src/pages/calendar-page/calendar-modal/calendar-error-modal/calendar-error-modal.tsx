import { Button, Modal, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import style from './calendar-error-modal.module.css';
import { useState } from 'react';
import { useAppDispatch } from '@redux/configure-store';
import { getTraningCatalogsStart } from '@redux/slise/traning-catalogs-slise';

const { Text } = Typography;

type CalendarModalProps ={
    updateHandler?:() => void
}



const CalendarModal = ({updateHandler}:CalendarModalProps) => {
    const [canselModal, setCanselModal] = useState(true);
    const dispath = useAppDispatch();
    

    const handleCansel = () => setCanselModal(false);
    const handleRepeatRequest = () => dispath(getTraningCatalogsStart());
    return (
        <Modal
            bodyStyle={{ padding: '16px 24px 16px 24px' }}
            style={{ maxWidth: '384px' }}
            open={canselModal}
            centered
            onCancel={handleCansel}
            footer={[
                <Button
                    data-test-id='modal-error-user-training-button'
                    type='primary'
                    size='middle'
                    className={style.modal_footer_btn}
                    onClick={updateHandler?updateHandler:handleRepeatRequest}
                >
                    Обновить
                </Button>,
            ]}
            maskStyle={{ background: 'rgba(121, 156, 212, 0.5)', backdropFilter: 'blur(6px)' }}
        >
            <div className={style.modal_header}>
                <Button
                    data-test-id='modal-error-user-training-button-close'
                 
                    icon={<CloseCircleOutlined className={style.icon_btn_cansel} />}
                    onClick={handleCansel}
                    className={style.cansel_btn}
                ></Button>
                <div 
                data-test-id='modal-error-user-training-title'
                >
                    <p>При открытии данных</p>
                    <p style={{ marginBottom: '8px' }}>приозошла ошибка</p>
                    <Text type='secondary' data-test-id='modal-error-user-training-subtitle'>
                        Попробуйте ещё раз.
                    </Text>
                </div>
            </div>
        </Modal>
    );
};

export default CalendarModal;

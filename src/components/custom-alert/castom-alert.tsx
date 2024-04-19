import { Alert } from 'antd';
import style from './castom-alert.module.css';

type Props = {
    message: string;
    onClose?: () => void;
    dataTest?: string;
};

const CastomAlert = ({ message, onClose, dataTest }: Props) => (
    <div className={style.alert_wrapper}>
        <Alert
            onClose={onClose}
            data-test-id={dataTest}
            message={message}
            type='success'
            className={style.alert}
            closable={true}
            showIcon={true}
        />
    </div>
);

export default CastomAlert;

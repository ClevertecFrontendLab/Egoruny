import { Badge, Button, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { bageColors } from '@utils/constans/bageColors';
import style from './calendar-castom-bage.module.css';

const { Text } = Typography;

type BageProps = {
    text: string;
    isEdit?: boolean;
    isExecises?: boolean;
    index?: number;
    onChange?: () => void;
    isImplementation?: boolean;
    openedInDrawer?: boolean;
};

const CalendarCastomBage = ({
    text,
    index,
    isEdit,
    onChange,
    isExecises,
    isImplementation,
    openedInDrawer,
}: BageProps) => {
    return (
        <>
            <div className={style.bage_wrapper}>
                {isExecises ? (
                    <Text type='secondary'>{text}</Text>
                ) : (
                    <Badge
                        style={{ color: isImplementation || openedInDrawer ? '#BFBFBF' : '' }}
                        color={bageColors.get(text)}
                        text={text}
                    />
                )}

                {isEdit && (
                    <Button
                        data-test-id={`modal-update-training-edit-button${index}`}
                        style={{ height: '18px', width: '18px' }}
                        type='link'
                        icon={<EditOutlined />}
                        onClick={onChange}
                        disabled={isImplementation}
                    />
                )}
            </div>
        </>
    );
};

export default CalendarCastomBage;

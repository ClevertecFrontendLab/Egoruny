import { Button, Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import style from './calendar-create-traning-modal.module.css';
import { useAppDispatch,useAppSelector } from '@redux/configure-store';
import { togleModal } from '@redux/slise/trening-modals-slice';
import EmtyContent from '@components/empy-content/empty-content';
import TreningBadge from '@components/trening-bage/trening-bage';
import { traningCatalogsSelect } from '@redux/slise/select';


const CalendarCreateTraningModal = ({ date, setExercisesStatus, trenings, onChange,isPastDate,setIsEdit }) => {
    const catalogTrening = useAppSelector(traningCatalogsSelect);
    const dispath = useAppDispatch();
    const closeModal = () => dispath(togleModal(false));

    const disabledBtn = trenings.length === catalogTrening.length || isPastDate

    return (
        <Card
            data-test-id='modal-create-training'
            style={{
                cursor: 'default',
            }}
            bodyStyle={{ padding: 0 }}
            className={style.create_traning}
            headStyle={{ padding: '0' }}
            actions={[
                <div className={style.create_btn_container}>
                    <Button
                        onClick={setExercisesStatus}
                        className={style.create_traning_btn}
                        block
                        type='primary'
                        size='large'
                        disabled={disabledBtn}
                    >
                        Создать тренировку
                    </Button>
                </div>,
            ]}
        >
            <div className={style.modal_container}>
                <div className={style.modal_header}>
                    <Card.Meta
                        className={style.modal_title}
                        title={`Тренировки на ${date.format('DD.MM.YYYY')}`}
                        description={trenings.length ? '' : 'Нет активных тренировок'}
                    />
                    <Button
                        data-test-id='modal-create-training-button-close'
                        className={style.close_btn}
                        type='text'
                        size='small'
                        icon={<CloseOutlined />}
                        onClick={closeModal}
                    />
                </div>
                <div className={style.modal_content}>
                    {!trenings.length ? (
                        <EmtyContent />
                    ) : (
                        <TreningBadge isEdit={true} trainings={trenings} onChange={onChange} setIsEdit={setIsEdit} />
                    )}
                </div>
            </div>
        </Card>
    );
};

export default CalendarCreateTraningModal;

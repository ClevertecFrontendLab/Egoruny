import style from './calendar-exercises-modal.module.css';
import type { Moment } from 'moment';
import { Button, Card, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@redux/configure-store';
import { postCreateTreningStart } from '@redux/slise/create-traning-slice';
import { putUpdateTreningStart } from '@redux/slise/update-trening-slice';
import { Training } from '../../../../utils/constans/type';
import { setCreateSelectedTraning } from '@redux/slise/traningList-slise';
import CalendarCastomBage from '@components/calendar-castom-bage/calendar-castom-bage';
import EmtyContent from '@components/empy-content/empty-content';
import { updateTraning,setPrevState } from '@redux/slise/traningList-slise';
import { selectedTraningSelect,traningCatalogsSelect } from '@redux/slise/select';


type CalendarExercisesModalProps = {
    setTreningStatus: () => void;
    openDrawer: () => void;
    date: Moment;
    onChangeExercisesDrawerOpen: () => void;
    isPastDate: boolean;
    isEdit: boolean;
    trainings: Training[];
};

const CalendarExercisesModal = ({
    setIsEdit,
    onChangeExercisesDrawerOpen,
    setTreningStatus,
    openDrawer,
    date,
    isEdit,
    isPastDate,
    trainings,
}: CalendarExercisesModalProps) => {
    const dispatch = useAppDispatch();
    const selectedTraning = useAppSelector(selectedTraningSelect);
    const catalogTrening = useAppSelector(traningCatalogsSelect);
    const isEmptyExesises = !!selectedTraning?.exercises[0]?.name;
    const disableBtn = selectedTraning.exercises.every(({name}) => name)

    const disabledAddTraning = !selectedTraning.name || isEdit === true;

    const filter = trainings
        .filter(({ name }) => catalogTrening.find((training) => training?.name === name))
        .map(({ name }) => name);

    const options = catalogTrening
        .map(({ name }) => name)
        .filter((el) => !filter.includes(el))
        .map((el) => ({ label: el, value: el }));

    const onUpdateTraning = () => {

        isPastDate
            ? dispatch(updateTraning({ isPast: true }))
            : dispatch(updateTraning({ isPast: false }));

        dispatch(putUpdateTreningStart());
    };

    const onSaveTraning = () => {
        dispatch(postCreateTreningStart());
    }

    const onChange = (value: string) =>{ 
        setIsEdit(false)
        dispatch(setPrevState({name: value, date: date.toISOString()}))
        dispatch(setCreateSelectedTraning({ name: value, date: date.toISOString()}));
}
    return (
        <Card
            data-test-id='modal-create-exercise'
            style={{ cursor: 'default', padding: '0 12px' }}
            bodyStyle={{ padding: 0 }}
            actions={[
                <div className={style.btn_groupe}>
                    <Button
                        size='middle'
                        type='ghost'
                        block
                        onClick={openDrawer}
                        disabled={disabledAddTraning}
                    >
                        Добавить упражнения
                    </Button>
                    <Button
                        disabled={!disableBtn}
                        block
                        size='middle'
                        type='link'
                        onClick={isEdit ? onUpdateTraning : onSaveTraning}
                    >
                        {isPastDate ? 'Сохранить изменения' : 'Сохранить'}
                    </Button>
                </div>,
            ]}
        >
            <div className={style.exercises_modal_header}>
                <Button
                    data-test-id='modal-exercise-training-button-close'
                    icon={<ArrowLeftOutlined />}
                    type='text'
                    size='small'
                    className={style.modal_exercises_btn}
                    onClick={setTreningStatus}
                />
                <Select
                    data-test-id='modal-create-exercise-select'
                    onChange={onChange}
                    dropdownStyle={{ width: '100%', zIndex: 10 }}
                    bordered={false}
                    defaultValue='Выбор типа тренировок'
                    style={{ width: '100%' }}
                    options={options}
                />
            </div>
            <div className={style.modal_exercises_constent}>
                {isEmptyExesises ? (
                    selectedTraning?.exercises.map(({ name }, index) => (
                        <CalendarCastomBage
                            text={name}
                            isEdit={true}
                            isExecises={true}
                            onChange={onChangeExercisesDrawerOpen}
                            index={index}
                        />
                    ))
                ) : (
                    <EmtyContent />
                )}
            </div>
        </Card>
    );
};

export default CalendarExercisesModal;

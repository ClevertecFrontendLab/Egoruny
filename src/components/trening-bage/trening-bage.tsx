import CalendarCastomBage from '@components/calendar-castom-bage/calendar-castom-bage';

const TreningBadge = ({ trainings, onChange, isEdit,setIsEdit }) => {
    return (
        <ul
            style={{
                textAlign: 'start',
                padding: '16px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '100%',
            }}
        >
            {trainings.map(({ name, _id, isImplementation }, index) => (
                <li key={name} id={_id} style={{ lineHeight: 1.2 }}>
                    <CalendarCastomBage text={name} isEdit={isEdit}  onChange={() => onChange && onChange(name)} isImplementation={isImplementation} index={index} />
                </li>
            ))}
        </ul>
    );
};

export default TreningBadge;

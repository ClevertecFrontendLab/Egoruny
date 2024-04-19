import CalendarHeader from "@components/calendar-header/calendar-header"
import CalendarContent from '../../components/calendar-content/calendar-content'
import { createTraningLoad,updateTraningLoad } from "@redux/slise/select"
import { useAppSelector } from "@redux/configure-store"
import Loader from '@components/loader/loader';

const CalendarPage = () => {
const isCreateload = useAppSelector(createTraningLoad)
const isUpdateload = useAppSelector(updateTraningLoad)
    return (
        <>
        {isCreateload && <Loader/>}
        {isUpdateload && <Loader/>}
    <CalendarHeader/>
<CalendarContent/>
</>
    )
}

export default CalendarPage
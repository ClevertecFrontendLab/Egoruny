import { createPortal } from 'react-dom';
import type { Moment } from 'moment';
import CalendarCellModal from '@pages/calendar-page/calendar-modal/claendar-cell-modal/calendar-cell-modal';
type Props = {
    container: any;
    date: Moment;
    offsetTop: number;
};

const PortalComponent = ({ offsetTop, container, date }: Props) => {
    const mainContainer = document.querySelector(container) || document.body;
    return createPortal(
        <>
            <CalendarCellModal date={date} offsetTop={offsetTop} />
        </>,
        mainContainer,
    );
};

export default PortalComponent;

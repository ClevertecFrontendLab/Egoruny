import moment, { Moment } from 'moment';

export const isPastDate = (date?: Moment | string) => moment(date).isBefore(moment());

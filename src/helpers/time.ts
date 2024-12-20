import moment from 'moment-timezone';

export const extractDate = (isoString: string) =>
  moment(isoString).format('YYYY-MM-DD');

export const extractTime = (isoString: string) => {
  const userTimeZone = moment.tz.guess();
  return moment.utc(isoString).tz(userTimeZone).format('HH:mm');
};
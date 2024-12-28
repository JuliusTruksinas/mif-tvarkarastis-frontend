import moment from 'moment';

export const extractDate = (isoString: string) =>
  moment(isoString).format('YYYY-MM-DD');

export const extractTime = (isoString: string) => {
  const userTimeZone = moment.tz.guess();
  return moment.utc(isoString).tz(userTimeZone).format('HH:mm');
};

export const convertToSecondsInTimezone = (milliseconds: number): number => {
  const now = new Date();
  const timeZoneOffset = now.getTimezoneOffset() * 60;
  const CorrentUnixTimeStamp = milliseconds / 1000 - timeZoneOffset;

  return CorrentUnixTimeStamp;
};

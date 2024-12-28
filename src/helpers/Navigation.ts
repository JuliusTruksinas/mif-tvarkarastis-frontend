import { convertToSecondsInTimezone } from './time';

enum DeviceType {
  PHONE = 'PHONE',
  COMPUTER = 'COMPUTER',
}

const getDeviceType = (): DeviceType => {
  const userAgent = navigator.userAgent;
  if (/Android|iPhone|iPad|iPod/i.test(userAgent)) {
    return DeviceType.PHONE;
  }

  return DeviceType.COMPUTER;
};

export enum Faculty {
  NAUGARDUKAS = 'NAUGARDUKAS',
  DIDLAUKIS = 'DIDLAUKIS',
  GMC = 'GMC',
}

const getModeOfTransportationDataCode = (
  modeOfTransportation: 'bus' | 'car',
) => {
  if (modeOfTransportation === 'bus') {
    return '3e3';
  }

  return '3e0';
};

export const tryGetFaculty = (locationString: string): Faculty | null => {
  if (!locationString) {
    return null;
  }

  const locationStringLowerCase = locationString.toLowerCase();

  if (
    locationStringLowerCase.includes('naug') ||
    locationStringLowerCase.includes('šalt')
  ) {
    return Faculty.NAUGARDUKAS;
  }

  if (locationStringLowerCase.includes('didl')) {
    return Faculty.DIDLAUKIS;
  }

  if (locationStringLowerCase.includes('saul')) {
    return Faculty.GMC;
  }

  return null;
};

export const generateNavigationLink = (
  faculty: Faculty,
  ArrivalTime: string,
  modeOfTransportation: 'bus' | 'car',
  preferredNavigationApp: 'googleMaps' | 'waze',
): string => {
  const date = new Date(ArrivalTime);
  const millisecondsSinceEpoch = date.getTime();

  const GOOGLE_MAPS_LOCATIONS = {
    [Faculty.NAUGARDUKAS]: `https://www.google.com/maps/dir//Naugarduko+g.+24,+Vilnius,+03225+Vilniaus+m.+sav.,+Lietuva/@54.526927,24.5383512,64690m/data=!3m1!1e3!4m14!4m13!1m1!4e2!1m5!1m1!1s0x46dd946cf5a5859d:0x84f1c4dd358e3b9e!2m2!1d25.2738736!2d54.6760394!2m3!6e1!7e2!8j${convertToSecondsInTimezone(
      millisecondsSinceEpoch,
    )}!${getModeOfTransportationDataCode(
      modeOfTransportation,
    )}!5m1!1e1?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D`,
    [Faculty.DIDLAUKIS]: `  https://www.google.com/maps/dir//MIF+fakulteto+pastatas,+Didlaukio+g.+47,+Vilnius,+08303+Vilniaus+m.+sav./@54.5269284,24.5383505,16173m/data=!3m1!1e3!4m14!4m13!1m1!4e2!1m5!1m1!1s0x46dd913fbe6a26fb:0x3b2074b236abf4e9!2m2!1d25.2635138!2d54.7297352!2m3!6e1!7e2!8j${convertToSecondsInTimezone(
      millisecondsSinceEpoch,
    )}!${getModeOfTransportationDataCode(
      modeOfTransportation,
    )}!5m1!1e1?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D`,
    [Faculty.GMC]: `https://www.google.com/maps/dir//Vilnius+University+Life+Sciences+Centre,+Saul%C4%97tekio+al.+7,+Vilnius,+10257+Vilniaus+m.+sav./@54.5269286,24.5383506,16173m/data=!3m1!1e3!4m14!4m13!1m1!4e2!1m5!1m1!1s0x46dd96c3ad78fac9:0xfb251071483a453c!2m2!1d25.3263571!2d54.7222638!2m3!6e1!7e2!8j${convertToSecondsInTimezone(
      millisecondsSinceEpoch,
    )}!${getModeOfTransportationDataCode(
      modeOfTransportation,
    )}!5m1!1e1?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D`,
  };

  const WAZE_LOCATIONS = {
    [Faculty.NAUGARDUKAS]:
      'https://www.waze.com/ul?ll=54.67489793090857,25.27339079966467&navigate=yes&from=My+Location',
    [Faculty.DIDLAUKIS]:
      'https://www.waze.com/ul?ll=54.72973017246642,25.263719834760828&navigate=yes&from=My+Location',
    [Faculty.GMC]:
      'https://www.waze.com/ul?ll=54.7223753135798,25.326312361221397&navigate=yes&from=My+Location',
  };

  if (modeOfTransportation === 'bus') {
    return GOOGLE_MAPS_LOCATIONS[faculty];
  }

  const deviceType = getDeviceType();

  if (deviceType === DeviceType.PHONE && preferredNavigationApp === 'waze') {
    return WAZE_LOCATIONS[faculty];
  }

  return GOOGLE_MAPS_LOCATIONS[faculty];
};

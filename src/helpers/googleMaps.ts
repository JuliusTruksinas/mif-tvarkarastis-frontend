// const redirectToPlatformSpecificPage = () => {
//   const userAgent = navigator.userAgent;
//   console.log(userAgent);

//   if (/Android/i.test(userAgent)) {
//     console.log('android');
//   } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
//     console.log('overpricedShit');
//   } else if (/Windows NT/i.test(userAgent)) {
//     console.log('windows');
//   } else {
//     console.log('Not a mobile device');
//   }
// };
// redirectToPlatformSpecificPage();

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

export const generateGoogleMapsLink = (
  faculty: Faculty,
  ArrivalTime: string,
  modeOfTransportation: 'bus' | 'car',
): string => {
  const date = new Date(ArrivalTime);
  const millisecondsSinceEpoch = date.getTime();
  const arrivalTimeInSeconds = Math.floor(millisecondsSinceEpoch / 1000);

  const LOCATIONS = {
    [Faculty.NAUGARDUKAS]: `https://www.google.com/maps/dir//Naugarduko+g.+24,+Vilnius,+03225+Vilniaus+m.+sav.,+Lietuva/@54.526927,24.5383512,64690m/data=!3m1!1e3!4m14!4m13!1m1!4e2!1m5!1m1!1s0x46dd946cf5a5859d:0x84f1c4dd358e3b9e!2m2!1d25.2738736!2d54.6760394!2m3!6e1!7e2!8j${
      arrivalTimeInSeconds + 7200
    }!${getModeOfTransportationDataCode(
      modeOfTransportation,
    )}!5m1!1e1?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D`,
    [Faculty.DIDLAUKIS]: `https://www.google.com/maps/dir//Didlaukio+g.+59,+Didlaukio+g.+59,+Vilnius,+08303+Vilniaus+m.+sav.,+Lithuania/@54.5269286,24.5383506,64690m/data=!3m1!1e3!4m14!4m13!1m1!4e2!1m5!1m1!1s0x46dd913f9e7194dd:0x72ec71164b6187c1!2m2!1d25.2620254!2d54.7316965!2m3!6e1!7e2!8j${
      arrivalTimeInSeconds + 7200
    }!${getModeOfTransportationDataCode(
      modeOfTransportation,
    )}!5m1!1e1?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D`,
    [Faculty.GMC]: `https://www.google.com/maps/dir//Vilnius+University+Life+Sciences+Centre,+Saul%C4%97tekio+al.+7,+Vilnius,+10257+Vilniaus+m.+sav./@54.5269286,24.5383506,16173m/data=!3m1!1e3!4m14!4m13!1m1!4e2!1m5!1m1!1s0x46dd96c3ad78fac9:0xfb251071483a453c!2m2!1d25.3263571!2d54.7222638!2m3!6e1!7e2!8j${
      arrivalTimeInSeconds + 7200
    }!${getModeOfTransportationDataCode(
      modeOfTransportation,
    )}!5m1!1e1?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D`,
  };

  return LOCATIONS[faculty];
};

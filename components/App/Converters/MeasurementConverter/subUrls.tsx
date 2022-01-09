import convert from "convert-units";
import { IAvailableUrls } from "../../../../constants/interface";

export const measurementSubUrls = function (MAX_ITER = 25): IAvailableUrls[] {
  const uniqueMeasurementsAvailable: string[] = [];
  convert()
    .list()
    .forEach((val: { measure: string }) => {
      if (!uniqueMeasurementsAvailable.includes(val.measure)) {
        uniqueMeasurementsAvailable.push(val.measure);
      }
    });
  const subUrls = [];
  for (
    let measurement = 0;
    measurement < uniqueMeasurementsAvailable.length && measurement < MAX_ITER;
    measurement += 1
  ) {
    subUrls.push({
      url: `unit-conversions/${uniqueMeasurementsAvailable[measurement]}`,
      name: `Converts units of ${uniqueMeasurementsAvailable[measurement]}`,
    });
    const optionsAvailable = convert().possibilities(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      uniqueMeasurementsAvailable[measurement] as any
    );
    for (
      let fromOption = 0;
      fromOption < optionsAvailable.length && fromOption < MAX_ITER;
      fromOption += 1
    ) {
      for (
        let toOption = 0;
        toOption < optionsAvailable.length && toOption < MAX_ITER;
        toOption += 1
      ) {
        if (optionsAvailable[toOption] != optionsAvailable[fromOption]) {
          subUrls.push({
            url: `unit-conversions/${
              uniqueMeasurementsAvailable[measurement]
            }/convert-${
              convert().describe(optionsAvailable[fromOption]).plural
            }`,
            name: `Converts units of ${
              uniqueMeasurementsAvailable[measurement]
            } from ${convert().describe(optionsAvailable[fromOption]).plural}`,
          });
          subUrls.push({
            url: `unit-conversions/${
              uniqueMeasurementsAvailable[measurement]
            }/convert-${convert().describe(optionsAvailable[toOption]).plural}`,
            name: `Converts units of ${
              uniqueMeasurementsAvailable[measurement]
            } from ${convert().describe(optionsAvailable[toOption]).plural}`,
          });
          subUrls.push({
            url: `unit-conversions/${
              uniqueMeasurementsAvailable[measurement]
            }/convert-${
              convert().describe(optionsAvailable[fromOption]).plural
            }-to-${convert().describe(optionsAvailable[toOption]).plural}`,
            name: `Converts units of ${
              uniqueMeasurementsAvailable[measurement]
            } from ${
              convert().describe(optionsAvailable[fromOption]).plural
            } to ${convert().describe(optionsAvailable[toOption]).plural}`,
          });
          subUrls.push({
            url: `unit-conversions/${
              uniqueMeasurementsAvailable[measurement]
            }/convert-${
              convert().describe(optionsAvailable[toOption]).plural
            }-to-${convert().describe(optionsAvailable[fromOption]).plural}`,
            name: `Converts units of ${
              uniqueMeasurementsAvailable[measurement]
            } from ${
              convert().describe(optionsAvailable[toOption]).plural
            } to ${convert().describe(optionsAvailable[fromOption]).plural}`,
          });
        }
      }
    }
  }
  return subUrls;
};

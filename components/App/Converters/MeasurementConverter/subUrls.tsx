import convert from "convert-units";
import { IAvailableUrls } from "../../../../constants/interface";

export const measurementSubUrls = function (): IAvailableUrls[] {
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
    measurement < uniqueMeasurementsAvailable.length;
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
      fromOption < optionsAvailable.length;
      fromOption += 1
    ) {
      for (
        let toOption = 0;
        toOption < optionsAvailable.length;
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

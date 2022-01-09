import { IAvailableUrls } from "../../../constants/interface";

export const calculatorSubUrls = function (MAX_ITER = 25): IAvailableUrls[] {
  return [
    {
      url: "calculators/mathematics-calculator",
      name: "Mathematics calculator",
    },
    {
      url: "calculators/simple-interest-calculator",
      name: "Simple interest calculator",
    },
    {
      url: "calculators/compound-interest-calculator",
      name: "Compound interest calculator",
    },
    {
      url: "calculators/date-difference-calculator",
      name: "Date difference calculator",
    },
  ];
};

import { IAvailableUrls } from "../constants/interface";

export const getNRandomFromUrlsArray = (
  arr: IAvailableUrls[],
  n: number
): IAvailableUrls[] => {
  return n > 0
    ? arr.sort(() => Math.random() - Math.random()).slice(0, n)
    : arr;
};

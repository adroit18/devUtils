import { IAvailableUrls } from "../../../constants/interface";
import { BEAUTIFIERS } from "./constants";

export const codeBeautifierSubUrls = function (): IAvailableUrls[] {
  const subUrls = [];
  const LANGUAGE_BEAUTIFIERS = Object.keys(BEAUTIFIERS);
  for (
    let beautifier = 0;
    beautifier < LANGUAGE_BEAUTIFIERS.length;
    beautifier += 1
  ) {
    subUrls.push({
      url: `code-format-beautify/${LANGUAGE_BEAUTIFIERS[beautifier]}`,
      name: `Code beautifier/formatter for ${LANGUAGE_BEAUTIFIERS[beautifier]}`,
    });
  }
  return subUrls;
};

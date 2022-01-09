import { IAvailableUrls } from "../../../constants/interface";
import { getNRandomFromUrlsArray } from "../../../utils";
import { calculatorSubUrls } from "../Calculators/subUrls";
import { codeBeautifierSubUrls } from "../CodeBeautifiers/subUrls";
import { codeEditorSubUrls } from "../CodeEditor/subUrls";
import { currencyConverterSubUrls } from "../Converters/CurrencyConverter/subUrls";
import { measurementSubUrls } from "../Converters/MeasurementConverter/subUrls";

export const NUMBER_OF_URLS_TO_SHOW = 10;

export const SUB_URLS: {
  [key: string]: IAvailableUrls[];
} = {
  "code-editor": getNRandomFromUrlsArray(
    codeEditorSubUrls(),
    NUMBER_OF_URLS_TO_SHOW
  ) as IAvailableUrls[],
  "code-format-beautify": getNRandomFromUrlsArray(
    codeBeautifierSubUrls(),
    NUMBER_OF_URLS_TO_SHOW
  ) as IAvailableUrls[],
  "currency-conversion": getNRandomFromUrlsArray(
    currencyConverterSubUrls(),
    NUMBER_OF_URLS_TO_SHOW
  ) as IAvailableUrls[],
  "unit-conversions": getNRandomFromUrlsArray(
    measurementSubUrls(),
    NUMBER_OF_URLS_TO_SHOW
  ) as IAvailableUrls[],
  calculators: getNRandomFromUrlsArray(
    calculatorSubUrls(),
    NUMBER_OF_URLS_TO_SHOW
  ) as IAvailableUrls[],
};

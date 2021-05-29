import React from "react";
import Icon from "@mdi/react";
import dynamic from "next/dynamic";
import {
  mdiCodeJson,
  mdiCompare,
  mdiCpu64Bit,
  mdiKeyLink,
  mdiSwapHorizontal,
  mdiCurrencyInr,
  mdiRecycleVariant,
  mdiNoteMultipleOutline,
} from "@mdi/js";

const JsonFormatAndValidateEditor = dynamic(
  import("../components/App/JsonFormatAndValidate"),
  { ssr: false }
);
const TextDiff = dynamic(import("../components/App/TextDiff"), { ssr: false });
const Base64EncodeDecode = dynamic(
  import("../components/App/Base64EncodeDecode"),
  { ssr: false }
);
const UrlEncodeDecode = dynamic(import("../components/App/UrlEncodeDecode"), {
  ssr: false,
});
const MeasurementConverter = dynamic(
  import("../components/App/Converters/MeasurementConverter"),
  {
    ssr: false,
  }
);
const CurrencyConverter = dynamic(
  import("../components/App/Converters/CurrencyConverter"),
  {
    ssr: false,
  }
);
const JsonXmlYml = dynamic(import("../components/App/Converters/JsonXmlYml"), {
  ssr: false,
});
const Notes = dynamic(import("../components/App/Notes"), {
  ssr: false,
});

export const CURRENCY_TO_DETAILS: {
  [key: string]: { name: string; sign: string };
} = {
  AUD: { name: "Australian Dollar", sign: "-" },
  BRL: { name: "Brazilian Real", sign: "-" },
  GBP: { name: "British Pound Sterline", sign: "-" },
  BGN: { name: "Bulgarian Lev", sign: "-" },
  CAD: { name: "Canadian Dollar", sign: "-" },
  CNY: { name: "Chinese Yuan Renminbi", sign: "-" },
  HRK: { name: "Croatian Kuna", sign: "-" },
  CZK: { name: "Czech Koruna", sign: "-" },
  DKK: { name: "Danish Krone", sign: "-" },
  EUR: { name: "Euro", sign: "-" },
  HKD: { name: "Hong Kong Dollar", sign: "-" },
  HUF: { name: "Hungarian Forint", sign: "-" },
  ISK: { name: "Icelandic Krona", sign: "-" },
  IDR: { name: "Indonesian Rupiah", sign: "-" },
  INR: { name: "Indian Rupee", sign: "-" },
  ILS: { name: "Israeli Shekel", sign: "-" },
  JPY: { name: "Japanese Yen", sign: "-" },
  MYR: { name: "Malaysian Ringgit", sign: "-" },
  MXN: { name: "Mexican Peso", sign: "-" },
  NZD: { name: "New Zealand Dollar", sign: "-" },
  NOK: { name: "Norwegian Krone", sign: "-" },
  PHP: { name: "Philippine Peso", sign: "-" },
  PLN: { name: "Polish Zloty", sign: "-" },
  RON: { name: "Romanian Leu", sign: "-" },
  RUB: { name: "Russian Rouble", sign: "-" },
  SGD: { name: "Singapore Dollar", sign: "-" },
  ZAR: { name: "South African Rand", sign: "-" },
  KRW: { name: "South Korean Won", sign: "-" },
  SEK: { name: "Swedish Krona", sign: "-" },
  CHF: { name: "Swiss Franc", sign: "-" },
  THB: { name: "Thai Baht", sign: "-" },
  TRY: { name: "Turkish Lira", sign: "-" },
  USD: { name: "US Dollar", sign: "-" },
};

export const UNIQUE_UTILITIES = {
  JSON_FORMAT_OR_VALIDATE: "JSON_FORMAT_OR_VALIDATE",
  TEXT_DIF: "TEXT_DIF",
  BASE64_ENCODE_DECODE: "BASE64_ENCODE_DECODE",
  URL_ENCODE_DECODE: "URL_ENCODE_DECODE",
  CONVERTERS: "CONVERTERS",
  CURRENCY_CONVERSION: "CURRENCY_CONVERSION",
  JSON_XML_YML: "JSON_XML_YML",
  NOTER: "NOTER",
};

export const UNIQUE_UTILITIES_COMPONENTS: { [key: string]: JSX.Element } = {
  JSON_FORMAT_OR_VALIDATE: <JsonFormatAndValidateEditor />,
  TEXT_DIF: <TextDiff />,
  BASE64_ENCODE_DECODE: <Base64EncodeDecode />,
  URL_ENCODE_DECODE: <UrlEncodeDecode />,
  CONVERTERS: <MeasurementConverter />,
  CURRENCY_CONVERSION: <CurrencyConverter />,
  JSON_XML_YML: <JsonXmlYml />,
  NOTER: <Notes />,
};

export const availableDevUtilOptions: Array<{
  name: string;
  icon: JSX.Element;
  id: string;
}> = [
  {
    name: "Json format / validate",
    icon: <Icon path={mdiCodeJson} title="JSON Format / Validate" size={1.5} />,
    id: "JSON_FORMAT_OR_VALIDATE",
  },
  {
    name: "Text diff",
    icon: <Icon path={mdiCompare} title="Text Diff" size={1.5} />,
    id: "TEXT_DIF",
  },
  {
    name: "Base64 encode / decode",
    icon: <Icon path={mdiCpu64Bit} title="Text Diff" size={1.5} />,
    id: "BASE64_ENCODE_DECODE",
  },
  {
    name: "Url encode / decode",
    icon: <Icon path={mdiKeyLink} title="Text Diff" size={1.5} />,
    id: "URL_ENCODE_DECODE",
  },
  {
    name: "Converters",
    icon: <Icon path={mdiSwapHorizontal} title="Converters" size={1.5} />,
    id: "CONVERTERS",
  },
  {
    name: "Currency conversion",
    icon: <Icon path={mdiCurrencyInr} title="Currency conversion" size={1.5} />,
    id: "CURRENCY_CONVERSION",
  },
  {
    name: "JSON : YML : XML",
    icon: <Icon path={mdiRecycleVariant} title="JSON : YML : XML" size={1.5} />,
    id: "JSON_XML_YML",
  },
  {
    name: "Noter",
    icon: <Icon path={mdiNoteMultipleOutline} title="Noter" size={1.5} />,
    id: "NOTER",
  },
];

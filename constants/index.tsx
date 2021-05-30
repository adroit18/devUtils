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

export const ROUTE_TO_UNIQUE_UTILITIES = {
  "json-format-or-validate": "json-format-or-validate",
  "text-difference": "text-difference",
  "base64-encode-decode": "base64-encode-decode",
  "url-encode-decode": "url-encode-decode",
  "unit-conversions": "conversions",
  "currency-conversion": "currency-conversion",
  "json-yaml-xml-conversion": "json-yaml-yaml-conversion",
  "take-notes": "take-notes",
};

export const UNIQUE_UTILITIES_COMPONENTS: { [key: string]: JSX.Element } = {
  "json-format-or-validate": <JsonFormatAndValidateEditor />,
  "text-difference": <TextDiff />,
  "base64-encode-decode": <Base64EncodeDecode />,
  "url-encode-decode": <UrlEncodeDecode />,
  "unit-conversions": <MeasurementConverter />,
  "currency-conversion": <CurrencyConverter />,
  "json-yaml-xml-conversion": <JsonXmlYml />,
  "take-notes": <Notes />,
};

export const ROUTE_TO_NAMES: { [key: string]: string } = {
  "json-format-or-validate": "Json format or validate",
  "text-difference": "Compare text",
  "base64-encode-decode": "Encode Decode base64",
  "url-encode-decode": "Encode Decode url",
  "unit-conversions": "Unit conversions",
  "currency-conversion": "Currency conversion",
  "json-yaml-xml-conversion": "Json, Yaml and Xml conversion",
  "take-notes": "Notes",
};

export const availableDevUtilOptions: Array<{
  name: string;
  icon: JSX.Element;
  url: string;
}> = [
  {
    name: "Json format / validate",
    icon: <Icon path={mdiCodeJson} title="JSON Format / Validate" size={1.5} />,
    url: "json-format-or-validate",
  },
  {
    name: "Text diff",
    icon: <Icon path={mdiCompare} title="Text Diff" size={1.5} />,
    url: "text-difference",
  },
  {
    name: "Base64 encode / decode",
    icon: <Icon path={mdiCpu64Bit} title="Text Diff" size={1.5} />,
    url: "base64-encode-decode",
  },
  {
    name: "Url encode / decode",
    icon: <Icon path={mdiKeyLink} title="Text Diff" size={1.5} />,
    url: "url-encode-decode",
  },
  {
    name: "Converters",
    icon: <Icon path={mdiSwapHorizontal} title="Converters" size={1.5} />,
    url: "unit-conversions",
  },
  {
    name: "Currency conversion",
    icon: <Icon path={mdiCurrencyInr} title="Currency conversion" size={1.5} />,
    url: "currency-conversion",
  },
  {
    name: "JSON : YML : XML",
    icon: <Icon path={mdiRecycleVariant} title="JSON : YML : XML" size={1.5} />,
    url: "json-yaml-xml-conversion",
  },
  {
    name: "Noter",
    icon: <Icon path={mdiNoteMultipleOutline} title="Noter" size={1.5} />,
    url: "take-notes",
  },
];

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
  mdiCalculatorVariant,
  mdiClock,
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
const JsonYamlXml = dynamic(
  import("../components/App/Converters/JsonYamlXml"),
  {
    ssr: false,
  }
);
const Notes = dynamic(import("../components/App/Notes"), {
  ssr: false,
});
const Calculators = dynamic(import("../components/App/Calculators"), {
  ssr: false,
});
const Time = dynamic(import("../components/App/Time"), {
  ssr: false,
});

export const ROUTE_TO_UNIQUE_UTILITIES: { [key: string]: string } = {
  "json-format-or-validate": "json-format-or-validate",
  "text-difference": "text-difference",
  "base64-encode-decode": "base64-encode-decode",
  "url-encode-decode": "url-encode-decode",
  "unit-conversions": "unit-conversions",
  "currency-conversion": "currency-conversion",
  "json-yaml-xml-conversion": "json-yaml-xml-conversion",
  "take-notes": "take-notes",
  calculators: "calculators",
  "calculators/mathematics-calculator": "calculators/mathematics-calculator",
  "calculators/simple-interest-calculator":
    "calculators/simple-interest-calculator",
  "calculators/compound-interest-calculator":
    "calculators/compound-interest-calculator",
  "calculators/date-difference-calculator":
    "calculators/date-difference-calculator",
  time: "time",
};

export const UNIQUE_UTILITIES_COMPONENTS: { [key: string]: JSX.Element } = {
  "json-format-or-validate": <JsonFormatAndValidateEditor />,
  "text-difference": <TextDiff />,
  "base64-encode-decode": <Base64EncodeDecode />,
  "url-encode-decode": <UrlEncodeDecode />,
  "unit-conversions": <MeasurementConverter />,
  "currency-conversion": <CurrencyConverter />,
  "json-yaml-xml-conversion": <JsonYamlXml />,
  "take-notes": <Notes />,
  calculators: <Calculators />,
  "calculators/mathematics-calculator": <Calculators />,
  "calculators/simple-interest-calculator": <Calculators />,
  "calculators/compound-interest-calculator": <Calculators />,
  "calculators/date-difference-calculator": <Calculators />,
  time: <Time />,
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
  calculators: "Calculators",
  "calculators/mathematics-calculator": "Mathematics Calculator",
  "calculators/simple-interest-calculator": "Simple Interest Calculator",
  "calculators/compound-interest-calculator": "Compound Interest Calculator",
  "calculators/date-difference-calculator": "Date Difference Calculator",
  time: "Time",
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
  {
    name: "Calculators",
    icon: <Icon path={mdiCalculatorVariant} title="Calculator " size={1.5} />,
    url: "calculators",
  },
  {
    name: "Time",
    icon: <Icon path={mdiClock} title="Time " size={1.5} />,
    url: "time",
  },
];

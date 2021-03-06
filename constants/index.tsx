import React from "react";
import Icon from "@mdi/react";
import dynamic from "next/dynamic";
import {
  mdiCompare,
  mdiCpu64Bit,
  mdiKeyLink,
  mdiSwapHorizontal,
  mdiCurrencyInr,
  mdiRecycleVariant,
  mdiNoteMultipleOutline,
  mdiCalculatorVariant,
  mdiClock,
  mdiCodeTags,
  mdiCodeBrackets,
  mdiHomeOutline,
} from "@mdi/js";

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
const CodeBeautifier = dynamic(import("../components/App/CodeBeautifiers"), {
  ssr: false,
});
const CodeEditor = dynamic(import("../components/App/CodeEditor"), {
  ssr: false,
});
const Home = dynamic(import("../components/App/Home"), {
  ssr: false,
});

export const ROUTE_TO_UNIQUE_UTILITIES: { [key: string]: string } = {
  "": "",
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
  "code-format-beautify": "code-format-beautify",
  "code-editor": "code-editor",
};

export const UNIQUE_UTILITIES_COMPONENTS: { [key: string]: JSX.Element } = {
  "": <Home />,
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
  "code-format-beautify": <CodeBeautifier />,
  "code-editor": <CodeEditor />,
};

export const ROUTE_TO_NAMES: { [key: string]: string } = {
  "": "Welcome",
  "text-difference": "Compare text",
  "base64-encode-decode": "Encode decode base64",
  "url-encode-decode": "Encode decode url",
  "unit-conversions": "Unit conversions",
  "currency-conversion": "Currency conversion",
  "json-yaml-xml-conversion": "Json, Yaml and Xml conversion",
  "take-notes": "Notes",
  calculators: "Calculators",
  "calculators/mathematics-calculator": "Mathematics calculator",
  "calculators/simple-interest-calculator": "Simple interest calculator",
  "calculators/compound-interest-calculator": "Compound interest calculator",
  "calculators/date-difference-calculator": "Date difference calculator",
  time: "Time",
  "code-format-beautify": "Code format beautify",
  "code-editor": "Code editor",
};

export const AVAILABLE_DEV_UTIL_OPTIONS: Array<{
  name: string;
  icon: JSX.Element;
  url: string;
  hasSubRoutes: boolean;
  includeInHomePage: boolean;
}> = [
  {
    name: "Home",
    icon: <Icon path={mdiHomeOutline} title="Time " size={1.5} />,
    url: "",
    hasSubRoutes: false,
    includeInHomePage: false,
  },
  {
    name: "Code editor",
    icon: <Icon path={mdiCodeBrackets} title="Time " size={1.5} />,
    url: "code-editor",
    hasSubRoutes: true,
    includeInHomePage: true,
  },
  {
    name: "Code beautify/format",
    icon: <Icon path={mdiCodeTags} title="Time " size={1.5} />,
    url: "code-format-beautify",
    hasSubRoutes: true,
    includeInHomePage: true,
  },
  {
    name: "Text diff",
    icon: <Icon path={mdiCompare} title="Text Diff" size={1.5} />,
    url: "text-difference",
    hasSubRoutes: false,
    includeInHomePage: true,
  },
  {
    name: "JSON : YML : XML",
    icon: <Icon path={mdiRecycleVariant} title="JSON : YML : XML" size={1.5} />,
    url: "json-yaml-xml-conversion",
    hasSubRoutes: false,
    includeInHomePage: true,
  },
  {
    name: "Converters",
    icon: <Icon path={mdiSwapHorizontal} title="Converters" size={1.5} />,
    url: "unit-conversions",
    hasSubRoutes: true,
    includeInHomePage: true,
  },
  {
    name: "Currency conversion",
    icon: <Icon path={mdiCurrencyInr} title="Currency conversion" size={1.5} />,
    url: "currency-conversion",
    hasSubRoutes: true,
    includeInHomePage: true,
  },
  {
    name: "Calculators",
    icon: <Icon path={mdiCalculatorVariant} title="Calculator " size={1.5} />,
    url: "calculators",
    hasSubRoutes: true,
    includeInHomePage: true,
  },
  {
    name: "Base64 encode / decode",
    icon: <Icon path={mdiCpu64Bit} title="Text Diff" size={1.5} />,
    url: "base64-encode-decode",
    hasSubRoutes: false,
    includeInHomePage: true,
  },
  {
    name: "Url encode / decode",
    icon: <Icon path={mdiKeyLink} title="Text Diff" size={1.5} />,
    url: "url-encode-decode",
    hasSubRoutes: false,
    includeInHomePage: true,
  },
  {
    name: "Noter",
    icon: <Icon path={mdiNoteMultipleOutline} title="Noter" size={1.5} />,
    url: "take-notes",
    hasSubRoutes: false,
    includeInHomePage: true,
  },
  {
    name: "Time",
    icon: <Icon path={mdiClock} title="Time " size={1.5} />,
    url: "time",
    hasSubRoutes: false,
    includeInHomePage: true,
  },
];

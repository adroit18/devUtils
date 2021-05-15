import React from "react";
import Icon from "@mdi/react";
import {
  mdiCodeJson,
  mdiCompare,
  mdiCpu64Bit,
  mdiKeyLink,
  mdiSwapHorizontal,
  mdiCurrencyInr,
  mdiRecycleVariant 
} from "@mdi/js";
import dynamic from "next/dynamic";
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

export const availableDevUtilOptions = [
  {
    name: "Json format / validate",
    icon: <Icon path={mdiCodeJson} title="JSON Format / Validate" size={1.5} />,
    component: <JsonFormatAndValidateEditor />,
  },
  {
    name: "Text diff",
    icon: <Icon path={mdiCompare} title="Text Diff" size={1.5} />,
    component: <TextDiff />,
  },
  {
    name: "Base64 encode / decode",
    icon: <Icon path={mdiCpu64Bit} title="Text Diff" size={1.5} />,
    component: <Base64EncodeDecode />,
  },
  {
    name: "Url encode / decode",
    icon: <Icon path={mdiKeyLink} title="Text Diff" size={1.5} />,
    component: <UrlEncodeDecode />,
  },
  {
    name: "Converters",
    icon: <Icon path={mdiSwapHorizontal} title="Converters" size={1.5} />,
    component: <MeasurementConverter />,
  },
  {
    name: "Currency conversion",
    icon: <Icon path={mdiCurrencyInr} title="Converters" size={1.5} />,
    component: <CurrencyConverter />,
  },
  {
    name: "JSON : YML : XML",
    icon: <Icon path={mdiRecycleVariant} title="Converters" size={1.5} />,
    component: <CurrencyConverter />,
  },
];

import React from "react";
// import Container from "@material-ui/core/Container";
import dynamic from "next/dynamic";

const JsonFormatAndValidateEditor = dynamic(
  import("../JsonFormatAndValidate"),
  { ssr: false }
);
const TextDiff = dynamic(import("../TextDiff"), { ssr: false });
const Base64EncodeDecode = dynamic(import("../Base64EncodeDecode"), {
  ssr: false,
});
const UrlEncodeDecode = dynamic(import("../UrlEncodeDecode"), { ssr: false });
const MeasurementConverter = dynamic(import("../Converters/MeasurementConverter"), { ssr: false });
const CurrencyCoverter = dynamic(import("../Converters/CurrencyConverter"), { ssr: false });

export default function WorkArea(): JSX.Element {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0% 2% 0% 7%",
        }}
      >
        <CurrencyCoverter />
      </div>
    </React.Fragment>
  );
}

import React from "react";
import { ROUTE_TO_UNIQUE_UTILITIES } from "../constants";
import HTML from "./_html";

export default function Base64EncodeDecode(): JSX.Element {
  return <HTML url={ROUTE_TO_UNIQUE_UTILITIES["base64-encode-decode"]} />;
}

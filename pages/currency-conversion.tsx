import React from "react";
import { ROUTE_TO_UNIQUE_UTILITIES } from "../constants";
import HTML from "./_html";

export default function CurrencyConversion(): JSX.Element {
  return <HTML url={ROUTE_TO_UNIQUE_UTILITIES["currency-conversion"]} />;
}

import React from "react";
import { ROUTE_TO_UNIQUE_UTILITIES } from "../../constants";
import HTML from "../_html";

export default function AllCurrencyConversionRoutes(): JSX.Element {
  return <HTML url={ROUTE_TO_UNIQUE_UTILITIES["currency-conversion"]} />;
}

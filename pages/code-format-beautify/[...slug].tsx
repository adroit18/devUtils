import React from "react";
import { ROUTE_TO_UNIQUE_UTILITIES } from "../../constants";
import HTML from "../_html";

export default function AllCodeBeautifier(): JSX.Element {
  return <HTML url={ROUTE_TO_UNIQUE_UTILITIES["code-format-beautify"]} />;
}

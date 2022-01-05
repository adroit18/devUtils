import React from "react";
import { ROUTE_TO_UNIQUE_UTILITIES } from "../../constants";
import HTML from "../_html";

export default function AllCodeEditor(): JSX.Element {
  return <HTML url={ROUTE_TO_UNIQUE_UTILITIES["code-editor"]} />;
}

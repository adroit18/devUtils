import React from "react";
import { ROUTE_TO_UNIQUE_UTILITIES } from "../constants";
import HTML from "./_html";

export default function TakeNotes(): JSX.Element {
  return <HTML url={ROUTE_TO_UNIQUE_UTILITIES["take-notes"]} />;
}

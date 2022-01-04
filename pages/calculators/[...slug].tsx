import React from "react";
import { useRouter } from "next/router";
import { ROUTE_TO_UNIQUE_UTILITIES } from "../../constants";
import HTML from "../_html";

export default function AllCalculatorsRoutes(): JSX.Element {
  const { asPath: fullRoute } = useRouter();
  return <HTML url={ROUTE_TO_UNIQUE_UTILITIES[fullRoute.substring(1)]} />;
}

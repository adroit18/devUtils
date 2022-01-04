import React from "react";
import { useRouter } from "next/router";
import { ROUTE_TO_UNIQUE_UTILITIES } from "../../constants";
import HTML from "../_html";

export default function AllUnitConversionRoutes(): JSX.Element {
  const { asPath: fullRoute } = useRouter();
  console.log(fullRoute);
  return <HTML url={ROUTE_TO_UNIQUE_UTILITIES["unit-conversions"]} />;
}

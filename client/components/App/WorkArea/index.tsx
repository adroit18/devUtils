import React from "react";
import { UNIQUE_UTILITIES_COMPONENTS } from "../../../constants";

export default function WorkArea(props: {
  state: { selectedUtility: string };
}): JSX.Element {
  const {
    state: { selectedUtility },
  } = props;
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0% 2% 0% 7%",
        }}
      >
        {UNIQUE_UTILITIES_COMPONENTS[selectedUtility]}
      </div>
    </React.Fragment>
  );
}

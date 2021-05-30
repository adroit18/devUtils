import React from "react";
import { UNIQUE_UTILITIES_COMPONENTS } from "../../../constants";
import { ISelectedRoute } from "../../../constants/interface";

export default function WorkArea(props: ISelectedRoute): JSX.Element {
  const {
    selectedUtility
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

import React from "react";
import { theme } from "../../constants/constants";

export default function ListItem(props) {
  return <div className="bg-app-button rounded-lg p-2">{props.children}</div>;
}

import React from "react";

export default function ListItem(props) {
  return <div className={`bg-app-card rounded-lg p-2`}>{props.children}</div>;
}

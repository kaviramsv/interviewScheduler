import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const selectClass = classNames("day-list__item",{
    "day-list__item--selected" :props.selected,
    "day-list__item--full":!props.spots
  });
  return (
    <li className={selectClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}
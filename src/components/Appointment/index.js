import React from "react";

import "../Appointment/styles.scss";


export default function Appointment(props) {

  return (
    <article className="appointment">
      {props.time ? <p>Appointment at {props.time}</p> : <p>No appointments</p>}
    </article>
  );

}
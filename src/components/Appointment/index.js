import React from "react";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";

import "../Appointment/styles.scss";


export default function Appointment(props) {

  return (
    <article className="appointment">
      {/* {props.time ? <p>Appointment at {props.time}</p> : <p>No appointments</p>} */}

      <Header time={props.time}/>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/>:       
      <Empty />}
    </article>
  );

}
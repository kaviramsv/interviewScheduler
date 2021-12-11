import React from "react";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";

import "../Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      {/* {props.time ? <p>Appointment at {props.time}</p> : <p>No appointments</p>} */}

      <Header time={props.time}/>
      {mode === EMPTY && 
      <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show student={props.interview.student} interviewer={props.interview.interviewer}
       /> )}
       {mode === CREATE && (
      <Form  
      onCancel={back}
      interviewers={[]}
      interviewer={props.interviewer}
     
    
       /> )}
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/>:       
      <Empty />} */}
    </article>
  );

}
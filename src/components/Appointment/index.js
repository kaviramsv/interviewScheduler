import React from "react";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Confirm from "components/Appointment/Confirm.js";
import Status from "components/Appointment/Status.js";
import Error from "./Error";
import "../Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT ="EDIT";
  const ERROR_ON_SAVE = "Cannot Save";
  const ERROR_ON_DELETE = "Cannot Delete";
  const { mode, transition, back } = 
      useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };     
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {transition(SHOW)})
    .catch(() => transition(ERROR_ON_SAVE, true))
  }; 

  function deleteAppointment(id) {
    transition(DELETING, true);
    return props.cancelInterview(id).then(() => {transition(EMPTY) })
    .catch((err) => {transition(ERROR_ON_DELETE, true) })
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && 
        <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        id={props.id}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
        /> )}    
      {mode === SAVING && <Status message="Saving"></Status>} 
      {mode === CREATE && (
        <Form  
        onCancel={back}
        interviewers={props.interviewers}
        interviewer={props.interviewer}
        onSave={save}    
      /> )}
      {mode === EDIT && (
      <Form 
      onCancel={back} 
      id={props.id}
      interviewers={props.interviewers} 
      interviewer={props.interview.interviewer.id} 
      student={props.interview.student}
      onSave={save} 
      edit={true}
      name={props.interview.student}
      />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message={CONFIRM}
          onCancel={() => back()}
          onConfirm={() => (deleteAppointment(props.id))}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_ON_SAVE && (<Error message={ERROR_ON_SAVE} onClose={back} />)}
      {mode === ERROR_ON_DELETE && (<Error message={ERROR_ON_DELETE} onClose={back} />)}
    </article>
  );

}
import React, { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "./DayList";
import axios from "axios";
import { getAppointmentsForDay} from "helpers/selectors";





export default function Application(props) {


  const [state, setState] = useState({ day: "Monday",
                                       days: [],    
                                       appointments: {}
                                    });

  // const dailyAppointments = [];     
                             
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  // useEffect(() => {
  //   axios.get("/api/days").then(response => setDays(response.data));
  // }, []);
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      // set your states here with the correct values...
      console.log('O',all[0]); // first
      console.log('1',all[1]); // second
      console.log('2',all[2]); // third
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
     

    })
  }, []);


 const dailyAppointments = getAppointmentsForDay(state, state.day);
 console.log(dailyAppointments);
// [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];
 
  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs" />

      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          return (<Appointment key={appointment.id} {...appointment} />)
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

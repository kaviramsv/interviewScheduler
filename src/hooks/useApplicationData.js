import { useState, useEffect } from "react";

import axios from "axios";
import { getAvailableSpots } from "helpers/selectors";



export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }//overriding only the values of interviewer
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    
    const spots_remaining=getAvailableSpots(appointments,state.days,state.day);
    console.log("in add",spots_remaining);
    const day_id=state.days.findIndex(item=>item.name===state.day);
    
    console.log(day_id);
    const day_obj = {
      ...state.days[day_id],
      spots: spots_remaining
    }
    console.log("day",day_obj);
    const days = [
      ...state.days,
    ]
    days[day_id] = day_obj;
    console.log("days",days);
    console.log("day_id",day_id);
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({ ...prev, appointments,days }));
      })
    //setState({ ...state, appointments });
    // setState(prev => ({...prev, appointments}));
    
  }
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    

    const spots_remaining=getAvailableSpots(appointments,state.days,state.day);
    console.log("in add",spots_remaining);
    const day_id=state.days.findIndex(item=>item.name===state.day);
    
    console.log(day_id);
    const day_obj = {
      ...state.days[day_id],
      spots: spots_remaining
    }
    console.log("day",day_obj);
    const days = [
      ...state.days,
    ]
    days[day_id] = day_obj;
    console.log("days",days);
    console.log("day_id",day_id);
    console.log("delete",spots_remaining);
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments,days }));


  }


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
      // console.log('O',all[0]); // first
      // console.log('1',all[1]); // second
      //console.log('2', all[2]); // third
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));


    })
  }, []);

  return { state,  setDay, bookInterview, cancelInterview }
}
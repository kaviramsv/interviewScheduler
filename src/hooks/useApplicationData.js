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
    //construct appointment obj
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };        
    const spotsRemaining=getAvailableSpots(appointments,state.days,state.day);
    const dayId=state.days.findIndex(item=>item.name===state.day);            
    const dayObj = {
      ...state.days[dayId],
      spots: spotsRemaining
    }
    // construct day obj with spots 
    const days = [
      ...state.days,
    ]
    days[dayId] = dayObj;    

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState(prev => ({ ...prev, appointments,days }));
      }) 
    }


  function cancelInterview(id) {
    //construct appointment obj
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };    

    const spotsRemaining=getAvailableSpots(appointments,state.days,state.day);    
    const dayId=state.days.findIndex(item=>item.name===state.day);
    // construct day obj with spots 
    const dayObj = {
      ...state.days[dayId],
      spots: spotsRemaining
    } ;
    const days = [
      ...state.days,
    ]
    days[dayId] = dayObj;    
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments,days }));
  } 
  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {             
      setState(prev => 
        ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);
  return { state,  setDay, bookInterview, cancelInterview }
}
export function getAppointmentsForDay(state, day) {

   const day_array = state.days.filter(item => item.name === day);
   if (day_array.length === 0) {
      return [];
   }
   const appt_arr = day_array.map(item => item.appointments);
   const data = [];
   for (const appt of appt_arr[0]) {
      data.push(state.appointments[appt])
   }
   return data;
}

export function getInterview(state, interview) {

   if (!interview) {
      return null;
   }
   const id = interview.interviewer;
   const student = interview.student;
   const details = state.interviewers[id];
   const new_obj = {};
   new_obj['student'] = student;
   new_obj['interviewer'] = details;  
   return new_obj;
}

export function getInterviewersForDay(state, day) {

   const interviewers = [];
   const days = state.days.filter(item => item.name === day);
   const interviewer_array = days[0].interviewers;
   
   for (const interview in state.interviewers) {
      if (interviewer_array.includes(state.interviewers[interview].id)) {
         interviewers.push(state.interviewers[interview]);
      }
   }
   return interviewers.length ? interviewers : [];
}

export function getAvailableSpots(appointments,days,day) {

   const find_day=days.filter(item=>item.name===day); 
   const find_appts_for_day = find_day[0].appointments;   
   const empty_appts_for_day= find_appts_for_day.filter(apptId=>!appointments[apptId].interview);
   const spots_available=empty_appts_for_day.length;
   return  spots_available;

}
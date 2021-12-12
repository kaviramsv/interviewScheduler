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
   const id = interview.interviewer;//incoming data
   const student = interview.student;//incoming data
   const details = state.interviewers[id];//need to fetch from interviewers

   const new_obj = {};//construct new obj
   new_obj['student'] = student;
   new_obj['interviewer'] = details;
   // console.log(new_obj);
   return new_obj;
}

//  i/p====>{ student: "Archie Cohen", interviewer: 2 }

//  o/p====>{
//         student: 'Archie Cohen',
//         interviewer: {
//           id: 2,
//           name: 'Tori Malcolm',
//           avatar: 'https://i.imgur.com/Nmx0Qxo.png'
//         }
//       }
// 

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
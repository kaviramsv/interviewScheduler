export function getAppointmentsForDay(state, day) {
   

   const day_array = state.days.filter(item=>item.name===day);
   if(day_array.length===0){
      return [];
   }

   const appt_arr = day_array.map(item=>  item.appointments);
   const data =[];
 
  for(const appt of appt_arr[0]){   
    
   data.push(state.appointments[appt])
  }
   console.log(data);
   return data;
  

}
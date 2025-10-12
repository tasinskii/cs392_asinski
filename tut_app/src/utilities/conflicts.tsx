
interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseCardProps {
  key: number;
  name: string;
  course: Course;
  isSelected: boolean; 
  click: () => void;
  noConflict: boolean;
}

export interface day {
  times: Array<boolean>; //ten minute increments, false is occupied, available is true
}


function calctime_in10mins(time: Array<string>) { 
  let start_time = (time[0].split(":")[0] * 6) + (time[0].split(":")[1] / 10); //mins
  let end_time = (time[1].split(":")[0] * 6) + (time[1].split(":")[1] / 10); //mins ,
  return [start_time, end_time];
}


function newday(time: Array<string>, times: Array<boolean>, set_or_clear: boolean) {
  //console.log("newday")
  let [start_time, end_time] = calctime_in10mins(time);
  let busy = Array<boolean>(end_time - start_time).fill(set_or_clear);
  const newArray = [
    ...times.slice(0, start_time),
    ...busy,
    ...times.slice(end_time)
  ]

  return newArray; 
}


export function updateTimes(days: string, time: Array<string>, week: Array<day>, set_or_clear: boolean) {
  //console.log("update_times")
  let week_cp = week.map(day => ({
  ...day,
  times: [...day.times],
  }));
  if (days.includes("M")){
    //console.log("M")
    const monday = newday(time, week_cp[0].times, set_or_clear);
    //console.log(week[0].times)
    week_cp[0].times = monday;
  }if (days.includes("W")){
    const wed = newday(time, week_cp[1].times, set_or_clear);
    week_cp[1].times = wed;
  } if (days.includes("F")){
    const fri = newday(time, week_cp[2].times, set_or_clear);
    week_cp[2].times = fri;
  } if (days.includes("Tu")){
    //console.log("Tu")
    const tues = newday(time, week_cp[3].times, set_or_clear);
    week_cp[3].times = tues;
  } if (days.includes("Th")){
    const thurs = newday(time, week_cp[4].times, set_or_clear);
    week_cp[4].times = thurs;  
  }
  //console.log(week_cp)
  return week_cp;
   
}

function compare_times(arr1: Array<boolean>) {
  //console.log("here")
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] == false) {
      return false;
    }
  }
  return true; 
}

export function detectOverlap(days: string, time: Array<string>, week: Array<day>){
  let times = calctime_in10mins(time);
  let start_time = times[0];
  let end_time = times[1];
  
  if (days.includes("M")){
    //console.log((week[0]).times.slice(start_time, end_time))
    
    if (!compare_times(week[0].times.slice(start_time, end_time))) {
      //console.log("hi")
      return true;
    } 
  }if (days.includes("W")){
    if (!compare_times(week[1].times.slice(start_time, end_time))) {
      return true;
    } 
  } if (days.includes("F")){
    if (!compare_times(week[2].times.slice(start_time, end_time))) {
      return true;
    } 
  } if (days.includes("Tu")){
      if (!compare_times(week[3].times.slice(start_time, end_time))) {
      return true;
    } 
  } if (days.includes("Th")){
      if (!compare_times(week[4].times.slice(start_time, end_time))) {
      return true;
      } 
  }

  return false;
}


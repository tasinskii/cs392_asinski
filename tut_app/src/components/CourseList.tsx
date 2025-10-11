import { useState } from 'react'
import Modal from './Modal'
import type {day} from '../utilities/conflicts'
import {updateTimes, detectOverlap} from '../utilities/conflicts'
interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;

}

interface CourseListProps {
  courses: Record<string, Course>;
  term: string;
}

interface CourseCardProps {
  key: number;
  name: string;
  course: Course;
  isSelected: boolean; 
  click: () => void;
  isConflict: boolean;
}
const CourseCard = ({key, name, course, isSelected, click, isConflict}: CourseCardProps) => {
  //console.log(key)
  return (
    <div onClick={click}>
      <div className = {`grid grid-rows-6 grid-cols-1 h-50 w-auto-fit p-2 border-2 border-gray-200 rounded-lg ${
          isSelected ? "bg-blue-100" : isConflict ? "bg-red-100" : ""}`}>   
        <div className = "font-bold text-2xl text-black ">{name}</div>
        <div className="row-start-2">{course.title}</div>
        <div className="row-start-6 text-gray-500">{course.meets}</div>
    </div> 
  </div>
  )  
}

const CourseList = ({courses, term}: CourseListProps) => {
  const [selected, setSelected] = useState(Array(Object.entries(courses).length).fill(0));
  const [popUp, setPopUp] = useState(false);
  let init_day: day = {times: Array<boolean>(144).fill(true)}; //initially, everything is available 
  let init_week = Array.from({ length: 5 }, () => ({
  times: Array<boolean>(144).fill(true)
  }))
  const [week, setWeek] = useState(init_week);
  const [invalidCourses, setInvalidCourses] = useState(Array<boolean>(Object.entries(courses).length).fill(false)); 
  const courseNames = Object.entries(courses).map(([name, _]) => name);
  const courseTitles = Object.entries(courses).map(([_, content]) => content.title);
  const courseMeeting = Object.entries(courses).map(([_, content]) => content.meets);
  const courseInfo = courseNames.map((_, i) => [courseNames[i], courseTitles[i], courseMeeting[i]])




  const click = (i:number) => {
    //check if overlap
    //console.log(week)
    const meets_data = courseMeeting[i].split(" ");
    const days = meets_data[0];
    const time = meets_data[1].split("-")
    if (selected[i] == 0) {
      console.log(detectOverlap(days, time, week))
      if (!detectOverlap(days, time, week)) {
        setSelected(selected => {
        const cp = [...selected];
        cp[i] = (cp[i] + 1) % 2;
        return cp; 
        });

        
        setWeek(prevWeek => {
          const newWeek = updateTimes(days, time, prevWeek, false);
          
          setInvalidCourses(courseMeeting.map(meeting =>
            detectOverlap(
              meeting.split(" ")[0],
              meeting.split(" ")[1].split("-"),
              newWeek
            )
          ));
          return newWeek;
        });

      } 
    } else {
      setSelected(selected => {
        const cp = [...selected];
        cp[i] = (cp[i] + 1) % 2;
        return cp; 
      });

      setWeek(prevWeek => {
        const newWeek = updateTimes(days, time, prevWeek, true);
        
        setInvalidCourses(courseMeeting.map(meeting =>
          detectOverlap(
            meeting.split(" ")[0],
            meeting.split(" ")[1].split("-"),
            newWeek
          )
        ));
        return newWeek;
      });

    } 


/*
    setInvalidCourses(courseMeeting.map((meeting) =>  
      detectOverlap(meeting.split(" ")[0], meeting.split(" ")[1].split("-"), week)
    ));
    console.log(week);*/
  };

  //console.log(Object.entries(courses)); 
  return (
    <div> 
      <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setPopUp(true)}>See selected courses</button> 

      <Modal isOpen={popUp} onClose={ () => setPopUp(!popUp)}>
        <div className = "p-2 grid grid-cols-1">
          {
            selected.filter(x => x == 1).length == 0 ? 
              `Click on courses to add them to your schedule!` : 
              `Selected Courses: ${selected.filter(x => x == 1).map((_, i) => courseInfo[i])}`
          }
        </div>
      </Modal>
      
      <div className = "grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 px-3">
        
        {Object.entries(courses).map(([name, content], i) =>
          content.term === term ? (
            <CourseCard key={i} name={name} course={content} isSelected={selected[i]} click={() => click(i)} isConflict={invalidCourses[i]} />
          ) : null
        )}    
      </div>
    </div>
  );

  
  

}

export default CourseList

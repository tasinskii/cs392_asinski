import { useState } from 'react'
import Modal from './Modal'
import type {day} from '../utilities/conflicts'
import {updateTimes, detectOverlap} from '../utilities/conflicts'
import CourseEditor from '../components/Form'

import { signInWithGoogle, signOut, useAuthState, useProfile} from '../utilities/firebase'

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
  editClick: () => void;
  user: any;
}
const CourseCard = ({key, name, course, isSelected, click, isConflict, editClick, user}: CourseCardProps) => {
  console.log(key)
  //<CourseEditor arr={[course.title, course.meets]}/> 
  return (
    <div>    
      <div onClick={click}>
        <div className = {`grid grid-rows-6 grid-cols-1 h-50 w-auto-fit p-2 border-2 border-gray-200 rounded-lg ${
            isSelected ? "bg-blue-100" : isConflict ? "bg-red-100" : ""}`}>   
          <div className = "font-bold text-2xl text-black ">{name}</div>
          <div className="row-start-2">{course.title}</div>
          <div className="row-start-6 text-gray-500">{course.meets}</div>
        </div>
      </div>
      {user ? <button className = "bg-blue-50 rounded-lg p-2" onClick={editClick} >Edit</button> : ""}

    </div>

  )  
}

const CourseList = ({courses, term}: CourseListProps) => {
  const [selected, setSelected] = useState(Array(Object.entries(courses).length).fill(0));
  const [popUp, setPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const {user} = useAuthState();
  let isAdmin = false;
  const profile = useProfile(); 
  if (profile){
    isAdmin = profile
  }
  let init_week = Array.from({ length: 5 }, (): day => ({ 
    times: Array<boolean>(144).fill(true)
  }))
  const [currentEdit, setCurrentEdit] = useState(-1);
  const [weekFall, setWeekFall] = useState(init_week);
  const [weekWinter, setWeekWinter] = useState(init_week);
  const [weekSpring, setWeekSpring] = useState(init_week);
  const [invalidCourses, setInvalidCourses] = useState(Array<boolean>(Object.entries(courses).length).fill(false)); 
  const courseNames = Object.entries(courses).map(([name, _]) => name);
  const courseTitles = Object.entries(courses).map(([_, content]) => content.title);
  const courseMeeting = Object.entries(courses).map(([_, content]) => content.meets);
  const courseInfo = courseNames.map((_, i) => [courseNames[i], courseTitles[i], courseMeeting[i]])

  const editClick = (i :number) => {
    setEditPopUp(true);
    setCurrentEdit(i); 
  }

  const click = (i:number) => {
    //check if overlap
    //console.log(week)
    const term = courseNames[i][0];
    let week;
    let setWeek;
    console.log(term)
    switch (term) {
      case 'F':
        week = weekFall;
        setWeek = setWeekFall;
        break;
      case 'W': 
        week = weekWinter;
        setWeek = setWeekWinter;
        break;
      case 'S':
        week = weekSpring;
        setWeek = setWeekSpring;
        break;
      default: 
        return;
    }
    
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
          
          setInvalidCourses(courseMeeting.map((meeting, j) => {
            if (courseNames[j][0] === term) {
              console.log(meeting)
              console.log(detectOverlap(
                meeting.split(" ")[0],
                meeting.split(" ")[1].split("-"),
                newWeek
              ))
              return detectOverlap(
                meeting.split(" ")[0],
                meeting.split(" ")[1].split("-"),
                newWeek
              )
            }else{
              return false;
            }
          }

          ));
          console.log(invalidCourses);
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
        setInvalidCourses(courseMeeting.map((meeting,j) => {
          if (courseNames[j][0] === term) {
            //console.log("check")
            return detectOverlap(
              meeting.split(" ")[0],
              meeting.split(" ")[1].split("-"),
              newWeek
            )
          }else{
            return false;
          }
        }

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

  return (
    <div>
      <span className="text-xl text-blue-400 absolute top-10 right-25">
        Welcome, { user ? user.displayName : 'guest' }!
      </span>
      <span className="ml-auto">
        {
          user
          ? <button className = 'absolute bg-gray-100 top-8 right-2 p-3' onClick={signOut}>Sign Out</button>
          : <button className = 'absolute bg-gray-100 top-8 right-2 p-3' onClick={signInWithGoogle}>Sign In</button>   
        }
      </span> 



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
      <Modal isOpen={editPopUp} onClose={() => setEditPopUp(false)}>
        <CourseEditor arr={[courseTitles[currentEdit], courseMeeting[currentEdit], courseNames[currentEdit]]}/>
        <button className = "text-align-center p-2 center bg-red-100 rounded-lg" onClick={() => setEditPopUp(false)}> Cancel</button>
      </Modal>
      
      <div className = "grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 px-3">
        
        {Object.entries(courses).map(([name, content], i) =>
          content.term === term ? (
            <CourseCard key={i} name={name} course={content} isSelected={selected[i]} click={() => click(i)} isConflict={invalidCourses[i]} editClick={() => editClick(i)} user={isAdmin}  />
          ) : null
        )}    
      </div>
    </div>
  );

  
  

}

export default CourseList

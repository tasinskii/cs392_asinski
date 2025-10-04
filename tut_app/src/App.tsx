//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import Banner from './components/Banner'
//import Menu from './components/TermFilter';
//import MenuSelector from './components/TermFilter';
import MenuPage from './components/TermFilter';
//import Course from './components/CourseList'
import { useJsonQuery } from './utilities/fetch';


/*const schedule = {
  "title": "CS Courses for 2018-2019",
  "courses": {
    "F101" : {
      "term": "Fall",
      "number": "101",
      "meets" : "MWF 11:00-11:50",
      "title" : "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110" : {
      "term": "Fall",
      "number": "110",
      "meets" : "MWF 10:00-10:50",
      "title" : "Intro Programming for non-majors"
    },
    "S313" : {
      "term": "Spring",
      "number": "313",
      "meets" : "TuTh 15:30-16:50",
      "title" : "Tangible Interaction Design and Learning"
    },
    "S314" : {
      "term": "Spring",
      "number": "314",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }
  }
};
*/
interface schedule {
  title: string,
  courses: Record<string, Course>
}

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;

}


const App = () => {
  const [json, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php")
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!json) return <h1>No user data found</h1>;
  const schedule = json as schedule; 
  //const [selection, setSelection] = useState(Object.keys(terms)[0]);
  return ( 
    <>
        <Banner title={schedule.title}/>
        <MenuPage courses= {schedule.courses}/>
        
        
    </>
  )
}

export default App

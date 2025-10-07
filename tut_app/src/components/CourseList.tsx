import { useState } from 'react'
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
  click: () => void
}
const CourseCard = ({key, name, course, isSelected, click}: CourseCardProps) => {
  console.log(key)
  return (
    <div onClick={click}>
      <div className = {`grid grid-rows-6 grid-cols-1 h-50 w-auto-fit p-2 border-2 border-gray-200 rounded-lg ${
          isSelected ? "bg-blue-100" : ""}`}>   
        <div className = "font-bold text-2xl text-black ">{name}</div>
        <div className="row-start-2">{course.title}</div>
        <div className="row-start-6 text-gray-500">{course.meets}</div>
    </div> 
  </div>
  )  
}
const CourseList = ({courses, term}: CourseListProps) => {
  const [selected, setSelected] = useState(Array(Object.entries(courses).length).fill(0));
  const click = (i:number) => {
    setSelected(selected => {
      const cp = [...selected];
      cp[i] = (cp[i] + 1) % 2;
      return cp; 
    });
    
  };
  const courseNames = Object.entries(courses).map((name, _) => name[0]);
  console.log(courseNames);
  return (
    <div> 
      {`Selected Courses: ${selected.filter(x => x == 1).map((_, i) => courseNames[i])}`}
      <div className = "grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 px-3">
        
        {Object.entries(courses).map(([name, content], i) =>
          content.term === term ? (
            <CourseCard key={i} name={name} course={content} isSelected={selected[i]} click={() => click(i)} />
          ) : null
        )}    
      </div>
    </div>
  );

  
  

}

export default CourseList

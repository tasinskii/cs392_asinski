

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
  name: string;
  course: Course;
}

const CourseCard = ({name, course}: CourseCardProps) => (
  <div className = "grid grid-rows-6 grid-cols-1 h-50 w-auto-fit p-2 border-2 border-gray-200 rounded-lg">   
    <div className = "font-bold text-2xl text-black ">{name}</div>
    <div className="row-start-2">{course.title}</div>
    <div className="row-start-6 text-gray-500">{course.meets}</div>
  </div>
) 
const CourseList = ({courses, term}: CourseListProps) => {
  return (
    <div className = "grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 px-3">
      {
        Object.entries(courses).map(
          ([name, content]) => (
            content.term === term ? CourseCard({name: name, course: content}) : null
          )
        )
      }
    </div>
  );

  
  

}

export default CourseList

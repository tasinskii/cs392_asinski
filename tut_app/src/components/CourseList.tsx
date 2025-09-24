

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;

}

interface CourseListProps {
  courses: Record<string, Course>;
}

const CourseList = ({courses}: CourseListProps) => (
  <ul>
  {
    Object.entries(courses).map(([name, content]) => (
      <li> {name} : {content.title} </li>
    ))
  }

  </ul>
)

export default CourseList


interface CourseListProps {
  list: Record<string, Object>;
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

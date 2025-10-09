import { useState } from "react";
import CourseList from './CourseList'

const terms = {
  Fall: 'Displaying Fall Courses',
  Winter: 'Displaying Winter Courses',
  Spring: 'Displaying Spring Courses'
};

interface MenuButtonProps {
  term: string;
  selection: string;
  setSelection: (term: string) => void;
}

const MenuButton = ({term, selection, setSelection} : MenuButtonProps) => (
  <div className = "p-2">
    <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
      onChange={() => setSelection(term)} />
    <label className="btn btn-success mb-1 p-2" htmlFor={term}>
    { term }
    </label>
  </div>
);

interface MenuSelectorProps {
  selection: string;
  setSelection: (term: string) => void;
}

const MenuSelector = ({selection, setSelection} : MenuSelectorProps) => (
  <div className="btn-group">
    { 
      Object.keys(terms).map(term => <MenuButton key={term} term={term} selection={selection} setSelection={setSelection} />)
    }
  </div>
);

interface MenuPageProps {
  courses: Record<string, Course>;
}

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

const MenuPage = ({courses}: MenuPageProps) => {
  const [selection, setSelection] = useState(Object.keys(terms)[0]);
  return (
    <div>
      <MenuSelector selection={selection} setSelection={setSelection} />
      <CourseList courses={courses} term={selection}/>
    </div>

  );
  
}

export default MenuPage;


//import { useForm, type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form';

type CourseEditorProps = {
  arr: string[];
};

const CourseEditor = ({arr}: CourseEditorProps) => {
 
  const onSubmit = () => {
    console.log(`Submitting`)
    // Simulate a 2-second API call
    //await new Promise(resolve => setTimeout(resolve, 2000));
  };


  return (
    <div>
      <form className ="grid grid-cols-1 gap-3" onSubmit={onSubmit}>
        <label >
          Title: <br /> <input className = "rounded-lg p-4 bg-gray-200 border" type="text" size={40} value={arr[0]} />
        </label>
        <label>
          Meeting Time: <input className = "rounded-lg p-4  bg-gray-200 border"type="text" size={40} value={arr[1]} />
        </label>
      </form>
    </div>

  )
  

  //return (<div>{arr.arr[0]} {arr.arr[1]}</div>)
};

export default CourseEditor;

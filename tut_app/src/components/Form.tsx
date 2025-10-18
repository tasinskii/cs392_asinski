
//import { useForm, type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form';
import * as z from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const terms = z.enum(["F", "W", "S"]);

const ZodCourse = z.object (
  {
    title: z.string().min(2, "Use at least 2 characters"),
    term: z.enum(["F", "W", "S"], { message: "Term must be F, W, or S" }),
    course_num: z.string().regex(/^\d{3}(?:-\d)?$/, "must be 3 digits or optional hyphen and another digit"),
    meeting_time: z.string().regex(/^(?:M|W|F|Tu|Th)+\s\d{2}:\d{2}-\d{2}:\d{2}$/, "Must be some combination of MWFTuTH and XX:XX-XX:XX"),
  }
)

type CourseFormValues = z.infer<typeof ZodCourse>

type CourseEditorProps = {
  arr: string[];
};


const CourseEditor = ({arr}: CourseEditorProps) => {

  const {register, handleSubmit, formState: {errors, isSubmitting} } = useForm<CourseFormValues>(
    {
      resolver: zodResolver(ZodCourse),
      defaultValues: {
        title: arr[0],
        meeting_time: arr[1],
        course_num: arr[2].slice(1),
        term: arr[2][0]
      }

    }
  )


  const onSubmit = () => {
    console.log(`Submitting`)
    
  };

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-3">

      <label>
        Title:
        <input
          {...register("title")}
          className="rounded-lg p-4 bg-gray-200 border w-full"
          type="text"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </label>


      <label>
        Meeting Time:
        <input
          {...register("meeting_time")}
          className="rounded-lg p-4 bg-gray-200 border w-full"
          type="text"
        />
        {errors.meeting_time && (
          <p className="text-red-500">{errors.meeting_time.message}</p>
        )}
      </label>


      <label>
        Course Number:
        <input
          {...register("course_num")}
          className="rounded-lg p-4 bg-gray-200 border w-full"
          type="text"
        />
        {errors.course_num && (
          <p className="text-red-500">{errors.course_num.message}</p>
        )}
      </label>


      <label>
        Course Term:
        <select
          {...register("term")}
          className="rounded-lg p-4 bg-gray-200 border w-full"
        >
          <option value="F">Fall</option>
          <option value="W">Winter</option>
          <option value="S">Spring</option>
        </select>
        {errors.term && <p className="text-red-500">{errors.term.message}</p>}
      </label>

      <button
        type="submit"
        className="bg-blue-100"
      >
        Submit
      </button>
    </form>
  )
  

  //return (<div>{arr.arr[0]} {arr.arr[1]}</div>)
};

export default CourseEditor;

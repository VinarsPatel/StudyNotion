import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <div className='flex w-full justify-between'>
      <div className='w-full'>
         <h1 className="mb-5 text-3xl font-medium text-richblack-5">Add Course</h1>
         <div className='pr-10 py-10'>
            <RenderSteps/>
         </div>
      </div>
      <div className='text-richblack-5 flex flex-col p-5 gap-4 border border-richblack-700 bg-richblack-800 rounded-lg w-[50%]'>
         <p className='text-lg font-semibold '>⚡Course Upload Tips</p>
         <ul className='text-xs/5 font-medium flex flex-col gap-3 pl-5 '>
            <li> ● Set the Course Price option or make it free.</li>
            <li> ● Standard size for the course thumbnail is 1024x576.</li>
            <li> ● Video section controls the course overview video.</li>
            <li> ● Course Builder is where you create & organize a course.</li>
            <li> ● Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
            <li> ● Information from the Additional Data section shows up on the course single page.</li>
            <li> ● Make Announcements to notify any important</li>
            <li> ● Notes to all enrolled students at once.</li>
         </ul>
      </div>
    </div>
  )
}

export default AddCourse
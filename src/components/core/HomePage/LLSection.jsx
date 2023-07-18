import React from 'react'
import HighLightText from './HighLightText'
import progress from '../../../assets/Images/Know_your_progress.svg'
import compare from '../../../assets/Images/Compare_with_others.svg'
import plan from '../../../assets/Images/Plan_your_lessons.svg'

const LLSection = () => {
  return (
    <div className='flex flex-col lg1:gap-14 '>
      <div className='flex flex-col gap-4 items-center w-[80%] justify-center mx-auto'>
                  <div className='font-inter not-italic text-4xl leading-[2.75rem] font-semibold first-letter  text-center'>
                  Your swiss knife for learning any language
                     <HighLightText text={" Coding Skills"} />
                  </div>
                  <div className='text-base font-medium font-inter text-richblack-500 text-center flex flex-col self-stretch w-[70%] mx-auto'>
                  Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                  </div>
      </div>
      <div className='flex flex-col items-center justify-center mx-auto lg1:flex-row lg1:ml-10 lg1:justify-evenly lg1:w-full '>
         <img className='-z-1 translate-y-8 lg1:translate-x-28 lg1:-translate-y-10  ' src={progress} alt=''/>
         <img className='z-0  lg1:-translate-y-8' src={compare} alt=''/>
         <img className='z-10 -translate-y-12  lg1:-translate-x-44 lg1:-translate-y-8 ' src={plan} alt=''/>
      </div> 
    </div>
  )
}

export default LLSection
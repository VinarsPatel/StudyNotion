import React from 'react'
import { LearningGridData } from '../../../data/aboutPageData'
import HighLightText from '../HomePage/HighLightText'
import CTAButton from '../../common/CTAButton'

const LearningGrid = () => {
   return (

      <section className='grid grid-cols-1 min-w-[160px] lg:grid-cols-4 lg:w-auto mb-10 py-24 lg:px-32 bg-richblack-900'>
         {
            LearningGridData.map(
               (ele, index) => {
                  return (
                     <div
                        key={index}
                        className={`w-[50%] lg:w-full mx-auto
                           ${index === 0 && "lg:col-span-2"}
                           ${(ele.order % 2) === 1 ? "bg-richblack-700 ":"bg-richblack-800"} 
                           ${ele.order === 3 && "lg:col-start-2"}
                        `}
                     >
                        {
                           ele.order < 0 ?
                              (
                                 <div className='flex flex-col gap-6 mx-auto pb-10 lg:pb-0 lg:pr-[3.25rem] bg-richblack-900  lg:min-w-fit ranslate-x-[-20%] lg:translate-x-0 '>
                                    <h2 className='text-4xl leading-[2.75rem] font-semibold'>
                                       {ele.heading}
                                       <HighLightText text={ele.highlightText} />
                                    </h2>
                                    <p>
                                       {ele.description}
                                    </p>
                                    <CTAButton active={true} linkto={ele.BtnLink}>{ele.BtnText}</CTAButton>
                                 </div>
                              ) : (
                                 <div className='flex flex-col p-8 gap-8 mx-auto min-h-[250px] lg:w-fit'>
                                    <h2 className='font-semibold text-lg ring-richblack-5 '>
                                       {ele.heading}
                                    </h2>
                                    <p className='font-normal text-sm ring-richblack-100'>
                                       {ele.description}
                                    </p>
                                 </div>
                              )
                        }
                     </div>)
               }
            )

         }
      </section>

   )
}

export default LearningGrid
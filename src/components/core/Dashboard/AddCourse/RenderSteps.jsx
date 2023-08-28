import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { setStep } from '../../../../slices/courseSlice';

const steps = [
   {
      id: 1,
      title: "Course Information",
   },
   {
      id: 2,
      title: "Course Builder",
   },
   {
      id: 3,
      title: "Publish",
   },
];

const RenderSteps = () => {
   const { step } = useSelector((state) => state.course);
   const dispatch = useDispatch();


   return (
      <div>
         {/* <div className='flex'> */}
         <div className='flex items-center'>
            {
               steps.map((ele, ind) => (
                  <div className={`flex w-full items-baseline  ${ele.id>1?"":"max-w-fit"}`}>
                     <div className='w-full flex justify-center items-center'>{ele.id > 1 &&
                        <div className={`border-b-[2px] border-t-[2px] border-dashed text-white w-full h-0 max-w-[130px]
                                          ${step >= ele.id ? "border-yellow-50" : "border-richblack-300"}`}></div>
                     }</div>
                     <div className='flex flex-col min-w-fit items-center justify-center gap-2' >
                        <div className={`border rounded-full h-[39px] w-[39px] flex justify-center items-center
                                    ${step == ele.id ? "bg-yellow-900 border-yellow-50 text-yellow-50 "
                              : step < ele.id ? "bg-richblack-700 border-richblack-300 text-richblack-300 "
                                 : "bg-yellow-50 border-yellow-50 text-richblack-900 "
                           } `
                        }
                           onClick={() => (dispatch(setStep(ele.id)))}
                        >
                           {
                              ele.id >= step ? <span>{ele.id}</span> : <FaCheck className='' />
                           }
                        </div>
                        <div className='text-sm/[1.375rem] font-medium text-richblack-5'>{ele.title}</div>
                     </div>
                  </div>

               ))
            }
         </div>
         {/* </div> */}
      </div>

   )
}

export default RenderSteps
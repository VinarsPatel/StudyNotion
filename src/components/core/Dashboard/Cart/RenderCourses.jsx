import React from 'react'
import { useSelector } from 'react-redux';

const RenderCourses = () => {
   const { cart } = useSelector((state) => state.cart);

   return (
      <div>{
         cart.map((course, index) => {
            return <div className='px-6 gap-5 ' key={index}>
               <img src={course?.thumbnail} alt='course_thumbnail' />

               <div>
                  <p>{course?.courseName}</p>
                  <div>
                     {
                        course.category.map((ctg, index) => {
                           return <span key={index}>{ctg?.name}</span>
                        })
                     }
                  </div>

                  <div>
                     <span>{course?.averageRating || 0}</span>
                     
                  </div>
               </div>
            </div>
         })
      }</div>
   )
}

export default RenderCourses
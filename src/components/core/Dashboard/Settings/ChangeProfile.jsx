import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../../services/operations/settingsAPI';

const inputStyle = "rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none";
const labelStyle = "text-[14px] text-richblack-5";
const genders = ["Male", "Female", "Other"];



const ChangeProfile = () => {

   const { user } = useSelector((state) => state.profile);
   const { token } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   console.log(new Date().toISOString());
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm();

   const changeProfile = (formData) => {
      dispatch(updateProfile(token, formData));
   }

   return (
      <div className='flex flex-col gap-5 p-6 bg-richblack-800 '>
         <h2 className='font-semibold text-lg text-richblack-5 '>Profile Information</h2>

         <form
            onSubmit={handleSubmit(changeProfile)}
            className='flex flex-col gap-5 w-full' >
            <div className='flex gap-6 w-full'>
               <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor='firstName' className={`${labelStyle}`}> First name </label>
                  <input
                     type='text'
                     name='firstName'
                     id='firstName'
                     placeholder="Enter first name"
                     className={`${inputStyle}`}
                     defaultValue={user?.firstName}
                     {...register("firstName", { required: true })}
                  />

                  {errors.firstName && (
                     <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your first name.
                     </span>
                  )}
               </div>
               <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor='lastName' className={`${labelStyle}`}> Last name </label>
                  <input
                     type='text'
                     name='lastName'
                     id='lastName'
                     placeholder="Enter first name"
                     className={`${inputStyle}`}
                     defaultValue={user?.lastName}
                     {...register("lastName", { required: true })}
                  />

                  {errors.lastName && (
                     <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your last name.
                     </span>
                  )}
               </div>
            </div>

            <div className='flex gap-6 w-full '>
               <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor="dateOfBirth" className={`${labelStyle}`}>
                     Date of Birth
                  </label>
                  <input
                     type="date"
                     name="dateOfBirth"
                     id="dateOfBirth"
                     className={`${inputStyle}`}

                     {...register("dateOfBirth", {
                        required: {
                           value: true,
                           message: "Please enter your Date of Birth.",
                        },
                        max: {
                           value: new Date().toISOString().split("T")[0],
                           message: "Date of Birth cannot be in the future.",
                        },
                     })}
                     defaultValue={user?.additionalDetails?.dateOfBirth}
                  />
                  {errors.dateOfBirth && (
                     <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.dateOfBirth.message}
                     </span>
                  )}
               </div>
               {/* <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className={`${labelStyle}`}>
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className={`${inputStyle}`}
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please select a gender.
                </span>
              )}
            </div> */}
               <div className='flex flex-col gap-2 w-[48%]'>
                  <label htmlFor='gender' className={`${labelStyle}`}>Gender</label>

                  <div className='flex flex-row flex-wrap gap-2 py-3'>{
                     genders.map((ele, i) => (
                        <div className='flex gap-2'>

                           <input
                              type='radio'
                              id={`${ele.replace(' ', '')}`}
                              value={ele}
                              key={i}
                              defaultChecked = {ele==="Male"}
                              className='text-yellow-50 bg-red-100 border-red-300 text-red-500 focus:ring-red-200 '
                              {...register("gender", { required: true })}
                           />
                           <label htmlFor={`${ele}`}
                              className={`${labelStyle} text-lg`}
                              key={i} >{ele}</label>
                        </div>

                     ))
                  }
                     {errors.gender && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                           Please select a gender.
                        </span>
                     )}
                  </div>
               </div>

            </div>

            <div>

            </div>
         </form>
      </div>
   )
}

export default ChangeProfile
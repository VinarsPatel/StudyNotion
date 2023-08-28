import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../../../services/operations/settingsAPI';
import { useForm } from 'react-hook-form';
import IconBtn from '../../../common/IconButton';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const inputStyle = "rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none";
const labelStyle = "text-[14px] text-richblack-5";

function ChangePassword() {
   const { token } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [showCurrPassword, setShowCurrPassword] = useState(false);
   const [showNewPassword, setShowNewPassword] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm();


   const changePasswordHandler = (formData) => {
       (changePassword(formData, token));
   }

   return (
      <form
         onSubmit={handleSubmit(changePasswordHandler)}
         className='flex flex-col gap-5 w-full' >
         <div className='flex flex-col gap-5 p-6 bg-richblack-800 border-richblack-700 border rounded-lg'>
            <h2 className='font-semibold text-lg text-richblack-5 '>Password</h2>
            <div className='flex gap-6 w-full'>
               <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlfor='currentPassword' className={`${labelStyle}`}>Current Password</label>

                  <div className='relative w-full'>
                     <input
                        name='currentPassword'
                        id='currentPassword'
                        placeholder='Enter Current Password'
                        type={showCurrPassword ? 'text' : 'password'}
                        className={`${inputStyle} w-full`}
                        {...register('currentPassword', { required: true })}
                     />
                     <span className='absolute right-3 top-[25%] z-[10] cursor-pointer'
                        onClick={() => setShowCurrPassword((prev) => !prev)}>
                        {
                           showCurrPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> :
                              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        }
                     </span>
                  </div>

                  {
                     errors.currentPassword &&
                     <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.currentPassword.message}
                     </span>
                  }
               </div>
               <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlfor='newPassword' className={`${labelStyle}`}>New Password</label>

                  <div className='relative w-full'>
                     <input
                        name='newPassword'
                        id='newPassword'
                        placeholder='Enter New Password'
                        type={showNewPassword ? 'text' : 'password'}
                        className={`${inputStyle} w-full`}
                        {...register('newPassword', { required: true })}
                     />
                     <span className='absolute right-3 top-[25%] z-[10] cursor-pointer'
                        onClick={() => setShowNewPassword((prev) => !prev)}>
                        {
                           showNewPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> :
                              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        }
                     </span>
                  </div>

                  {
                     errors.newPassword &&
                     <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.newPassword.message}
                     </span>
                  }
               </div>
            </div>

         </div>
         <div className='flex flex-row justify-end gap-5'>
            <button onClick={() => {
               navigate("/dashboard/my-profile")
            }}
               className='px-5 py-3 text-richblue-5 text-center text-base font-medium bg-richblack-800 rounded-lg '
            >
               Cancel
            </button>
            <IconBtn type={"submit"} text={"Save"} />
         </div>
      </form>
   )
}

export default ChangePassword
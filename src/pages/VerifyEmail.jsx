import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components/common/Loader';
import OTPInput, { ResendOTP } from "otp-input-react";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import AuthButton from '../components/core/Auth/AuthButton';
import { sendOtp, signUp } from '../services/operations/authAPI';


export const VerifyEmail = () => {
   const { signupData, loading } = useSelector((state) => state.auth);
   const [OTP, setOTP] = useState();
   const navigate = useNavigate();
   const dispatch=useDispatch();

   useEffect(() => {
      if (signupData === null) {
         navigate("/signup");
      }
   },[]);

   const handleOnSubmit = (event) => {
      event.preventDefault();
      const {
         firstName,
         lastName,
         email,
         password,
         confirmPassword,
         accountType,
      } = signupData;
      dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,OTP,navigate));
   }

   return (
      <div className='flex flex-col p-8 justify-center items-center h-[100vh]'>
         {
            loading ?
               <Loader /> :
               <div className='w-[30rem] p-2 flex flex-col gap-6 justify-start'>
                  <h1 className='text-3xl text-richblack-5 font-semibold'>
                     Verify Email
                  </h1>
                  <div className='text-richblack-100 text-lg font-normal'>
                     A verification code has been sent to you. Enter the code below.
                  </div>

                  <form className='flex flex-col gap-9' onSubmit={handleOnSubmit}>
                     <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} placeholder={["-","-"]}
                        inputClassName="bg-richblack-700 text-richblack-100 font-medium text-2xl py-7 px-3 min-w-[50px] rounded-[0.5rem] focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:ring-offset-2 focus:ring-offset-richblack-800"
                        className='outline-[#FFD60A] texty '
                     />

                     <AuthButton classN="w-full">
                        Verify Email
                     </AuthButton>
                  </form>
                  <ResendOTP onResendClick={() => sendOtp(signupData.email, navigate)} className="text-richblack-5 bg-richblack-700 p-3 rounded-lg" />

                  <div className='flex justify-between'>
                     <Link to={"/login"} className='text-richblack-5 flex gap-2 items-center self-stretch text-base font-medium'>
                        <MdOutlineKeyboardBackspace className='text-2xl ' />
                        Back to login
                     </Link>
                  </div>

               </div>
         }
      </div>
   )
}

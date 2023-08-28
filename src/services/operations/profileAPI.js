import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";

const{
   GET_USER_DETAILS_API,
   GET_USER_ENROLLED_COURSES_API,
} = profileEndpoints;

export async function getUserEnrolledCourses(token){
   const toastId =  toast.loading("Loading...")
   try {
      const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API,null,{
         Authorization : `Bearer ${token}`,
      })

      if(!response){
         throw new Error(response.data.message);
      }
      
      toast.dismiss(toastId);
      return response.data.data;

   } catch (error) {
      console.log("GET_USER_ENROLLED_COURSES_API error..........", error);
      toast.error(error?.response?.data?.message || "Something went wrong please try again.");
   }
   toast.dismiss(toastId);

};
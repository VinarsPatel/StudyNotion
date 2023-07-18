import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { contactusEndpoint } from "../apis";

export const contactMailSender = async (data, setLoading)=>{
   setLoading(true);
   try {
      const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data
      );

      console.log("response",response)
      toast.success("Thank You for reaching out to us, we will get back to you shortly.")
   } catch (error) {
      console.log("Something went wrong...",error);
      toast.error("Something went wrong...")
   }
   setLoading(false);
}
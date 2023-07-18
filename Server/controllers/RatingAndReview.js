const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

exports.createRatingAndReview = async (req, res) => {
   try {
      const { rating, review, courseID } = req.body;
      const userID = req.user.id;
      if (!rating || !review || !courseID) {
         return res.status(400).json({
            success: false,
            message: "Fill both the details."
         });
      }

      //check student is enrolled or not
      const course = await Course.findOne({
         _id:courseID,
         studentsEnrolled: {$elemMatch : {$eq: userID}},
      });
      
      if(!course){
         return res.status(404).json({
            success: false,
            message: "Student is not enrolled in this course."
         });
      }
      
      //check student has already rated or not
      const isRated = await RatingAndReview.findOne({
         user:userID,
         course:courseID,
      })

      if(isRated){
         return res.status(403).json({
            success: false,
            message: "Student has already rated this course."
         });
      }

      //create 
      const RandR = await RatingAndReview.create({
         user: userID,
         course: courseID,
         rating,
         review,
      })

      
      //add in the course
      const updatedCourse = await Course.findByIdAndUpdate(courseID,
         {
            $push: {
               ratingAndReview: RandR._id,
            }
         },
         { new: true }
      );
      return res.status(200).json({
         success: true,
         message: "RatingAndReview created Succesfully.",
         data: RandR,
      });
         
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "Section creation failed."
      });
   }
}

exports.getAverageRating = async (req, res) => {
   try {
      const { courseID } = req.body;

      if (!courseID) {
         return res.status(400).json({
            success: false,
            message: "course id is missing."
         });
      }

      const course = await Course.findById(courseID).populate("ratingAndReview").exec();

      let averageRating = 0;
      course.ratingAndReview.map((e) => averageRating += e.rating);
      averageRating /= course.ratingAndReview.length;


      return res.status(200).json({
         success: true,
         message: "average rating",
         avg_rating: averageRating,
      })

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Failed to get average rating."
      });
   }
}

exports.getAllRatingAndReview = async (req, res) => {
   try {

      const allRatingAndReviews = RatingAndReview.find({})
                                 .sort({rating:"desc"})
                                 .populate({
                                    path:"user",
                                    select:"firstName lastname email image "
                                 })
                                 .populate({
                                    path:"course",
                                    select:"courseName"
                                 })
                                 .exec();

      return res.status(200).json({
         success: true,
         message: "All Rating And Review.",
         data: allRatingAndReviews,
      })

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "Failed to get all Rating And Review."
      });
   }
}
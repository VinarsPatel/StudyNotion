const { default: mongoose } = require("mongoose")
const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
require("dotenv").config()

//capture the payment and initiate razorpay order

exports.capturePayment = async (req, res) => {
  try {
    const { courseID } = req.body
    const userID = req.user.id

    if (!courseID) {
      return res.status(400).json({
        success: false,
        message: "Provide course id.",
      })
    }

    const course = await Course.findById(courseID)
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Could not find the course.",
      })
    }

    const uid = new mongoose.Types.ObjectId(userID)
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: true,
        message: "Setudent already enrolled.",
      })
    }

    //create order
    const amount = course.price
    const currency = "INR"

    const options = {
      amount: amount * 100,
      currency,
      //recipt
      nots: {
        courseID,
        userID,
      },
    }

    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)

    return res.status(200).json({
      success: true,
      message: "order intiated succesfully",
      courseName: course.courseName,
      orderID: paymentResponse.id,
      amount: paymentResponse.amount,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Could not initiate order",
    })
  }
}

//authorize payment

exports.verifySignature = async (req, res) => {
  const webhookSecret = process.env.WEBHOOK_SECRET

  const signature = req.headers["x-razorpay-signature"]

  const shasum = crypto.createHmac("sha256", webhookSecret)
  shasum.update(JSON.stringify(req.body))
  const digest = shasum.digest("hex")

  if (signature === digest) {
    console.log("Payment is Authorised")

    const { courseId, userId } = req.body.payload.payment.entity.notes

    try {
      //find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not Found",
        })
      }

      console.log(enrolledCourse)

      //find the student andadd the course to their list enrolled courses me
      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      )

      console.log(enrolledStudent)

      //🟩🟥🟦 mail sender update karna padega aur yeh code bhi mail send krdo confirmation wala
      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations from CodeHelp",
        "Congratulations, you are onboarded into new CodeHelp Course"
      )

      console.log(emailResponse)
      return res.status(200).json({
        success: true,
        message: "Signature Verified and COurse Added",
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    })
  }
}

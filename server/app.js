const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const { Readable } = require("stream");

dotenv.config();
const cors = require("cors");
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });
const connect = mongoose.connection;
connect.on("open", () => {
  console.log("conneted to Database");
});

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

let PORT = process.env.PORT || 3005;

//Importing Auth-Routes

const routingForSignup = require("./routes/signup");
app.use("/register", routingForSignup);

const routingForGooglesignUp = require("./routes/googleSignUp");
app.use("/authenticate", routingForGooglesignUp);

app.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

const callback = require("./routes/authGooleCallback");
app.use("/callback", callback);

const routingForLogin = require("./routes/login");
app.use("/login", routingForLogin);

const routingForDashboard = require("./routes/dashboard");
app.use("/dashboard", routingForDashboard);

const verifyEmail = require("./routes/verifyEmail");
app.use("/verify-email", verifyEmail);

const emailVerifiedPage = require("./routes/emailVerifiedPage");
app.use("/email-verfied", emailVerifiedPage);

const forgotPassword = require("./routes/forgetpasword");
app.use("/forget-password", forgotPassword);

const resetPassword = require('./routes/resetPassword');
app.use("/reset-password",resetPassword);

const upatedPassowrd = require("./routes/updatedPassword");
app.use("/updated-password", upatedPassowrd);

const logOut = require("./routes/logout");
app.use("/logout", logOut);

//questionUpload
const questionRouter = require("./routes/UploadQuestion");
app.use("/question", questionRouter);

app.post("/upload", function (req, res) {
  //console.log(req.body);
  console.log(Readable.from(req.files.f2.data));
  res.send("UPLOADED!!!");
});

const previousYearRouter = require('./routes/previousYearQues')
app.use('/previousyearquestions', previousYearRouter)

const chapterWiseRouter = require('./routes/chapterWiseQues')
app.use('/chapterwisequestions', chapterWiseRouter)


app.listen(PORT, () => {
  console.log(`Server is Running ${PORT}`);
});

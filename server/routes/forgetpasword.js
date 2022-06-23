const router = require('express').Router();
const nodemailer = require('nodemailer');
const User = require('../models/user');
const UserToken = require('../models/otp')
const Jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
const Joi = require('joi')
const { google } = require("googleapis");
dotenv.config();

// let transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'tonmaysardar500@gmail.com',
//         pass: process.env.AUTH_PASSWORD
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// })

const emailFormatValidation = (data)=>{
    const schema =Joi.object({
        email : Joi.string().min(6).required().email()
    });

    return schema.validate(data)
};

router.get('/',(req,res)=>{
    res.render('forget-passowrd');

})

router.post('/',async(req,res)=>{
   

 try {
    const {error} = emailFormatValidation(req.body);
    if(error) return res.status(400).send('Kya Engineer Banega re tuu'+error.details[0].message);

    // Checking whether user id exists or not
    const validUser = await User.findOne({ email : req.body.email});
    // console.log(validUser);
    if(!validUser) return res.status(400).send('Excuse Me , That is a Wrong Email');
    
    if(validUser. isVerified ){
        const userToken = UserToken.findOne({userId:validUser._id});
        // console.log(userToken);
        userToken.oneTimeKey = crypto.randomBytes(70).toString('hex');
      
        //creating a payload for craeating token 
        const payload = {
            id: validUser._id ,
            tokenId : userToken._id,
            oneTimeKey : userToken.oneTimeKey
        }
            // creating a token for oneTime access
        const onetime_key = Jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET , {expiresIn:'5m'});

        const oAuth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.GMAIL_REFRESH_TOKEN
          );
          oAuth2Client.setCredentials({
            refresh_token: process.env.GMAIL_REFRESH_TOKEN,
          });
      
          async function sendMail() {
            try {
              const accessToken = await oAuth2Client.getAccessToken();
              let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  type: "OAUTH2",
                  user: "tonmaysardar500@gmail.com",
                  pass: process.env.AUTH_PASSWORD,
                  clientId: process.env.CLIENT_ID,
                  clientSecret: process.env.CLIENT_SECRET,
                  refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                  accessToken: accessToken,
                },
                tls: {
                  rejectUnauthorized: false,
                },
              });
      
              let mailingDetails = {
                from: '"Team PrepLet"<tonmaysardar500@gmail.com>',
                to: validUser.email,
                subject: "Reset Password Link",
                html: `<h1> GirlFriend ka number toh bhulta </h1>
                              <h2> Click below link to reset password </h2> 
                           <a href = "http://localhost:3005/reset-password?token=${onetime_key }">Click to reset password</a>
                              `,
              };
      
              let Sending = await transporter.sendMail(mailingDetails);
              return Sending;
            } catch (error) {
              console.log("Khatam Tata Bye bye");
              console.log(error);
            }
          }
          sendMail()
            .then((Sending) => console.log("Email Has been sent..", Sending))
            .catch((error) => console.log(error));
      
          res.json({ message: "Check your mail to reset the password", error: false });
 }
 else{
    res.json({message:"Verify your mail firtst",error:true})
 }
 } catch (error) {
    
 }
});
module.exports = router;
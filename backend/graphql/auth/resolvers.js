import { User } from "../../model";
import { verify } from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import crypto from "crypto";
import {
  clearCookie,
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  createResetToken,
  sendPassRefreshToken,
  createResetRefreshToken,
} from "./service";
import { ResetExpiredError } from "../errors/ResetExpiredError";
import { UserInvalidInputError } from "../errors/UserInvalidInputError";
import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import { date } from "yup";
import moment from "moment";
import { ObjectDoesNotExistError } from "../errors/ObjectDoesNotExist";
import { BadTokenError } from "../errors/BadTokenError";
const aws = require("aws-sdk");
const ses = new aws.SES({ region: "us-east-1" });
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({ SES: ses });
import dotenv from "dotenv";
dotenv.config();
const orgn = process.env.CORS_ORIGIN
const resolvers = {
  Query: {
    me: async (_, args, context) => {
      if (context.auth.isAuth) {
        return User.findById(context.auth.userId);
      }
      throw new ForbiddenError();
    },
    checkPasswordExist: (_, { id }, context) => {
      const user = User.findById(id);
      if (user.role === "ROLE_FACILITATOR") {
        return true;
      }
      return false;
    },
  },

  Mutation: {
    login: async (_, { email, password }, context) => {
      const user = await User.findOne({ email, parentUser:null });

      if (!user) {
        throw new AuthenticationError();
      }

      const valid = await compare(password, user.password);

      if (!valid) {
        throw new AuthenticationError();
      }

      const accessToken = createAccessToken(user);

      sendRefreshToken(context.res, createRefreshToken(user));
      await User.findOneAndUpdate(
        { email, parentUser:null },
        {$set:{
          lastActive: moment().toISOString()
}},
        { new: true, useFindAndModify: false }
      );
      return { token: accessToken };
    },
    resetPassword: async (_, { passReset }, context) => {
      const user = await User.findOne({ passReset: passReset });

//console.log(user)
      if (!user || !user.passResetExpire || moment(new Date(Date.now()).toISOString()).isAfter(user.passResetExpire.toISOString())) {
        throw new ResetExpiredError();
      }
      if (!user || !user.passResetVersion || user.passResetVersion == "1") {
        //throw new ResetExpiredError();
      //  console.log("im being a lil puta")
      }

      

     

      const resetToken = createResetToken(user);

      sendPassRefreshToken(context.res, createResetRefreshToken(user));

      return { token: resetToken };
    },

    revokeRefreshTokenForUser: async (_, { id }, context) => {
      // Admin can revoke anyone's refresh token
      if (context.auth.isAuth && context.auth.role === "ROLE_ADMIN") {
        await User.findOneAndUpdate(
          { _id: id },
          { $inc: { tokenVersion: 1 } },
          { new: true, upsert: true, useFindAndModify: false }
        );
      }

      // A user can revokes its own session
      else if (context.auth.isAuth && context.auth.userId === id) {
        await User.findOneAndUpdate(
          { _id: id },
          { $inc: { tokenVersion: 1 } },
          { new: true, upsert: true, useFindAndModify: false }
        );
      }

      // Cannot revoke
      else {
        throw new ForbiddenError();
      }
      return true;
    },

    logout: (_, args, context) => {
      clearCookie(context.res);
      return true;
    },

    switchUser: async (_, { user }, context) => {
      const { auth } = context;

      if (!auth.userId || auth.role !== "ROLE_FACILITATOR")
        throw new ForbiddenError();

      const u = await User.findById(user).populate("parentUser");
      if (u.parentUser.id !== auth.userId) throw new ForbiddenError();

      const accessToken = createAccessToken(u);

      sendRefreshToken(context.res, createRefreshToken(u));
      await User.findOneAndUpdate(
        { _id: user },
        {$set:{
          lastActive: moment().toISOString()
}},
        { new: true, useFindAndModify: false }
      );
      return { token: accessToken };
    },
    sendResetEmail: async ( _,{email})=>{
      const user = await User.findOne({ email, parentUser: null });
      console.log(user)
      if (!user) {
        throw new UserInvalidInputError();
      }


      const passReset = crypto.randomBytes(64).toString('hex');
      await User.findOneAndUpdate(
        { _id: user._id },
        {$set:{passReset: passReset, 
            passResetVersion: 0, 
             passResetExpire: new Date(Date.now()+ 900000).toISOString() }},
        { new: true, useFindAndModify: false }
      );
// console.log(passReset)
      let params = {
                      from: `no-reply@javaconnects.com`, 
                      to: email,
                      subject:  `Reset password Java Music Club`,
                      html: `
                      <h3>Password reset link</h3>
                      <p>A password reset has been requested for this email address. If this was not you please contact the admistrator immediately.</p>
                      <p>To reset your password please click <a href="https://${orgn}/reset/${passReset}">here</a>. This link will expire in 15 minutes. If your link expires please request a new link</p> 
                      `,
                     
                    };
                    console.log(params)
                
                   await transporter.sendMail(params,(err,info)=>{
                    if(err){
                      console.log(err)
                      return false;
                    } else if(info){
                      console.log(info)
                      return true
        
                    }
                  })


    },

    changePassword: async (
      _,
      { currentPassword, newPassword },
      { auth: { isAuth, role, userId } }
    ) => {

      // check if user is authenticated and user is NOT a member
      if (isAuth) {
        
        const user = await User.findById(userId).exec();
        if(user.parentUser){
          throw new ForbiddenError();
        }
        const valid = await compare(currentPassword, user.password);

        if (valid) {
          const pswPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
          if (pswPattern.test(newPassword)) {
            const hashedPassword = await hash(newPassword, 12);
            await User.findOneAndUpdate(
              { _id: userId },
              { $set: { password: hashedPassword } },
              { new: true, useFindAndModify: false }
            );
            return true;
          } else {
            // the given new password cannot be accepted as it did not pass password regex validation
            throw new ForbiddenError();
          }
        } else {
          // the given password and password stored in db do not match
          throw new ForbiddenError();
        }
      } else {
        // user is not authenticated or you is a member
        throw new ForbiddenError();
      }
    },
    changePasswordByReset: async (
      _,
      { newPassword, token },
     
    ) => {
     //console.log(token)
      let payload = null;
      try {
        payload = verify(token, process.env.PASS_RESET_TOKEN_SECRET);
      } catch (err) {
        
        throw new BadTokenError();
      }
      

      if (payload.passResetExpire && !moment(new Date(Date.now()).toISOString()).isAfter(moment(payload.passResetExpire))) {
        
        const user = await User.findOne({ email: payload.email, parentUser: null  }).exec()


          const pswPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
          if (pswPattern.test(newPassword)) {
            const hashedPassword = await hash(newPassword, 12);
            const _u = await User.findOneAndUpdate(
              { _id: payload.userId },
              {$set:{
                password:hashedPassword,
                passResetVersion: 1, 
                passResetExpire: new Date() }},
              { new: true, useFindAndModify: false }
            ).exec();
            
            // console.log(_u)
            // console.log("done")
            return true;
          } else {
            // the given new password cannot be accepted as it did not pass password regex validation
            throw new UserInvalidInputError();
          }
        
      } else {
        // console.log("this one")
        throw new ResetExpiredError();
      }
    },
  },
};

module.exports = {
  resolvers,
};

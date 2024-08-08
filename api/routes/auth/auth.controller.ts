import { NextFunction, Request, Response } from "express";
import { hash } from "bcrypt";
import { userModel } from "../../models/users/user.models";
// const msg = require('mailgun.js')
// const formData = require('form-data')
import { config } from "dotenv";
config();


// const mailgun = new msg(formData);
// mailgun.client({
//   username: 'api',
//   key: process.env.MAIL_GUN_API_KEY as string
// })

/**
 * validates the user's email and password for local sign in
 */
export function findUserByEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;
  userModel
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        res.status(200).send({ available: false });
        next(null);
      } else {
        res.status(200).send({ available: true });
        next(null);
      }
    })
    .catch((err: any) => {
      next(err);
    });
}

export async function registerUser(
  req: Request,
  res: Response,
  next: Function
) {
  const { f_name, l_name, email, password } = req.body;
  try {
    let user = new userModel({ f_name, l_name, email, password });
    if (user) {
      hash(user.password, 10, async (err, hash) => {
        if (err) {
          throw new Error(err.message);
        }
        user.password = hash;
        await user.save().then(() => {
          // mailgun.messages.create('sandbox-123.mailgun.org', {
          //   from: "Admin <mailgun@sandbox3d46e872e7cf4e538dd96d713a020dd4.mailgun.org>",
          //   to: email,
          //   subject: "Welcome",
          //   text: "Welcome to Opulence!",
          //   html: "<h1>Testing some Mailgun awesomeness!</h1>"
          // }).then((e: any) => {
          //   console.log(e)
          // }).catch((err: any) => {
          //   console.error(err)
          // })
          res.status(201).json({ message: "User created successfully" });
        }).catch((err: any) => {
          throw new Error(err.message);
        });
      });
    } else {
      throw new Error("User not created");
    }
  } catch (err: any) {
    res.status(400).json({ message: err });
  }
}

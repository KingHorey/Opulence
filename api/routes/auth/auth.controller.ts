import { NextFunction, Request, Response } from "express";
import { hash } from "bcrypt";
import { userModel } from "../../models/users/user.models";
import { config } from "dotenv";
import Nodemailer from 'nodemailer'

const passwd: string = process.env.OPULENCE_PWD as string;
const host: string = process.env.OPULENCE_HOST as string;
const mail: string = process.env.OPULENCE_MAIL as string;

const nodeMail = Nodemailer.createTransport({
  host,
  port: 587,
  secure: false,
  auth: {
    user: mail,
    pass: passwd
  }
})
config();
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
        try {
          let welcomeMail = {
            from: `The Opulence Team opulence@scrribbles.tech`,
            to: email,
            subject: "Welcome To Opulence",
            html: `
            <div style="height: 90px; width: 80vw><img src="https://bucket.mailersendapp.com/neqvygmrw5l0p7w2/o65qngk1773lwr12/images/9cb95963-89f7-4dd5-8bfd-73998e214d53.png" style="object-fit: cover; width: 100%; height: 100%"></div><h1><strong>Welcome, your account has been <span style="color: rgb(25, 102, 255);">created!</span></strong></h1><h2><strong>Congratulations&nbsp;<span style="color: rgb(25, 102, 255);">${f_name} ${l_name}!</span></strong></h2>
            <p>With Opulence, you’re not just a customer—you’re part of a community that values quality, luxury, and unbeatable deals. From exclusive discounts to premium collections, get ready to experience shopping like never before.</p>
            <p>We’re so excited to have you with us!</p>
            <p>With Opulence, you have access to the best of wears, discounts, and premium customer experience.</p>
            <p>Kindly click the link below to verify your mail</p>
            <a href="https://opulence-zeta.vercel.app" style="padding: 10px; background-color: #417A9F; color: #ffffff; text-decoration: none; font-weight: bold; display: flex; align-items: center; margin-top: 20px; width: 90px ">Opulence Home</a>
            `
          }
          await nodeMail.sendMail(welcomeMail)
          await user.save()
          res.status(201).json({ message: "User created" });
        }
        catch (err: any){
          console.error(err.message)
          res.status(500).json({ message: "User not created" });
        }
      })
    }
    else {
      res.status(500).json({ message: "User not created" });
    }
  }
  catch (err: any) {
              console.error(err.message)

    res.status(401).json({ message: err });
  }
}

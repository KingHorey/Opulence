import { NextFunction, Router, Request, Response } from "express";
import { findUserByEmail, registerUser } from "./auth.controller";
import passport from "./strategy/localStrategy";
import Gpassport from "./strategy/googleStrategy";
import jwt from 'jsonwebtoken'
import { config } from "dotenv";

config();
const auth: Router = Router();


const url: string = process.env.FRONTEND_URL as string

// types
interface Tokens {
  token: string;
}

// middleware

function checkAuthentification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

function preventLoginSignup(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return res.status(400).json({ message: "You are already logged in" });
  } else {
    return next();
  }
}

auth.post(
  "/login",
  preventLoginSignup,
  passport.authenticate("local"),
  (req: any, res: Response) => {
    const tokens: Tokens = {
      token: "",
    };
  const rememberMe = req.body.rememberMe;
    const token = jwt.sign({ token: req.user._id.toString() }, process.env.JWT_TOKEN_SECRET as string, { expiresIn:  rememberMe ? '30d' : '1d'})
    tokens.token = token;
    res.status(200).send({ tokens, isAdmin: req.user.isAdmin });
  }
);

// auth.post("/refresh", (req: Request, res: Response) => {
//   const token = req.headers.authorization
//   console.log(token)
// })

auth.post("/register", registerUser, (req, res) => {

  });

auth.post("/verify_mail", findUserByEmail, (req: Request, res: Response) => {
  // res.status(200).json({ message: "Email is available" });
});

auth.get("/auth-verification", (req: Request, res: Response) => {
  const cookie = req.cookies.sessionID;
  if (cookie === req.sessionID) {
    res.status(200).send("You are logged in");
  }
  else {
    res.cookie("sessionID", '', { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 0 });
    res.status(401).send("You are not logged in")
  }
})


auth.get("/google-auth-verification", preventLoginSignup,  Gpassport.authenticate('google'))

auth.get("/verification/google", preventLoginSignup, Gpassport.authenticate('google', {failureRedirect: "/login"}), async (req: any, res: Response) => {
  const tokens: Tokens = {
    token: "",
  };
  const token = jwt.sign(
    { token: req.user?._id.toString(), email: req.user?.email, isAdmin: req.user?.isAdmin },
    process.env.JWT_TOKEN_SECRET as string,
    { expiresIn: "30d" }
  );
  tokens.token = token;
  // res.cookie('auth_token', response, {secure:true, httpOnly: true, maxAge: 400000000, sameSite: 'lax'})
  res.redirect(`${url}/login/success?tokens=${token}`)
}
  )

export default auth;

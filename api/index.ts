import express, { Request, Response, Express } from "express";
import cors from "cors";
import { config } from "dotenv";
import { mongo } from "./connections/mongoConnection";
import session from "express-session";
import passport from "./routes/auth/strategy/localStrategy";
import auth from "./routes/auth/auth.routes";
const MemoryStore = require("memorystore")(session);
import cookie from 'cookie-parser';
import userRoute from './models/users/user_routes'

config();
mongo;

const PORT: string = process.env.PORT as string;
const sessionSecret: string = process.env.SESSION_SECRET_KEY as string;
const url: string = process.env.FRONTEND_URL as string;

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(
  cors({
    origin: url,
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);


app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);
app.use(passport.session());
app.use(passport.initialize());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get(["/", "/home"], (req: Request, res: Response) => {
  res.json("Welcome to Opulence");
});

app.use("/api/auth", auth);
app.use("/api/user", userRoute)



module.exports = app;

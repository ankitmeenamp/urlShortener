
import 'dotenv/config';

import express from "express";
import { shortenerRoutes } from "./routes/shortener.routes.js";
import { authRoutes } from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import { verifyAuthenitcation } from './middleware/verify-auth-middleware.js';


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(cookieParser())

app.use(
  session({ secret: "my-secret", resave: true, saveUninitialized: false })
);
app.use(flash());

app.use(verifyAuthenitcation)
 
app.use((req, res, next)=>{
  res.locals.user = req.user;
  return next();
})

app.use(authRoutes)
app.use(shortenerRoutes);

try {
  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});  
} catch (error) {
    console.error(error);
    
}

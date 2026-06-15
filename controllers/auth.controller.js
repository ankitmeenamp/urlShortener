
import { email } from "zod";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../config/constants.js";
import {
    authenticateUser,
    clearUserSession, comparePassword,
    createAcessToken,
    createRefreshToken,
    createSession,
    createUser,
    findUserById,
    getAllShortLinks,
    //  generateToken, 
    getUserByEmail,
    hashPassword
} from "../services/auth.services.js";
import { loginUserSchema, registerUserSchema } from "../validators/auth-validator.js";

export const getRegisterPage = (req, res) => {
    if (req.user) return res.redirect("/")

    return res.render("../views/auth/register.ejs", { errors: req.flash("error") })
}

export const postRegister = async (req, res) => {
    if (req.user) return res.redirect("/")

    // const { name, email, password } = req.body;

    const { data, error } = registerUserSchema.safeParse(req.body);
    console.log(data);

    if (error) {
        const errors = error.issues[0].message;
        req.flash("error", errors);
        return res.redirect("/register");
    }
    const { name, email, password } = data;

    const userExists = await getUserByEmail(email);

    console.log("userExists: ", userExists);


    // if(userExists) return res.redirect("/register")
    if (userExists) {
        req.flash("error", "User already axists");
        return res.redirect("/register");
    }

    const hashedPassword = await hashPassword(password);

    const [user] = await createUser({ name, email, password: hashedPassword })
    console.log(user);

    // res.redirect("/login")
    
    await authenticateUser({req, res, user, name, email})

    res.redirect("/")

}

export const getLoginPage = (req, res) => {
    if (req.user) return res.redirect("/")

    return res.render("../views/auth/login.ejs", { errors: req.flash("error") });
}


export const postLogin = async (req, res) => {
    if (req.user) return res.redirect("/")

    // const { email, password } = req.body;

    const { data, error } = loginUserSchema.safeParse(req.body);
    console.log(data);

    if (error) {
        const errors = error.issues[0].message;
        req.flash("error", errors);
        return res.redirect("/login");
    }
    const { email, password } = data;

    const user = await getUserByEmail(email);
    console.log("user: ", user);


    if (!user) {
        req.flash("error", "Invalid Email or Password");
        return res.redirect("/login");
    }

    const ispasswordValid = await comparePassword(password, user.password);

    // if(user.password !== password)  return res.redirect("/login");
    if (!ispasswordValid) {
        req.flash("error", "Invalid Email or Password");
        return res.redirect("/login");
    }


    // res.cookie("isLoggedIn", true)


    // const token = generateToken({
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    // });

    // res.cookie("access_token", token);

    await authenticateUser({req, res, user })

    // console.log("TOKEN CHECK:", {
    // accessToken,
    // refreshToken,
    // session
    //  });

    res.redirect("/")
};

export const getMe = (req, res) => {
    if (!req.user) return res.send("Not logged in");
    return res.send(`<h1>Hey ${req.user.name} - ${req.user.email}</h1>`)
}




export const logoutUser = async (req, res) => {

    await clearUserSession(req.user.sessionId)


    res.clearCookie("access_token")
    res.clearCookie("refresh_token")
    res.redirect("/login")
}

export const getProfilePage = async(req, res)=>{
    if(!req.user) return res.send("Not logged in")

        
        const user = await findUserById(req.user.id);
        if(!user) return res.redirect("/login")

        const userShortLinks = await getAllShortLinks(user.id);

        return res.render("auth/profile",{
            user:{
                id:user.id,
                name: user.name,
                email: user.email,
                isEmailValid: user.isEmailValid,
                createAt: user.createAt,
                links: userShortLinks,
            }
        })
       
        

}

export const getVerifyEmailPage = async(req, res)=>{
    console.log("req.user: ", req.user);
    console.log("req.user.isEmailValid: ",req.user.isEmailValid);
    
    
//  if (!req.user || req.user.isEmailValid) return res.redirect("/") 

if(!req.user) return res.redirect("/");

const user = await findUserById(req.user.id);

if(!user || user.isEmailValid) return res.redirect("/")

    return res.render("auth/verify-email", {
        email: req.user.email,

    })
}

// const getVerifyEmailPage = (req, res) => {
//     // If user is already verified, redirect to profile
//     if (req.user && req.user.isEmailValid) {
//         return res.redirect('/profile');
//     }
    
//     // Render the email verification page
//     res.render('verify-email', { 
//         user: req.user,
//         title: 'Verify Your Email'
//     });
// };
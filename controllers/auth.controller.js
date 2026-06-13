
import { comparePassword, createUser, generateToken, getUserByEmail, hashPassword } from "../services/auth.services.js";
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
    const { name, email, password } = data ;

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

    res.redirect("/login")

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
    const { email, password } = data ;

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


    const token = generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
    });

    res.cookie("access_token", token);

    res.redirect("/")
};

export const getMe = (req, res) => {
    if (!req.user) return res.send("Not logged in");
    return res.send(`<h1>Hey ${req.user.name} - ${req.user.email}</h1>`)
}

export const logoutUser = (req, res) => {
    res.clearCookie("access_token")
    res.redirect("/login")
}
const Router = require("express").Router();
const {
    signinUser,
    getUser,
    signupUser,
    editUser,
    forgetPassword,
    resendConfirmation,
    getNotifications,
    setReadNotification,
    resetPassword
} = require("../controller/user/user");
const passport = require("../services/jwtPassport");
/*
url : /api/user/signup
@return ok if success

*/
Router.post("/signup", signupUser);

/*
url : /api/user/signin
@return token

*/
Router.post("/signin", signinUser);

/*
url : /api/user/edit/:id
@return ok

*/
Router.put("/edit", passport.authenticate("jwt", { session: false }), editUser);
Router.get("/", passport.authenticate("jwt", { session: false }), getUser);
Router.get(
    "/notifications/:page",
    passport.authenticate("jwt", { session: false }),
    getNotifications
);
Router.put(
    "/notifications",
    passport.authenticate("jwt", { session: false }),
    setReadNotification
);

/*
expected data shape
{
    data:{
        email:""
    }
}
*/
Router.post("/forget-password", forgetPassword);
/*
expected data shape
{
    data:{
        email:""
    }
}
*/
Router.post("/reset-password", resetPassword);
/*
expected data shape
{
    data:{
        email:""
    }
}
*/
Router.post("/resend-code", resendConfirmation);

module.exports = Router;

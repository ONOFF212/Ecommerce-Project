
import Router from "@koa/router";
import { RateLimit } from "koa2-ratelimit";

import { signup, login } from "../controllers/auth-controller.ts";

export const authRouter = new Router({prefix:'/public'});

const authLimiter = RateLimit.middleware({
    interval: 15 * 60 * 1000,
    max:10,
    message:"Too many Request Try after few minutes",
})

authRouter.post('/register',authLimiter, signup);
authRouter.post('/login',authLimiter, login);

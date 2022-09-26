const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const guers = await prisma.users.findFirst({
          where: {
            email: email,
          },
        });
        if (guers) {
          return done(`User already exist`, null);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await prisma.users.create({
          data: {
            email: email,
            password: hashPassword,
          },
        });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await prisma.users.findFirst({
          where: {
            email: email,
          },
        });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return done(null, user, { message: "Logged in Successfully" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

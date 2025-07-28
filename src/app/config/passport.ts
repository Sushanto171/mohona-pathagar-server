import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { IActive, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { envVars } from "./envVars";

passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken,
      refreshToken,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0].value;
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
          return done(null, isUserExist);
        }

        const payload: IUser = {
          name: profile.displayName,
          email: profile.emails?.[0].value as string,
          role: Role.USER,
          isActive: IActive.ACTIVE,
          isVerified: true,
          picture: profile.photos?.[0].value,
          auths: [
            {
              provider: "google",
              providerId: profile.id,
            },
          ],
        };
        const user = await User.create(payload);

        done(null, user);
      } catch (error) {
        console.log(error, "passport");
        done(error);
      }
    }
  )
);

passport.serializeUser((user: Partial<IUser>, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

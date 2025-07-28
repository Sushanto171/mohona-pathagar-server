import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/login", AuthController.credentialLogin);
router.post("/logout", AuthController.logout);
router.post("/refresh-token", AuthController.getNewAccessToken);
router.get(
  "/google",
  async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect ? req.query.redirect : "/";
    await passport.authenticate("google", {
      scope: ["profile", "email"],
      prompt: "consent",
      state: redirect as string,
    })(req, res, next);
  }
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  AuthController.googleCallbackController
);

export const AuthRoutes = router;

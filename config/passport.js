const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/users");

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) return done(null, false, { message: "User not found" });

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return done(null, false, { message: "Wrong password" });

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:3000/web/users/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile.emails?.[0]?.value;
                    if (!email) return done(null, false, { message: "No email from Google" });

                    let user = await User.findOne({ email });

                    if (!user) {
                        user = new User({
                            name: profile.displayName,
                            email,
                            password: null,
                        });
                        await user.save();
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user.email);
    });
    passport.deserializeUser(async (email, done) => {
        try {
            const user = await User.findOne({ email });
            done(null, user || false);
        } catch (error) {
            done(error);
        }
    });
};

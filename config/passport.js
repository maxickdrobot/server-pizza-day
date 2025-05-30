const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const bcrypt = require("bcrypt");
const { users } = require("../api/web/users/mocks/users_mock");

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
            try {
                const user = users.find((u) => u.email === email);
                if (!user) return done(null, false, { message: "User don't found" });

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
            (accessToken, refreshToken, profile, done) => {
                try {
                    let user = users.find((u) => u.email === profile.emails[0].value);
                    if (!user) {
                        user = {
                            id: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            password: null,
                        };
                        users.push(user);
                    }
                    return done(null, user);
                } catch (error) {
                    return done(err);
                }
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user.email);
    });

    passport.deserializeUser((email, done) => {
        try {
            const user = users.find((u) => u.email === email);
            done(null, user || false);
        } catch (err) {
            done(err);
        }
    });
};

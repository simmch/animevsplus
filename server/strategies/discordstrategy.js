require("dotenv").config();
//const DiscordStrategy = require("passport-discord").Strategy;
const DiscordStrategy = require('@oauth-everything/passport-discord').Strategy;
const passport = require("passport");
const User = require("../routes/models/users")

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    if (user)
        done(null, user);
});

var scopes = ['identify', 'email', 'guilds']


passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: scopes
}, async (accessToken, refreshToken, profile, done) => {
    var disname = profile.username;
    var pound = "#";
    var discrim = profile.discriminator;
    try {
        const user = await User.findOne({ DID: profile.id });
        if (user) {
            done(null, user)
        }
        else {
            userFields = {
                DISNAME: disname.concat(pound, discrim),
                NAME: profile.username,
                DID: profile.id,
                AVATAR: [
                    'https://cdn.discordapp.com/avatars/' + profile.id + '/' + profile.avatar + '.webp?size=1024'
                ],
                IGN: [{ DEFAULT: 'PCG' }],
                GAMES: ['Crown Unlimited'],
                TEAM: 'PCG',
                FAMILY: '',
                TITLE: 'Starter',
                CARD: 'Ochaco Uraraka',
                DECK: [''],
                ARM: 'Stock',
                PET: 'Chick',
                MATCHES: [
                    { '1V1': [0, 0] },
                    { '2V2': [0, 0] },
                    { '3V3': [0, 0] },
                    { '4V4': [0, 0] },
                    { '5V5': [0, 0] }
                ],
                TOURNAMENT_WINS: 0,
                AVAILABLE: 'true',
                CROWN_TALES: [''],
                DUNGEONS: [''],
                REFERRED: 'false',
                REFERRER: 'N/A'
            }
            const newUser = new User(userFields);
            const savedUser = await newUser.save();
            done(null, user)
        }
    } catch (err) {
        console.error("Server Error: " + err)
        done(err, null)
    }
}))
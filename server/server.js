const express = require("express")
    , path = require('path');
const cors = require('cors');
const connectDB = require("./config/db");
const app = express();
const session = require("express-session")
const passport = require("passport")
const discordStrategy = require("./strategies/discordstrategy")

connectDB();

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin, X-HTTP-Method-Override,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(express.json({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../client/build')));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is open on port: ${port}.`)
})

app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    name: 'Discord Auth'
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/crown/cards", require("./routes/api/card_api"))
app.use("/crown/pets", require("./routes/api/pet_api"))
app.use("/crown/titles", require("./routes/api/titles_api"))
app.use("/crown/arms", require("./routes/api/arm_api.js"))
app.use("/crown/users", require("./routes/api/user_api"))
app.use("/crown/matches", require("./routes/api/matches_api.js"))
app.use("/crown/vault", require("./routes/api/vault_api.js"))
app.use("/crown/universes", require("./routes/api/universes_api.js"))
app.use("/crown/scenarios", require("./routes/api/scenario_api.js"))
app.use("/crown/abyss", require("./routes/api/abyss_api.js"))
app.use("/crown/bosses", require("./routes/api/bosses_api.js"))
app.use('/auth', require('./routes/api/auth_api'))

app.use("/pcg/teams", require("./routes/api/teams_api.js"))
app.use("/pcg/games", require("./routes/api/games_api.js"))
app.use("/pcg/gods", require("./routes/api/gods_api.js"))
app.use("/pcg/sessions", require("./routes/api/sessions_api.js"))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
})
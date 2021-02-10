const express = require("express");
const { connect } = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

const main = async () => {
  if (process.env.NODE_ENV === "development") {
    require("dotenv").config();
  }

  try {
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (error) {
    console.error(error);
  }

  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIE_SECRET],
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  require("./models");
  require("./services/passport");
  require("./routes/authRoutes")(app);

  app.get("/", (req, res) => {
    res.send("Hello");
  });

  const PORT = process.env.PORT || 5000;

  const server = app.listen(PORT, () => {
    console.log("Express is working on port: " + server.address().port);
  });
};

main();

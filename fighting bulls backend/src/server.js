if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ override: true });
}

console.log("DB URL loaded?", Boolean(process.env.DATABASE_URL));

const app = require("./app");

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`API listening on port ${port}`));

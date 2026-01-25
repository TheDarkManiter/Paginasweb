require("dotenv").config();
console.log("DB URL loaded?", Boolean(process.env.DATABASE_URL));

const app = require('./app');

const port = Number(process.env.PORT) || 3001;

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

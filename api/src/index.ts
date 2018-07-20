import * as express from "express";

const app = express();

import * as db from "./db";

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Available country list
app.get("/countries", async (_: express.Request, res: express.Response) => {
  const countries = await db.countries.all();
  res.json(countries);
});

// Releases(by genre)
app.get("/releases", async (req: express.Request, res: express.Response) => {
  const releases = await db.releases.getNReleasesOfGenreByCountry(
    req.query.genre
  );
  res.json(releases);
});

const port = 3000;
app.listen(port, () => {
  console.log("\nReady for GET requests on http://localhost:" + port);
});

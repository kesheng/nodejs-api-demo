import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { startDatabase } from "./model/mongo.js";
import { insertAd, getAds, deleteAd, updateAd } from "./model/ads.js";

const app = express();
const ads = [
  {
    title: "Hello, world",
  },
];

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send(await getAds());
});

/**
 * curl -X POST -H 'Content-Type: application/json' -d '{
      "title": "Pizza",
      "price": 10.5
    }' http://localhost:3001/
 */
app.post("/", async (req, res) => {
  const newAd = req.body;
  await insertAd(newAd);
  res.send({ message: "New ad inserted." });
});

/**
 * curl -X DELETE http://localhost:3001/$ID
 */
app.delete("/:id", async (req, res) => {
  await deleteAd(req.params.id);
  res.send({ message: "Ad removed." });
});

/**
 * ID=${AD_ID}
    curl -X PUT -H 'Content-Type: application/json' -d '{
      "price": 12.5
    }' http://localhost:3001/$ID
 */
app.put("/:id", async (req, res) => {
  const updatedAd = req.body;
  await updateAd(req.params.id, updatedAd);
  res.send({ message: "Ad updated." });
});

// start the in-memory MongoDB instance
startDatabase().then(async () => {
  await insertAd({ title: "Hello, now from the in-memory database!" });

  app.listen(3001, () => {
    console.log("listening on port 3001");
  });
});
